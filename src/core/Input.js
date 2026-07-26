export default class Input {

    constructor(canvas, renderer) {

    this.canvas = canvas;
    this.renderer = renderer;

        this.x = 0;
        this.y = 0;

        this.prevX = 0;
        this.prevY = 0;

        this.dx = 0;
        this.dy = 0;

        this.down = false;

        this.swiping = false;

        this.justPressed = false;
        this.justReleased = false;

        canvas.addEventListener(
            "pointerdown",
            this.onPointerDown.bind(this)
        );

        canvas.addEventListener(
            "pointermove",
            this.onPointerMove.bind(this)
        );

        window.addEventListener(
            "pointerup",
            this.onPointerUp.bind(this)
        );

    }

    getPosition(event) {

    const rect =
        this.canvas.getBoundingClientRect();

    const screenX =
        event.clientX - rect.left;

    const screenY =
        event.clientY - rect.top;

    return {

        x:
            (screenX - this.renderer.offsetX) /
            this.renderer.scale,

        y:
            (screenY - this.renderer.offsetY) /
            this.renderer.scale

    };

}

    onPointerDown(event) {

        const p = this.getPosition(event);

        this.x = p.x;
        this.y = p.y;

        this.prevX = p.x;
        this.prevY = p.y;

        this.dx = 0;
        this.dy = 0;

        this.down = true;

        this.justPressed = true;

    }

    onPointerMove(event) {

        if (!this.down) return;

        const p = this.getPosition(event);

        this.prevX = this.x;
        this.prevY = this.y;

        this.x = p.x;
        this.y = p.y;

        this.dx = this.x - this.prevX;
        this.dy = this.y - this.prevY;

        this.swiping = true;

    }

    onPointerUp() {

        this.down = false;

        this.swiping = false;

        this.justReleased = true;

    }

    endFrame() {

    this.justPressed = false;
    this.justReleased = false;

}

}