export default class Renderer {

    constructor(canvas) {

        this.canvas = canvas;

        this.ctx = canvas.getContext("2d");

        this.dpr = window.devicePixelRatio || 1;

        this.width = 0;
        this.height = 0;

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        this.resize();

    }

    resize() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.dpr = window.devicePixelRatio || 1;

        this.canvas.width = this.width * this.dpr;
        this.canvas.height = this.height * this.dpr;

        this.canvas.style.width = this.width + "px";
        this.canvas.style.height = this.height + "px";

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

        this.ctx.clearRect(
            0,
            0,
            this.width,
            this.height
        );

        this.drawBackground();

    }

    end() {

        // สำหรับเอฟเฟกต์หลังสุดในอนาคต

    }

    drawBackground() {

        const g = this.ctx.createLinearGradient(
            0,
            0,
            0,
            this.height
        );

        g.addColorStop(0, "#6EC6FF");
        g.addColorStop(1, "#CDEFFF");

        this.ctx.fillStyle = g;

        this.ctx.fillRect(
            0,
            0,
            this.width,
            this.height
        );

    }

}