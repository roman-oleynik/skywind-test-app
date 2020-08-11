import { SpriteModel } from "../SpriteModel";
import { SpritesPack } from "../SpritesPack";

export type Reel = SpriteModel[];

export class ReelModel {
    private reel: Reel = [];

    constructor(private readonly symbolsPack: SpritesPack) {
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
