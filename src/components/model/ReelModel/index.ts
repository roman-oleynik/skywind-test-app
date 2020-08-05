import { SymbolsPack, Sprite } from "../SymbolsModel";

export type ReelArray = Sprite[];

export class Reel {
    private reel: ReelArray = [];

    constructor(private readonly symbolsPack: SymbolsPack) {
        this.buildUsingRandomSymbols();
    }

    private buildUsingRandomSymbols(): void {
        const result = [];

        for (let i = 0; i < 3; i++) {
            const rand = Math.floor(Math.random() * 7) + 1;
            result.push(this.symbolsPack.getSymbols()[`symbol-${rand}`]);
        }
        this.reel = result;
    }
    public getReelElements(): ReelArray {
        return this.reel;
    }
}
