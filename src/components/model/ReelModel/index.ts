import { Sprite } from "../Sprite";
import { SymbolsPack } from "../SymbolsPack";

export type ReelArray = Sprite[];

export class Reel {
    private reel: ReelArray = [];

    constructor(private readonly symbolsPack: SymbolsPack) {
        this._buildUsingRandomSymbols();
    }

    private _buildUsingRandomSymbols(): void {
        const result = [];

        for (let i = 0; i < 3; i++) {
            const rand = Math.floor(Math.random() * 7) + 1;
            result.push(this.symbolsPack.getSymbols()[`symbol-${rand}`]);
        }
        this.reel = result;
    }
    public getElements(): ReelArray {
        return this.reel;
    }
}
