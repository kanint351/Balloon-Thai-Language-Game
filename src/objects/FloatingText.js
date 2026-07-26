export default class FloatingText {

    constructor(x, y, text) {

        this.x = x;
        this.y = y;

        this.text = text;

        this.life = 0.8;
        this.maxLife = 0.8;

        this.alive = true;

    }

    update(dt) {

        this.y -= 40 * dt;

        this.life -= dt;

        if (this.life <= 0) {

            this.alive = false;

        }

    }

    draw(ctx) {

        ctx.save();

        ctx.globalAlpha =
            this.life / this.maxLife;

        ctx.fillStyle = "#FFD700";

        ctx.strokeStyle = "#000";

        ctx.lineWidth = 4;

        const fontSize = Math.max(
    18,
    this.radius * 0.45
);

ctx.font =
    `bold ${fontSize}px Sarabun`;

        ctx.textAlign = "center";

        ctx.strokeText(
            this.text,
            this.x,
            this.y
        );

        ctx.fillText(
            this.text,
            this.x,
            this.y
        );

        ctx.restore();

    }

}