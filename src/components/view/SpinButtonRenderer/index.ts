import * as PIXI from "pixi.js";
import { Sprite } from "../../model/SymbolsModel";

export class SpinButtonRenderer {
    private label: PIXI.Text;
    constructor(private sprites: Record<string, Sprite>, private stage: PIXI.Container) {
        this.label = new PIXI.Text("SPIN");
        this.label.position.x = 728;
        this.label.position.y = 518;
    }
    private addLabel(fill: string, shadowBlur: number): void {
        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 16,
            fontWeight: "bold",
            fill: fill,
            dropShadow: true,
            dropShadowColor: "rgba(255,0,0,0.3)",
            dropShadowBlur: shadowBlur,
        });
        this.label.style = style;

        this.stage.addChild(this.label);
    }
    private removeLabel(): void {
        this.stage.removeChild(this.label);
    }
    private removeAllSprites(): void {
        this.stage.removeChild(this.sprites.normal.getView());
        this.stage.removeChild(this.sprites.disabled.getView());
        this.stage.removeChild(this.sprites.hover.getView());
    }
    public renderNormal(): void {
        this.removeAllSprites();
        this.removeLabel();
        this.sprites.normal.setView(90, 90, 700, 500);
        // this.sprites.normal.getView().zIndex = 3;
        this.stage.addChild(this.sprites.normal.getView());
        this.addLabel("rgba(255,255,0,0.8)", 4);
    }
    public renderHover(): void {
        this.removeAllSprites();
        this.removeLabel();
        this.sprites.hover.setView(90, 90, 700, 500);
        // this.sprites.hover.getView().zIndex = 3;
        this.stage.addChild(this.sprites.hover.getView());
        this.addLabel("rgba(255,255,0,0.9)", 4);
    }
    public renderPressed(): void {
        this.removeAllSprites();
        this.removeLabel();
        this.sprites.pressed.setView(90, 90, 700, 500);
        // this.sprites.pressed.getView().zIndex = 3;
        this.stage.addChild(this.sprites.pressed.getView());
        this.addLabel("rgba(255,255,0,0.3)", 8);
    }
}
