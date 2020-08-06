import { SymbolsPack, Sprite } from "../../model/SymbolsModel";
// import { BoardRenderer } from "../../view/BoardRenderer";
import { BoardAnimator } from "../../view/BoardAnimator";
import { SpinButtonRenderer } from "../../view/SpinButtonRenderer";

export class SpinButtonController {
    private buttonSprites: Record<string, Sprite> = SymbolsPack.getInstance().getSpinButtonSprites();
    private renderer: SpinButtonRenderer = new SpinButtonRenderer(this.buttonSprites, this.stage);

    constructor(private animator: BoardAnimator, private stage: PIXI.Container) {
        this.initButton();
    }
    private initButton(): void {
        this.renderer.renderNormal();
        this.addMouseEventsListeners();
    }
    private getSprites(): Record<string, PIXI.Sprite> {
        const spinButtonSpriteNormal = this.buttonSprites.normal.getView();
        const spinButtonSpritePressed = this.buttonSprites.pressed.getView();
        const spinButtonSpriteHover = this.buttonSprites.hover.getView();
        spinButtonSpriteNormal.interactive = true;
        spinButtonSpritePressed.interactive = true;
        spinButtonSpriteHover.interactive = true;

        return {
            spinButtonSpriteNormal,
            spinButtonSpritePressed,
            spinButtonSpriteHover,
        };
    }
    public addMouseEventsListeners(): void {
        const { spinButtonSpriteNormal, spinButtonSpriteHover } = this.getSprites();

        const spin = () => {
            this.renderer.renderPressed();
            this.animator.runDropDown();
            setTimeout(() => {
                this.renderer.renderNormal();
            }, 3000);
        };

        spinButtonSpriteNormal.on("mouseover", () => {
            this.renderer.renderHover();
        });
        spinButtonSpriteHover.on("mouseout", () => {
            this.renderer.renderNormal();
        });

        spinButtonSpriteNormal.on("mousedown", spin);
        spinButtonSpriteHover.on("mousedown", spin);
    }
}
