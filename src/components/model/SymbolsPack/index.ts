import { Sprite } from "../Sprite";

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
