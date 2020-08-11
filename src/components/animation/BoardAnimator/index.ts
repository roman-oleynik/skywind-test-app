import * as PIXI from "pixi.js";
import { Howl } from "howler";
import { BoardModel } from "../../model/BoardModel";
import { SpriteModel } from "../../model/SpriteModel";
import { Reel } from "../../model/ReelModel";
import { SpinButtonRenderer } from "../../rendering/SpinButtonRenderer";

type SpritesFallingParams = {
    from: number;
    to: number;
    isDropped: boolean;
    spriteParams: {
        sprite: SpriteModel;
        spriteIndex?: number;
        reelIndex?: number;
    };
};

export class BoardAnimator {
    private marginTop = 0;
    private marginLeft = 0;
    constructor(
        private board: BoardModel,
        private spinButtonRenderer: SpinButtonRenderer,
        private app: PIXI.Application,
        private readonly size: number
    ) {
        this.marginLeft = (800 - this.size * 5) / 2;
        this.marginTop = 40 + this.size;
    }
    private async _makeSoundOfFalling(trackNumber: number): Promise<void> {
        const sound = new Howl({
            src: [`../../../../assets/sounds/Reel_Stop_${trackNumber}.mp3`],
        });
        sound.play();
    }
    private _tilt(sprite: SpriteModel): () => void {
        const tilt = () => {
            const randAngle = Math.floor(Math.random() * 2) - 1;
            const randAngleDelta = Math.random() * 0.2 - 0.1;

            const curAngle = sprite.getView().angle;

            sprite.setView({ angle: curAngle + randAngleDelta });
            if (curAngle >= randAngle || curAngle <= randAngle) {
                sprite.setView({ angle: randAngle });
                this.app.ticker.remove(tilt);
            }
        };
        return tilt;
    }

    private _landSprite(sprite: SpriteModel): () => void {
        const landSprite = () => {
            const curAngle = sprite.getView().angle;
            sprite.setView({ angle: curAngle - 0.5 });

            if (curAngle < 1) {
                sprite.setView({ angle: 0 });
                this.app.ticker.remove(landSprite);
            }
        };
        return landSprite;
    }

    private _kickback(sprite: SpriteModel, spriteIndex: number, reelIndex: number): () => void {
        const kickback = () => {
            const curAngle = sprite.getView().angle;

            sprite.setView({ angle: curAngle - 0.5 });
            if (curAngle >= 5 || curAngle <= 5) {
                sprite.setView({ angle: 5 });
                this.app.ticker.remove(kickback);
                this.app.ticker.add(this._landSprite(sprite));
            }
            if (spriteIndex === 2) {
                const randOfSounds = Math.floor(Math.random() * 4) + 1;
                this._makeSoundOfFalling(randOfSounds);
            }
            if (reelIndex === 4 && spriteIndex === 2) {
                this.spinButtonRenderer.renderNormal();
            }
        };
        return kickback;
    }

    private _fall(params: SpritesFallingParams): () => void {
        const { from, to, spriteParams, isDropped } = params;
        const { sprite, spriteIndex, reelIndex } = spriteParams;

        const fall = () => {
            const { x, y } = sprite.getView().position;

            sprite.setView({ position: { x, y: y + 5 } });

            if (y >= from) {
                sprite.setView({ position: { x, y: y + 30 } });
                if (y >= to) {
                    sprite.setView({ position: { x, y: to } });
                    this.app.ticker.remove(fall);
                    if (isDropped) {
                        this.app.stage.removeChild(sprite.getView());
                    } else {
                        this.app.ticker.add(this._kickback(sprite, spriteIndex as number, reelIndex as number));
                    }
                }
            }
        };
        return fall;
    }
    private _getParamsForFallingFromTop(
        sprite: SpriteModel,
        spriteIndex: number,
        reelIndex: number
    ): SpritesFallingParams {
        return {
            from: -270,
            to: this.marginTop + spriteIndex * this.size,
            isDropped: false,
            spriteParams: {
                sprite,
                spriteIndex,
                reelIndex,
            },
        };
    }
    private _getParamsForDropping(sprite: SpriteModel, spriteIndex: number): SpritesFallingParams {
        return {
            from: this.marginTop + spriteIndex * this.size + 20,
            to: 600,
            isDropped: true,
            spriteParams: {
                sprite,
            },
        };
    }
    private _makeDelayForReelFalling(func: () => void, reelIndex: number): void {
        const delay = 30 * reelIndex;
        setTimeout(func, delay);
    }
    private _makeDelayForSpriteFalling(func: () => void, spriteIndex: number): void {
        const delay = 90 - (spriteIndex + 1) * 30;
        setTimeout(func, delay);
    }
    private _runFalling(isDropping: boolean): void {
        const reels = this.board.getReels();

        reels.forEach((reel: Reel, reelIndex: number) => {
            this._makeDelayForReelFalling(() => {
                return reel.forEach((sprite: SpriteModel, spriteIndex: number) => {
                    let params: SpritesFallingParams = {} as SpritesFallingParams;
                    if (isDropping) {
                        params = this._getParamsForDropping(sprite, spriteIndex);
                    } else {
                        params = this._getParamsForFallingFromTop(sprite, spriteIndex, reelIndex);
                    }

                    this._makeDelayForSpriteFalling(() => {
                        this.app.ticker.add(this._fall(params));
                        if (isDropping) {
                            this.app.ticker.add(this._tilt(sprite));
                        }
                    }, spriteIndex);
                });
            }, reelIndex);
        });
    }
    public runDropDown(): void {
        this._runFalling(true);
    }
    public runFallingFromTop(): void {
        this._runFalling(false);
    }
}
