export default class Balloon {

    constructor(x, y, word, wordType) {

        this.popDuration = 0.12;

        this.reset(x, y, word, wordType);

    }

    reset(x, y, word, wordType) {

        this.x = x;
        this.startX = x;
        this.y = y;

        this.word = word;
        this.wordType = wordType;

        this.alive = true;
        this.popping = false;
        this.popTime = 0;
        this.scale = 1;

        // ขนาดลูกโป่ง
        this.radius = 56;

        // ความเร็ว
        this.speed = 260 + Math.random() * 40;

        // การแกว่ง
        this.swingOffset = Math.random() * Math.PI * 2;
        this.swingSpeed = 1.6 + Math.random() * 0.5;
        this.swingAmount = 35;

        this.time = 0;

        const colors = [
            "#ff4d6d",
            "#ff8fab",
            "#ffb703",
            "#8ecae6",
            "#90be6d",
            "#4361ee",
            "#b5179e"
        ];

        this.color =
            colors[
                Math.floor(
                    Math.random() * colors.length
                )
            ];

    }

    update(dt) {

        if (!this.alive) return;

        if (this.popping) {

            this.popTime += dt;

            this.scale =
                Math.max(
                    0,
                    1 - this.popTime / this.popDuration
                );

            if (this.popTime >= this.popDuration) {

                this.alive = false;

            }

            return;

        }

        this.time += dt;

        this.y -= this.speed * dt;

        this.x =
            this.startX +
            Math.sin(
                this.time * this.swingSpeed +
                this.swingOffset
            ) *
            this.swingAmount;

    }

    draw(ctx) {

        if (!this.alive) return;

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.scale(
            this.scale,
            this.scale
        );

        ctx.translate(
            -this.x,
            -this.y
        );

        this.drawBalloon(ctx);
        this.drawString(ctx);
        this.drawWord(ctx);

        ctx.restore();

    }

    pop() {

        if (this.popping) return;

        this.popping = true;

    }

    contains(x, y) {

        const dx = x - this.x;
        const dy = y - this.y;

        return dx * dx + dy * dy <= this.radius * this.radius;

    }

    isOutOfScreen() {

        return this.y + this.radius < 0;

    }

    drawBalloon(ctx) {

        const r = this.radius;

        ctx.save();

        ctx.translate(
            this.x,
            this.y
        );

        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.moveTo(0, -r);

        ctx.bezierCurveTo(
            r * 0.75,
            -r,
            r,
            -5,
            0,
            r
        );

        ctx.bezierCurveTo(
            -r,
            -5,
            -r * 0.75,
            -r,
            0,
            -r
        );

        ctx.fill();

        // แสงสะท้อน
        ctx.fillStyle = "rgba(255,255,255,.35)";

        ctx.beginPath();

        ctx.ellipse(
            -r * 0.28,
            -r * 0.35,
            r * 0.18,
            r * 0.35,
            Math.PI / 6,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // ปม
        ctx.fillStyle = this.color;

        ctx.beginPath();

        ctx.moveTo(-6, r - 2);
        ctx.lineTo(6, r - 2);
        ctx.lineTo(0, r + 12);

        ctx.closePath();

        ctx.fill();

        ctx.restore();

    }

    drawString(ctx) {

        const r = this.radius;

        ctx.strokeStyle = "#666";
        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
            this.x,
            this.y + r + 10
        );

        const curve =
            Math.sin(this.time * 4) * 10;

        ctx.quadraticCurveTo(
            this.x + curve,
            this.y + r + 45,
            this.x,
            this.y + r + 90
        );

        ctx.stroke();

    }

    drawWord(ctx) {

        let fontSize = 36;

        if (this.word.length <= 3) {

            fontSize = 42;

        } else if (this.word.length >= 7) {

            fontSize = 30;

        }

        ctx.fillStyle = "#FFFFFF";

        ctx.strokeStyle = "rgba(0,0,0,.45)";

        ctx.lineWidth = 5;

        ctx.font =
            `bold ${fontSize}px Sarabun`;

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.strokeText(
            this.word,
            this.x,
            this.y
        );

        ctx.fillText(
            this.word,
            this.x,
            this.y
        );

    }

}