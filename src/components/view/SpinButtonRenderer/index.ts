import * as PIXI from "pixi.js";
import { Sprite } from "../../model/SymbolsModel";

export class SpinButtonRenderer {
    constructor(private sprites: Record<string, Sprite>, private stage: PIXI.Container) {
        return;
    }
    private removeAllSprites(): void {
        this.stage.removeChild(this.sprites.normal.getView());
        this.stage.removeChild(this.sprites.disabled.getView());
        this.stage.removeChild(this.sprites.hover.getView());
    }
    public renderNormal(): void {
        this.removeAllSprites();
        this.sprites.normal.setView(90, 90, 700, 500);
        this.stage.addChild(this.sprites.normal.getView());
    }
    public renderHover(): void {
        this.removeAllSprites();
        this.sprites.hover.setView(90, 90, 700, 500);
        this.stage.addChild(this.sprites.hover.getView());
    }
    public renderPressed(): void {
        this.removeAllSprites();
        this.sprites.pressed.setView(90, 90, 700, 500);
        this.stage.addChild(this.sprites.pressed.getView());
    }
}
