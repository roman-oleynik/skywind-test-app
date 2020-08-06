import * as PIXI from "pixi.js";
import { BoardModel } from "../../model/BoardModel";
import { Sprite } from "../../model/SymbolsModel";
import { ReelArray } from "../../model/ReelModel";

export class BoardAnimator {
    constructor(
        private board: BoardModel,
        private readonly renderer: PIXI.Renderer,
        private readonly stage: PIXI.Container,
        private readonly ticker: PIXI.Ticker
    ) {
        return;
    }
    public runDropDown(): void {
        const reels = this.board.getReels();

        reels.forEach((reel: ReelArray) => {
            return reel.forEach((el: Sprite) => {
                const dropDown = () => {
                    const sprite = el.getView();
                    // sprite.rotation += 0.005;
                    // if (sprite.rotation >= 0.05) {
                    //     sprite.rotation = 0.05;
                    // }
                    sprite.position.y += 20;
                    if (sprite.position.y >= 600) {
                        sprite.position.y = -300;
                        this.ticker.remove(dropDown);
                        // sprite.position.y += 20;
                    }
                    this.renderer.render(this.stage);
                };
                this.ticker.add(dropDown);
            });
        });
    }
}
