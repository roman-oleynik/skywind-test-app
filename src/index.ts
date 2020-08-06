import * as PIXI from "pixi.js";
import { SymbolsPack } from "./components/model/SymbolsModel";
import { BoardModel } from "./components/model/BoardModel";
import { BoardRenderer } from "./components/view/Renderer";
import { BoardAnimator } from "./components/view/Animator";

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

        const boardAnimator = new BoardAnimator(spritesArr, this.app.renderer, stage, this.app.ticker);
        boardAnimator.runDropDown();

        // const reelsArr = spritesArr.getReels();
        // const sprite = reelsArr[0][0].getView();
        // console.log(stage.render);
        // const dropDown = () => {
        //     sprite.position.y += 20;
        //     if (sprite.position.y >= 600) {
        //         sprite.position.y = -300;
        //         this.app.ticker.remove(dropDown);
        //         // sprite.position.y += 20;
        //     }
        //     this.app.renderer.render(stage);
        // };
        // this.app.ticker.add(dropDown);

        // const rand = Math.floor(Math.random() * 7) + 1;

        // const sprite1 = this.symbolsPack.getSymbols()[`symbol-${rand}`].getView();
        // console.log(sprite1);

        // sprite.position.x = 30;
        // sprite.position.y = 0;
        // sprite.height = 80;
        // sprite.width = 80;
        // stage.addChild(sprite);

        // const dropDown = () => {
        //     sprite.rotation += 0.005;
        //     if (sprite.rotation >= 0.05) {
        //         sprite.rotation = 0.05;
        //     }
        //     sprite.position.y += 20;
        //     if (sprite.position.y >= 600) {
        //         sprite.position.y = -300;
        //         sprite.position.y += 20;
        //     }
        //     this.app.renderer.render(stage);
        // };
        // const rotate = () => {
        //     sprite.rotation -= 0.005;
        //     if (sprite.rotation <= 0) {
        //         sprite.rotation = 0;
        //         this.app.ticker.remove(rotate);
        //     }
        //     console.log(sprite.rotation);
        // };

        // this.app.ticker.add(dropDown);

        // setTimeout(() => {
        //     this.app.ticker.remove(dropDown);
        //     this.app.ticker.add(rotate);
        // }, 1000);
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
