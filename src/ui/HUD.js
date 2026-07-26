export default class HUD {

    constructor(game) {

        this.game = game;

    }

    getFont(size) {

        return `bold ${size}px Sarabun`;

    }

    draw(ctx) {

        if (this.game.showStart) {

            this.drawStart(ctx);
            return;

        }

        if (this.game.gameOver) {

            this.drawGameOver(ctx);
            return;

        }

        this.drawScore(ctx);
        this.drawTime(ctx);
        this.drawQuestion(ctx);
        this.drawCombo(ctx);

    }

    drawQuestion(ctx) {

        const w = this.game.renderer.gameWidth;

        ctx.save();

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "rgba(0,0,0,.45)";
        ctx.lineWidth = 6;

        ctx.font = this.getFont(52);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const text =
            this.game.questionType === "spoken"
                ? "เลือกคำภาษาพูด"
                : "เลือกคำภาษาเขียน";

        ctx.strokeText(
            text,
            w / 2,
            110
        );

        ctx.fillText(
            text,
            w / 2,
            110
        );

        ctx.restore();

    }

    drawScore(ctx) {

        ctx.save();

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "rgba(0,0,0,.45)";
        ctx.lineWidth = 6;

        ctx.font = this.getFont(56);

        ctx.textAlign = "left";
        ctx.textBaseline = "top";

        const text = `🏆 คะแนน ${this.game.score}`;

        ctx.strokeText(
            text,
            60,
            50
        );

        ctx.fillText(
            text,
            60,
            50
        );

        ctx.restore();

    }

    drawTime(ctx) {

        const w = this.game.renderer.gameWidth;

        ctx.save();

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "rgba(0,0,0,.45)";
        ctx.lineWidth = 6;

        ctx.font = this.getFont(56);

        ctx.textAlign = "right";
        ctx.textBaseline = "top";

        const text =
            `⏰ ${Math.ceil(this.game.time)}`;

        ctx.strokeText(
            text,
            w - 60,
            50
        );

        ctx.fillText(
            text,
            w - 60,
            50
        );

        ctx.restore();

    }

    drawCombo(ctx) {

        if (this.game.combo <= 1) return;

        const w = this.game.renderer.gameWidth;

        ctx.save();

        ctx.fillStyle = "#FFD700";
        ctx.strokeStyle = "#B22222";
        ctx.lineWidth = 6;

        ctx.font = this.getFont(44);

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        const text =
            `🔥 x${this.game.combo}`;

        ctx.strokeText(
            text,
            w / 2,
            175
        );

        ctx.fillText(
            text,
            w / 2,
            175
        );

        ctx.restore();

    }

    drawStart(ctx) {

        const w = this.game.renderer.gameWidth;
        const h = this.game.renderer.gameHeight;

        const cx = w / 2;
        const cy = h / 2;

        ctx.save();

        ctx.fillStyle = "#87CEEB";
        ctx.fillRect(
            0,
            0,
            w,
            h
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#FFFFFF";

        ctx.font = this.getFont(90);

        ctx.fillText(
            "🎈 เกมลูกโป่งคำศัพท์",
            cx,
            cy - 170
        );

        ctx.font = this.getFont(42);

        ctx.fillText(
            "คำภาษาพูด กับ คำภาษาเขียน",
            cx,
            cy - 80
        );

        ctx.font = this.getFont(28);

        ctx.fillText(
            "คลิกเลือกลูกโป่งให้ตรงกับโจทย์",
            cx,
            cy + 10
        );

        ctx.fillText(
            "ตอบถูกต่อเนื่องเพื่อสะสม Combo",
            cx,
            cy + 55
        );

        ctx.fillStyle = "#FFD93D";

        ctx.font = this.getFont(60);

        ctx.fillText(
            "▶ คลิกเพื่อเริ่มเกม",
            cx,
            cy + 170
        );

        ctx.restore();

    }

    drawGameOver(ctx) {

        const w = this.game.renderer.gameWidth;
        const h = this.game.renderer.gameHeight;

        ctx.save();

        ctx.fillStyle =
            "rgba(0,0,0,.65)";

        ctx.fillRect(
            0,
            0,
            w,
            h
        );

        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        ctx.fillStyle = "#FFFFFF";

        ctx.font = this.getFont(110);

        ctx.fillText(
            "หมดเวลา",
            w / 2,
            h / 2 - 150
        );

        ctx.font = this.getFont(60);

        ctx.fillText(
            `คะแนน ${this.game.score}`,
            w / 2,
            h / 2 - 40
        );

        ctx.fillText(
            `Combo สูงสุด ${this.game.bestCombo}`,
            w / 2,
            h / 2 + 40
        );

        ctx.fillStyle = "#FFD93D";

        ctx.font = this.getFont(52);

        ctx.fillText(
            "▶ คลิกเพื่อเล่นใหม่",
            w / 2,
            h / 2 + 170
        );

        ctx.restore();

    }

}