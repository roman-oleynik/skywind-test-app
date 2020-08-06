import * as PIXI from "pixi.js";
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
        this.marginTop = 40;
    }
    public runDropDown(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray, i: number) => {
            setTimeout(() => {
                return reel.forEach((el: Sprite) => {
                    const dropDown = () => {
                        const sprite = el.getView();

                        sprite.position.y += 5;
                        if (sprite.position.y >= 600) {
                            sprite.position.y = -300;
                            this.ticker.remove(dropDown);
                            this.stage.removeChild(sprite);
                            setTimeout(() => {
                                this.runFalling();
                            }, 2000);
                        }
                        this.renderer.render(this.stage);
                    };
                    this.ticker.add(dropDown);
                });
            }, 50 * i);
        });

        this.board = new BoardModel();
        const boardRenderer = new BoardRenderer(this.board, this.stage, this.renderer, this.ticker, 150);
        boardRenderer.rerender();
    }
    public runFalling(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray) => {
            return reel.forEach((el: Sprite, symbolIndex: number) => {
                const fall = () => {
                    const sprite = el.getView();

                    // const posX = this.marginLeft + reelIndex * this.size;
                    const posY = this.marginTop + symbolIndex * this.size;

                    sprite.position.y += 5;
                    if (sprite.position.y >= posY) {
                        sprite.position.y = posY;
                        this.ticker.remove(fall);
                    }
                    this.renderer.render(this.stage);
                };
                this.ticker.add(fall);
            });
        });
    }
}
