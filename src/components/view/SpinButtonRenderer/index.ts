import * as PIXI from "pixi.js";
import { Sprite } from "../../model/SymbolsModel";

export class SpinButtonRenderer {
    constructor(private sprites: Record<string, Sprite>, private stage: PIXI.Container) {
        return;
    }
    private addLabel(bg: string): void {
        const label = new PIXI.Text("SPIN");
        const style = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 16,
            fontWeight: "bold",
            fill: bg,
        });
        label.style = style;
        label.position.x = 728;
        label.position.y = 518;
        this.stage.addChild(label);
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
        this.addLabel("rgba(255,255,0,0.8)");
    }
    public renderHover(): void {
        this.removeAllSprites();
        this.sprites.hover.setView(90, 90, 700, 500);
        this.stage.addChild(this.sprites.hover.getView());
        this.addLabel("rgba(255,255,0,0.9)");
    }
    public renderPressed(): void {
        this.removeAllSprites();
        this.sprites.pressed.setView(90, 90, 700, 500);
        this.stage.addChild(this.sprites.pressed.getView());
        this.addLabel("rgba(255,255,0,0.6)");
    }
}
