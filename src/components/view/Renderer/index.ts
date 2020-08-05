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
        this.marginTop = (600 - this.size * 3) / 2;
    }
    public render(): void {
        const reelsArr = this.board.getReels();

        reelsArr.forEach((reel: ReelArray, reelIndex: number) => {
            return reel.forEach((el: Sprite, i: number) => {
                const sprite = el.getView();
                sprite.position.x = this.marginLeft + reelIndex * this.size;
                sprite.position.y = this.marginTop + this.size * i;
                sprite.height = this.size;
                sprite.width = this.size;

                this.stage.addChild(sprite);

                // const dropDown = () => {
                //     // sprite.rotation += 0.005;
                //     // if (sprite.rotation >= 0.05) {
                //     //     sprite.rotation = 0.05;
                //     // }
                //     sprite.position.y += 20;
                //     if (sprite.position.y >= 600) {
                //         sprite.position.y = -300;
                //         this.ticker.remove(dropDown);
                //         // sprite.position.y += 20;
                //     }
                //     this.renderer.render(this.stage);
                // };
                // this.ticker.add(dropDown);
            });
        });
    }
}
