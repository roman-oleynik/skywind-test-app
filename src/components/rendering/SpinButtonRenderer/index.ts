import * as PIXI from "pixi.js";
import { SpriteModel } from "../../model/SpriteModel";

export class SpinButtonRenderer {
    private label: PIXI.Text;

    constructor(public sprites: Record<string, SpriteModel>, private stage: PIXI.Container) {
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
        this.sprites.normal.setView({
            height: 90,
            width: 90,
            position: {
                x: 700,
                y: 500,
            },
        });

        this.stage.addChild(this.sprites.normal.getView());
        this.addLabel("rgba(255,255,0,0.8)", 4);
    }
    public renderHover(): void {
        this.removeAllSprites();
        this.removeLabel();
        this.sprites.hover.setView({
            height: 90,
            width: 90,
            position: {
                x: 700,
                y: 500,
            },
        });
        this.stage.addChild(this.sprites.hover.getView());
        this.addLabel("rgba(255,255,0,0.9)", 4);
    }
    public renderPressed(): void {
        this.removeAllSprites();
        this.removeLabel();
        this.sprites.pressed.setView({
            height: 90,
            width: 90,
            position: {
                x: 700,
                y: 500,
            },
        });
        this.stage.addChild(this.sprites.pressed.getView());
        this.addLabel("rgba(255,255,0,0.3)", 8);
    }
}
