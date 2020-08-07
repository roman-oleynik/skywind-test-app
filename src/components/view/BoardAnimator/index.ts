import * as PIXI from "pixi.js";
import { Howl } from "howler";
import { BoardModel } from "../../model/BoardModel";
import { Sprite } from "../../model/SymbolsModel";
import { ReelArray } from "../../model/ReelModel";
import { BoardRenderer } from "../BoardRenderer";

export class BoardAnimator {
    private marginTop = 0;
    private marginLeft = 0;
    constructor(
        private board: BoardModel,
        private renderer: PIXI.Renderer,
        private readonly stage: PIXI.Container,
        private readonly ticker: PIXI.Ticker,
        private readonly size: number
    ) {
        this.marginLeft = (800 - this.size * 5) / 2;
        this.marginTop = 40 + this.size;
    }
    public runDropDown(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray, reelIndex: number) => {
            setTimeout(() => {
                return reel.forEach((el: Sprite, spriteIndex: number) => {
                    const sprite = el.getView();

                    const tilt = () => {
                        const randAngle = Math.floor(Math.random() * 2) - 1;
                        const randAngleDelta = Math.random() * 0.2 - 0.1;
                        sprite.angle += randAngleDelta;
                        if (sprite.angle >= randAngle || sprite.angle <= randAngle) {
                            sprite.angle = randAngle;
                            this.ticker.remove(tilt);
                        }
                    };
                    const dropDown = () => {
                        const posY = this.marginTop + spriteIndex * this.size;
                        sprite.position.y += 5;
                        if (sprite.position.y >= posY + 30) {
                            sprite.position.y += 30;
                            if (sprite.position.y >= 600) {
                                sprite.position.y = -300;
                                this.ticker.remove(dropDown);
                                this.stage.removeChild(sprite);
                            }
                        }

                        this.renderer.render(this.stage);
                    };
                    setTimeout(() => {
                        this.ticker.add(dropDown);
                        this.ticker.add(tilt);
                    }, 90 - (spriteIndex + 1) * 30);
                });
            }, 30 * reelIndex);
        });

        this.board = new BoardModel();
        const boardRenderer = new BoardRenderer(this.board, this.stage, this.renderer, this.ticker, 150);
        boardRenderer.rerender();

        setTimeout(() => {
            this.runFalling();
            this.deleteAnExtraMask(boardRenderer.mask);
        }, 1000);
    }
    private deleteAnExtraMask(mask: PIXI.Graphics) {
        this.stage.removeChild(mask);
    }
    public runFalling(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray, reelIndex: number) => {
            setTimeout(() => {
                return reel.forEach((el: Sprite, symbolIndex: number) => {
                    const sprite = el.getView();
                    const landSprite = (randAngle: number) => {
                        const delta = 0.5;
                        if (randAngle > 0) {
                            sprite.angle -= delta;
                            if (sprite.angle <= 0) {
                                sprite.angle = 0;
                                this.ticker.remove(() => landSprite(randAngle));
                            }
                        } else if (randAngle < 0) {
                            sprite.angle += delta;

                            if (sprite.angle >= 0) {
                                sprite.angle = 0;
                                this.ticker.remove(() => landSprite(randAngle));
                            }
                        } else {
                            return;
                        }
                    };

                    const kickback = () => {
                        // sprite.mask;
                        const angle = 5;
                        const delta = -0.5;
                        sprite.angle += delta;
                        if (sprite.angle >= angle || sprite.angle <= angle) {
                            sprite.angle = angle;
                            this.ticker.remove(kickback);
                            this.ticker.add(() => landSprite(angle));
                        }
                        if (symbolIndex === 2) {
                            const rand = Math.floor(Math.random() * 4) + 1;
                            const howl = new Howl({
                                src: [`../../../../assets/sounds/Reel_Stop_${rand}.mp3`],
                            });
                            howl.play();
                        }
                    };
                    const fall = () => {
                        // const posX = this.marginLeft + reelIndex * this.size;
                        const posY = this.marginTop + symbolIndex * this.size;

                        sprite.position.y += 5;
                        if (sprite.position.y >= posY - 600) {
                            sprite.position.y += 30;
                            if (sprite.position.y >= posY) {
                                sprite.position.y = posY;
                                this.ticker.remove(fall);
                                this.ticker.add(kickback);
                            }
                        }
                        this.renderer.render(this.stage);
                    };
                    setTimeout(() => {
                        this.ticker.add(fall);
                    }, Math.floor(Math.random() * 70) + 30);
                });
            }, 30 * reelIndex);
        });
    }
}
