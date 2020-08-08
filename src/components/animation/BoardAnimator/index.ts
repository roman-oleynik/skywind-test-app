import * as PIXI from "pixi.js";
import { Howl } from "howler";
import { BoardModel } from "../../model/BoardModel";
import { Sprite } from "../../model/Sprite";
import { ReelArray } from "../../model/ReelModel";

export class BoardAnimator {
    private marginTop = 0;
    private marginLeft = 0;
    constructor(private board: BoardModel, private app: PIXI.Application, private readonly size: number) {
        this.marginLeft = (800 - this.size * 5) / 2;
        this.marginTop = 40 + this.size;
    }
    private async _makeSoundOfFalling(trackNumber: number): Promise<void> {
        const sound = new Howl({
            src: [`../../../../assets/sounds/Reel_Stop_${trackNumber}.mp3`],
        });
        sound.play();
    }
    public runDropDown(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray, reelIndex: number) => {
            const delayOfReelFalling = 30 * reelIndex;
            setTimeout(() => {
                return reel.forEach((sprite: Sprite, spriteIndex: number) => {
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
                    const dropDown = () => {
                        const threshold = this.marginTop + spriteIndex * this.size + 20;
                        const { x, y } = sprite.getView().position;

                        sprite.setView({ position: { x, y: y + 5 } });

                        if (y >= threshold) {
                            sprite.setView({ position: { x, y: y + 30 } });
                            if (y >= 600) {
                                sprite.setView({ position: { x, y: -300 } });
                                this.app.ticker.remove(dropDown);
                                this.app.stage.removeChild(sprite.getView());
                            }
                        }
                        this.app.renderer.render(this.app.stage);
                    };

                    const delayOfSpriteFalling = 90 - (spriteIndex + 1) * 30;
                    setTimeout(() => {
                        this.app.ticker.add(dropDown);
                        this.app.ticker.add(tilt);
                    }, delayOfSpriteFalling);
                });
            }, delayOfReelFalling);
        });
    }

    public runFalling(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray, reelIndex: number) => {
            setTimeout(() => {
                return reel.forEach((sprite: Sprite, symbolIndex: number) => {
                    const landSprite = () => {
                        const curAngle = sprite.getView().angle;
                        sprite.setView({ angle: curAngle - 0.5 });

                        if (curAngle < 1) {
                            sprite.setView({ angle: 0 });
                            this.app.ticker.remove(landSprite);
                        }
                    };

                    const kickback = () => {
                        const curAngle = sprite.getView().angle;

                        sprite.setView({ angle: curAngle - 0.5 });
                        if (curAngle >= 5 || curAngle <= 5) {
                            sprite.setView({ angle: 5 });
                            this.app.ticker.remove(kickback);
                            this.app.ticker.add(landSprite);
                        }
                        if (symbolIndex === 2) {
                            const randOfSounds = Math.floor(Math.random() * 4) + 1;
                            this._makeSoundOfFalling(randOfSounds);
                        }
                    };
                    const fall = () => {
                        const threshold = this.marginTop + symbolIndex * this.size;
                        const { x, y } = sprite.getView().position;

                        sprite.setView({ position: { x, y: y + 30 } });
                        if (y >= threshold) {
                            sprite.setView({ position: { x, y: threshold } });
                            this.app.ticker.remove(fall);
                            this.app.ticker.add(kickback);
                        }
                    };
                    this.app.renderer.render(this.app.stage);
                    setTimeout(() => {
                        this.app.ticker.add(fall);
                    }, Math.floor(Math.random() * 70) + 30);
                });
            }, 30 * reelIndex);
        });
    }
}
