import * as PIXI from "pixi.js";
import { BoardModel } from "../../model/BoardModel";
// import { Sprite } from "../../model/SymbolsModel";
// import { ReelArray } from "../../model/ReelModel";

export class BoardAnimator {
    constructor(
        private readonly board: BoardModel,
        private readonly renderer: PIXI.Renderer,
        private readonly stage: PIXI.Container,
        private readonly ticker: PIXI.Ticker
    ) {
        return;
    }
}
