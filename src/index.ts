import * as PIXI from "pixi.js";
import { SymbolsPack } from "./components/model/SymbolsModel";
import { BoardModel } from "./components/model/BoardModel";
import { BoardRenderer } from "./components/view/BoardRenderer";
import { BoardAnimator } from "./components/view/BoardAnimator";
import { SpinButtonController } from "./components/controller/SpinButtonController";

import "./style.css";

export class Main {
    private static readonly GAME_WIDTH = 800;
    private static readonly GAME_HEIGHT = 600;
    private readonly symbolsPack = SymbolsPack.getInstance();
    private readonly SpinButtonSprites = this.symbolsPack.getSpinButtonSprites();
    private readonly Symbols = this.symbolsPack.getSymbols();

    private app!: PIXI.Application;

    constructor() {
        window.onload = (): void => {
            this.startLoadingAssets();
        };
    }

    private startLoadingAssets(): void {
        const loader = PIXI.Loader.shared;

        for (const key in this.Symbols) {
            loader.add(key, this.Symbols[key].getUrl());
        }

        loader.onComplete.once(() => {
            this.onAssetsLoaded();
        });

        loader.load();
    }

    private onAssetsLoaded(): void {
        this.createRenderer();

        const stage = this.app.stage;

        const spritesArr = new BoardModel();
        const boardRenderer = new BoardRenderer(spritesArr, stage, this.app.renderer, this.app.ticker, 150);
        boardRenderer.render();

        const boardAnimator = new BoardAnimator(spritesArr, this.app.renderer, stage, this.app.ticker, 150);

        new SpinButtonController(boardAnimator, stage);
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0x000000,
            width: Main.GAME_WIDTH,
            height: Main.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);

        this.app.renderer.resize(Main.GAME_WIDTH, Main.GAME_HEIGHT);
        // this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        // this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize(): void {
        if (!this.app) {
            return;
        }

        this.app.renderer.resize(Main.GAME_WIDTH, Main.GAME_HEIGHT);
        // this.app.stage.scale.x = window.innerWidth / Main.GAME_WIDTH;
        // this.app.stage.scale.y = window.innerHeight / Main.GAME_HEIGHT;
    }
}

new Main();
