export default class Particle {

    constructor(x, y, color) {

        this.x = x;
        this.y = y;

        this.color = color;

        this.vx = (Math.random() - 0.5) * 8;
        this.vy = (Math.random() - 0.5) * 8;

        this.size = 6 + Math.random() * 6;

        this.life = 40;

    }

    update() {

        this.x += this.vx;
        this.y += this.vy;

        this.vy += 0.15;

        this.life--;

    }

    draw(ctx) {

        ctx.save();

        ctx.globalAlpha = this.life / 40;

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}