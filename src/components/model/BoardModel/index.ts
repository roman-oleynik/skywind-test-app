import { ReelArray, Reel } from "../ReelModel";
import { SymbolsPack } from "../SymbolsPack";

export class BoardModel {
    private board: Array<ReelArray> = [];

    constructor() {
        this._fillBoardByReels();
    }

    private _fillBoardByReels(): void {
        const result: Array<ReelArray> = [];

        for (let i = 0; i < 5; i++) {
            result.push(new Reel(SymbolsPack.getInstance()).getElements());
        }

        this.board = result;
    }

    public refresh(): void {
        this._fillBoardByReels();
    }

    public getReels(): Array<ReelArray> {
        return this.board;
    }
}
