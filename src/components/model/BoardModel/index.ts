import { ReelArray, Reel } from "../ReelModel";
import { SymbolsPack } from "../SymbolsModel";

export type BoardArray = Array<ReelArray>;

export class BoardModel {
    private board: BoardArray = [];

    constructor() {
        this.fillBoardByReels();
    }

    private fillBoardByReels(): void {
        const result: BoardArray = [];

        for (let i = 0; i < 5; i++) {
            result.push(new Reel(SymbolsPack.getInstance()).getReelElements());
        }

        this.board = result;
    }

    public getReels(): BoardArray {
        return this.board;
    }

    public setBoardArray(arr: BoardArray): void {
        this.board = arr;
    }
}
