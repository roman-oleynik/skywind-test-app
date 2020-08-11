import * as PIXI from "pixi.js";
import { SpriteModel } from "../../model/SpriteModel";
import { Reel } from "../../model/ReelModel";
import { throttling } from "../../../utils/throttling";

export class BoardRenderer {
    public mask: PIXI.Graphics = new PIXI.Graphics();
    private marginTop = 0;
    private marginLeft = 0;
    constructor(private reels: Reel[], private readonly app: PIXI.Application, private readonly size: number) {
        this.marginLeft = (800 - this.size * 5) / 2 + this.size;
        this.marginTop = 40 + this.size;
        this._createMask();
    }
    private _createMask(): void {
        this.mask.beginFill(0xff0000);
        this.mask.drawRect(0, 40, 800, 460);
        this.app.stage.addChild(this.mask);

        const onResize = () => {
            this.mask = this.mask.drawRect(0, 40, window.innerWidth, 460);
            this.app.stage.addChild(this.mask);
        };

        window.onresize = throttling(onResize, 7);
    }
    public render(position: number): void {
        this.marginTop = position;

        this.reels.forEach((reel: Reel, reelIndex: number) => {
            return reel.forEach((sprite: SpriteModel, i: number) => {
                sprite.setView({
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

                this.app.stage.addChild(sprite.getView());
            });
        });
    }
}
