import * as PIXI from "pixi.js";
import { Howl } from "howler";

import { BoardAnimator } from "../../animation/BoardAnimator";
import { SpinButtonRenderer } from "../../rendering/SpinButtonRenderer";
import { BoardRenderer } from "../../rendering/BoardRenderer";
import { Reel } from "../../model/ReelModel";
import { BoardModel } from "../../model/BoardModel";

export class AppController {
    private reels: Reel[];
    private startSpinSound: Howl = new Howl({
        src: ["../../../../assets/sounds/Start_Button.mp3"],
    });
    constructor(
        private board: BoardModel,
        private animator: BoardAnimator,
        private boardRenderer: BoardRenderer,
        private spinButtonRenderer: SpinButtonRenderer,
        private app: PIXI.Application
    ) {
        this.reels = this.board.getReels();
    }
    public init(): void {
        this._initButton();
        this.boardRenderer.render(190);
    }
    private _initButton(): void {
        this.spinButtonRenderer.renderNormal();
        this._addMouseEventsListeners();
    }
    private _getSprites(): Record<string, PIXI.Sprite> {
        const spinButtonSpriteNormal = this.spinButtonRenderer.sprites.normal.getView();
        const spinButtonSpritePressed = this.spinButtonRenderer.sprites.pressed.getView();
        const spinButtonSpriteHover = this.spinButtonRenderer.sprites.hover.getView();
        spinButtonSpriteNormal.interactive = true;
        spinButtonSpritePressed.interactive = true;
        spinButtonSpriteHover.interactive = true;

        return {
            spinButtonSpriteNormal,
            spinButtonSpritePressed,
            spinButtonSpriteHover,
        };
    }
    private _rerenderSpritesOnTop(): void {
        this.board.refresh();
        this.reels = this.board.getReels();
        this.boardRenderer = new BoardRenderer(this.reels, this.app, 150);
        this.boardRenderer.render(-300);
    }
    private _deleteAnExtraMask(mask: PIXI.Graphics) {
        this.app.stage.removeChild(mask);
    }
    private _spin(): void {
        this.startSpinSound.play();

        this.spinButtonRenderer.renderPressed();
        this.animator.runDropDown();
        this._rerenderSpritesOnTop();

        setTimeout(() => {
            this.animator.runFallingFromTop();
            this._deleteAnExtraMask(this.boardRenderer.mask);
        }, 1000);
    }
    private _addMouseEventsListeners(): void {
        const { spinButtonSpriteNormal, spinButtonSpriteHover } = this._getSprites();

        spinButtonSpriteNormal.on("mouseover", () => {
            this.spinButtonRenderer.renderHover();
        });
        spinButtonSpriteHover.on("mouseout", () => {
            this.spinButtonRenderer.renderNormal();
        });

        spinButtonSpriteNormal.on("click", this._spin.bind(this));
        spinButtonSpriteHover.on("click", this._spin.bind(this));
    }
}
