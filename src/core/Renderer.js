export default class Renderer {

    constructor(canvas) {

        this.safe = {
    left: 80,
    right: 80,
    top: 80,
    bottom: 80
};

        this.canvas = canvas;

        this.ctx = canvas.getContext("2d");

        this.dpr = window.devicePixelRatio || 1;

        this.gameWidth = 1920;
this.gameHeight = 1080;

this.width = this.gameWidth;
this.height = this.gameHeight;

this.scale = 1;
this.offsetX = 0;
this.offsetY = 0;

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        this.resize();

    }

    resize() {

    const w = window.innerWidth;
    const h = window.innerHeight;

    this.dpr = window.devicePixelRatio || 1;

    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;

    this.canvas.style.width = w + "px";
    this.canvas.style.height = h + "px";

    this.scale = Math.min(
        w / this.gameWidth,
        h / this.gameHeight
    );

    this.offsetX =
        (w - this.gameWidth * this.scale) / 2;

    this.offsetY =
        (h - this.gameHeight * this.scale) / 2;

    this.ctx.setTransform(
        this.dpr,
        0,
        0,
        this.dpr,
        0,
        0
    );

}

    begin() {

    const ctx = this.ctx;

    ctx.setTransform(
        this.dpr,
        0,
        0,
        this.dpr,
        0,
        0
    );

    ctx.clearRect(
        0,
        0,
        this.canvas.width,
        this.canvas.height
    );

    this.drawBackground();

    ctx.translate(
        this.offsetX,
        this.offsetY
    );

    ctx.scale(
        this.scale,
        this.scale
    );

}

    end() {

        // สำหรับเอฟเฟกต์หลังสุดในอนาคต

    }

    drawBackground() {

        const w = this.canvas.width / this.dpr;
const h = this.canvas.height / this.dpr;

const g = this.ctx.createLinearGradient(
    0,
    0,
    0,
    h
);

g.addColorStop(0, "#6EC6FF");
g.addColorStop(1, "#CDEFFF");

this.ctx.fillStyle = g;

this.ctx.fillRect(
    0,
    0,
    w,
    h
);

    }

    getScale() {

    return this.scale;

}

getWidth() {

    return this.gameWidth;

}

getHeight() {

    return this.gameHeight;

}

getPlayArea() {

    return {

        left: this.safe.left,

        right: this.gameWidth - this.safe.right,

        top: this.safe.top,

        bottom: this.gameHeight - this.safe.bottom

    };

}

}