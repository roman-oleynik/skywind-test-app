import { Reel, ReelModel } from "../ReelModel";
import { SymbolsPack } from "../SymbolsPack";

export class BoardModel {
    private board: Array<Reel> = [];

    constructor() {
        this._fillByReels();
    }

    private _fillByReels(): void {
        const result: Array<Reel> = [];

        for (let i = 0; i < 5; i++) {
            result.push(new ReelModel(SymbolsPack.getInstance()).getElements());
        }

        this.board = result;
    }

    public refresh(): void {
        this._fillByReels();
    }

    public getReels(): Array<Reel> {
        return this.board;
    }
}
