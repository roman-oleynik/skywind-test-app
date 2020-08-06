import * as PIXI from "pixi.js";

export class Sprite {
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
    public setView(height: number, width: number, x: number, y: number): void {
        this.view.height = height;
        this.view.width = width;
        this.view.position.x = x;
        this.view.position.y = y;
    }
}

export class SymbolsPack {
    private static instance: SymbolsPack;
    private constructor() {
        return;
    }

    public static getInstance(): SymbolsPack {
        if (!SymbolsPack.instance) {
            SymbolsPack.instance = new SymbolsPack();
        }

        return SymbolsPack.instance;
    }

    public getSymbols(): Record<string, Sprite> {
        return {
            "symbol-1": new Sprite("./assets/images/symbols/symbol_1.png"),
            "symbol-2": new Sprite("./assets/images/symbols/symbol_2.png"),
            "symbol-3": new Sprite("./assets/images/symbols/symbol_3.png"),
            "symbol-4": new Sprite("./assets/images/symbols/symbol_4.png"),
            "symbol-5": new Sprite("./assets/images/symbols/symbol_5.png"),
            "symbol-6": new Sprite("./assets/images/symbols/symbol_6.png"),
            "symbol-7": new Sprite("./assets/images/symbols/symbol_7.png"),
            "symbol-8": new Sprite("./assets/images/symbols/symbol_8.png"),
        };
    }
    public getSpinButtonSprites(): Record<string, Sprite> {
        return {
            disabled: new Sprite("./assets/images/ui/btn_spin_disabled.png"),
            hover: new Sprite("./assets/images/ui/btn_spin_hover.png"),
            normal: new Sprite("./assets/images/ui/btn_spin_normal.png"),
            pressed: new Sprite("./assets/images/ui/btn_spin_pressed.png"),
        };
    }
}
