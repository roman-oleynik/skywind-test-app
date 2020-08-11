import { SpriteModel } from "../SpriteModel";

export class SpritesPack {
    private static instance: SpritesPack;
    private constructor() {
        return;
    }

    public static getInstance(): SpritesPack {
        if (!SpritesPack.instance) {
            SpritesPack.instance = new SpritesPack();
        }

        return SpritesPack.instance;
    }

    public getSymbols(): Record<string, SpriteModel> {
        return {
            "symbol-1": new SpriteModel("./assets/images/symbols/symbol_1.png"),
            "symbol-2": new SpriteModel("./assets/images/symbols/symbol_2.png"),
            "symbol-3": new SpriteModel("./assets/images/symbols/symbol_3.png"),
            "symbol-4": new SpriteModel("./assets/images/symbols/symbol_4.png"),
            "symbol-5": new SpriteModel("./assets/images/symbols/symbol_5.png"),
            "symbol-6": new SpriteModel("./assets/images/symbols/symbol_6.png"),
            "symbol-7": new SpriteModel("./assets/images/symbols/symbol_7.png"),
            "symbol-8": new SpriteModel("./assets/images/symbols/symbol_8.png"),
        };
    }
    public getSpinButtonSprites(): Record<string, SpriteModel> {
        return {
            disabled: new SpriteModel("./assets/images/ui/btn_spin_disabled.png"),
            hover: new SpriteModel("./assets/images/ui/btn_spin_hover.png"),
            normal: new SpriteModel("./assets/images/ui/btn_spin_normal.png"),
            pressed: new SpriteModel("./assets/images/ui/btn_spin_pressed.png"),
        };
    }
}
