import { Sprite } from "../Sprite";
import { SymbolsPack } from "../SymbolsPack";

export type Reel = Sprite[];

export class ReelModel {
    private reel: Reel = [];

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
    public getElements(): Reel {
        return this.reel;
    }
}
