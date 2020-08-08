import * as PIXI from "pixi.js";
import { Sprite } from "../../model/Sprite";
import { ReelArray } from "../../model/ReelModel";

export class BoardRenderer {
    public mask: PIXI.Graphics = new PIXI.Graphics();
    private marginTop = 0;
    private marginLeft = 0;
    constructor(private reels: ReelArray[], private readonly app: PIXI.Application, private readonly size: number) {
        this.marginLeft = (800 - this.size * 5) / 2 + this.size;
        this.marginTop = 40 + this.size;
        this._createMask();
    }
    private _createMask(): void {
        this.mask.beginFill(0xff0000);
        this.mask.drawRect(0, 40, 800, 460);
        this.app.stage.addChild(this.mask);
    }
    public render(position: number): void {
        this.marginTop = position;

        this.reels.forEach((reel: ReelArray, reelIndex: number) => {
            return reel.forEach((el: Sprite, i: number) => {
                el.setView({
                    height: this.size,
                    width: this.size,
                    position: {
                        x: this.marginLeft + reelIndex * this.size,
                        y: this.marginTop + i * this.size,
                    },
                    mask: this.mask,
                    anchor: {
                        x: 1,
                        y: 1,
                    },
                });
                const sprite = el.getView();

                this.app.stage.addChild(sprite);
            });
        });
    }
}
