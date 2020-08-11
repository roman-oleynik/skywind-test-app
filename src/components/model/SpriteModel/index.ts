import * as PIXI from "pixi.js";

type SpriteParams = {
    height?: number;
    width?: number;
    position?: {
        x: number;
        y: number;
    };
    mask?: PIXI.Graphics;
    anchor?: {
        x: number;
        y: number;
    };
    angle?: number;
};

export class SpriteModel {
    private view: PIXI.Sprite;

    constructor(private readonly url: string) {
        const texture = PIXI.Texture.from(this.url);
        const sprite = PIXI.Sprite.from(texture);

        this.view = sprite;
    }

    public getUrl(): string {
        return this.url;
    }

    public getView(): PIXI.Sprite {
        return this.view;
    }
    public setView(params: SpriteParams): void {
        const { height, width, position, mask, anchor, angle } = params;
        if (height) this.view.height = height;
        if (width) this.view.width = width;
        if (position) {
            this.view.position.x = position.x;
            this.view.position.y = position.y;
        }
        if (mask) this.view.mask = mask;
        if (angle) this.view.angle = angle;
        if (anchor) {
            this.view.anchor.x = anchor.x;
            this.view.anchor.y = anchor.y;
        }
    }
}
