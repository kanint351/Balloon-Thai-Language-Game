export default class Particle {

    constructor(x, y, color = "#ff5c8a") {

        this.reset(x, y, color);

    }

    reset(x, y, color) {

        this.x = x;
        this.y = y;

        this.vx = (Math.random() - 0.5) * 400;
        this.vy = (Math.random() - 0.5) * 400;

        this.life = 1;
        this.radius = 3 + Math.random() * 5;

        this.color = color;

        this.alive = true;

    }

    update(dt) {

        if (!this.alive) return;

        this.life -= dt * 2;

        if (this.life <= 0) {

            this.alive = false;
            return;

        }

        this.x += this.vx * dt;
        this.y += this.vy * dt;

        this.vy += 500 * dt;

    }

    draw(ctx) {

        if (!this.alive) return;

        ctx.save();

        ctx.globalAlpha = this.life;

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

    }

}