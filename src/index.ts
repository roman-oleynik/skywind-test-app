import * as PIXI from "pixi.js";
import { SymbolsPack } from "./components/model/SymbolsPack";
import { BoardModel } from "./components/model/BoardModel";
import { BoardRenderer } from "./components/rendering/BoardRenderer";
import { SpinButtonRenderer } from "./components/rendering/SpinButtonRenderer";
import { BoardAnimator } from "./components/animation/BoardAnimator";
import { AppController } from "./components/controller/AppController";

import "./style.css";

export class Main {
    public GAME_WIDTH = window.innerWidth >= 800 ? 800 : window.innerWidth;
    public GAME_HEIGHT = window.innerWidth >= 800 ? 600 : window.innerWidth * 0.75;
    private readonly symbolsPack = SymbolsPack.getInstance();
    private readonly buttonSprites = this.symbolsPack.getSpinButtonSprites();
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

        const boardModel = new BoardModel();
        const boardRenderer = new BoardRenderer(boardModel.getReels(), this.app, 150);
        const boardAnimator = new BoardAnimator(boardModel, this.app, 150);
        const spinButtonRenderer = new SpinButtonRenderer(this.buttonSprites, this.app.stage);

        new AppController(boardModel, boardAnimator, boardRenderer, spinButtonRenderer, this.app).init();
    }

    private createRenderer(): void {
        this.app = new PIXI.Application({
            backgroundColor: 0x000000,
            width: this.GAME_WIDTH,
            height: this.GAME_HEIGHT,
        });

        document.body.appendChild(this.app.view);

        if (window.innerWidth <= 800) {
            this.app.stage.scale.x = window.innerWidth / 800;
            this.app.stage.scale.y = window.innerWidth / 800;
        } else {
            this.app.stage.scale.x = 1;
            this.app.stage.scale.y = 1;
        }

        window.addEventListener("resize", this.onResize.bind(this));
    }

    private onResize(): void {
        if (!this.app) {
            return;
        }

        if (window.innerWidth <= 800) {
            this.app.renderer.resize(window.innerWidth, window.innerWidth * 0.75);

            this.app.stage.scale.x = window.innerWidth / 800;
            this.app.stage.scale.y = window.innerWidth / 800;
        } else {
            this.app.stage.scale.x = 1;
            this.app.stage.scale.y = 1;
        }
    }
}

new Main();
