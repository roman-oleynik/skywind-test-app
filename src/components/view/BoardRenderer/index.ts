import * as PIXI from "pixi.js";
import { BoardModel } from "../../model/BoardModel";
import { Sprite } from "../../model/SymbolsModel";
import { ReelArray } from "../../model/ReelModel";

export class BoardRenderer {
    private marginTop = 0;
    private marginLeft = 0;
    constructor(
        private board: BoardModel,
        private readonly stage: PIXI.Container,
        private readonly renderer: PIXI.Renderer,
        private readonly ticker: PIXI.Ticker,
        private readonly size: number
    ) {
        this.marginLeft = (800 - this.size * 5) / 2;
        this.marginTop = 40;
    }
    public renderInitially(): void {
        const reelsArr = this.board.getReels();

        reelsArr.forEach((reel: ReelArray, reelIndex: number) => {
            return reel.forEach((el: Sprite, i: number) => {
                el.setView(
                    this.size,
                    this.size,
                    this.marginLeft + reelIndex * this.size,
                    this.marginTop + i * this.size
                );
                const sprite = el.getView();

                this.stage.addChild(sprite);
            });
        });
    }
    public rerender(): void {
        const reelsArr = this.board.getReels();

        reelsArr.forEach((reel: ReelArray, reelIndex: number) => {
            return reel.forEach((el: Sprite, i: number) => {
                el.setView(
                    this.size,
                    this.size,
                    this.marginLeft + reelIndex * this.size,
                    this.marginTop - 600 + i * this.size
                );
                const sprite = el.getView();

                this.stage.addChild(sprite);
            });
        });
    }
}
