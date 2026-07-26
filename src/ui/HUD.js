export default class HUD {

    constructor(game) {

        this.game = game;

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

        this.drawCombo(ctx);

        ctx.save();

ctx.fillStyle = "#ffffff";
ctx.font = "bold 30px Sarabun";
ctx.textAlign = "center";

const question =

    this.game.questionType === "spoken"

        ? "เลือกคำภาษาพูด"

        : "เลือกคำภาษาเขียน";

ctx.fillText(

    question,

    this.game.renderer.width / 2,

    90

);

ctx.restore();


}

    drawStart(ctx) {

    ctx.save();

    ctx.fillStyle = "#87CEEB";
    ctx.fillRect(
        0,
        0,
        this.game.renderer.width,
        this.game.renderer.height
    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#ffffff";

    ctx.font = "bold 56px Sarabun";
    ctx.fillText(
        "🎈 เกมลูกโป่งคำศัพท์",
        this.game.renderer.width / 2,
        140
    );

    ctx.font = "bold 38px Sarabun";
    ctx.fillText(
        "คำภาษาพูด กับ คำภาษาเขียน",
        this.game.renderer.width / 2,
        220
    );

    ctx.font = "28px Sarabun";

    ctx.fillText(
        "คลิกเลือกลูกโป่งให้ตรงกับโจทย์",
        this.game.renderer.width / 2,
        320
    );

    ctx.fillText(
        "ตอบถูกต่อเนื่องเพื่อสะสม Combo",
        this.game.renderer.width / 2,
        370
    );

    ctx.fillStyle = "#FFD93D";

    ctx.font = "bold 40px Sarabun";

    ctx.fillText(
        "▶ คลิกเพื่อเริ่มเกม",
        this.game.renderer.width / 2,
        520
    );

    ctx.restore();

}

    

    drawScore(ctx) {

        ctx.save();

        ctx.fillStyle = "#ffffff";

        ctx.font = "bold 34px Sarabun";

        ctx.textAlign = "left";

        ctx.textBaseline = "top";

        ctx.strokeStyle = "rgba(0,0,0,.35)";

        ctx.lineWidth = 5;

        const text =
            `คะแนน : ${this.game.score}`;

        ctx.strokeText(text, 30, 25);

        ctx.fillText(text, 30, 25);

        ctx.restore();

    }

    drawTime(ctx) {

        ctx.save();

        ctx.fillStyle = "#ffffff";

        ctx.font = "bold 34px Sarabun";

        ctx.textAlign = "center";

        ctx.textBaseline = "top";

        ctx.strokeStyle = "rgba(0,0,0,.35)";

        ctx.lineWidth = 5;

        const text =
            `เวลา : ${Math.ceil(this.game.time)}`;

        ctx.strokeText(
            text,
            window.innerWidth / 2,
            25
        );

        ctx.fillText(
            text,
            window.innerWidth / 2,
            25
        );

        ctx.restore();

    }

    drawCombo(ctx) {

        if (this.game.combo <= 1) return;

        ctx.save();

        ctx.fillStyle = "#FFD93D";

        ctx.font = "bold 42px Sarabun";

        ctx.textAlign = "right";

        ctx.textBaseline = "top";

        ctx.strokeStyle = "#000";

        ctx.lineWidth = 6;

        const text =
            `${this.game.combo} COMBO`;

        ctx.strokeText(
            text,
            window.innerWidth - 30,
            25
        );

        ctx.fillText(
            text,
            window.innerWidth - 30,
            25
        );

        ctx.restore();

    }

    drawGameOver(ctx) {

    const w = window.innerWidth;
const h = window.innerHeight;

    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,0.6)";

    ctx.fillRect(

        0,

        0,

        w,

        h

    );

    ctx.textAlign = "center";

    ctx.fillStyle = "#FFFFFF";

    ctx.font = "bold 56px Sarabun";

    ctx.fillText(

        "หมดเวลา",

        w / 2,

        180

    );

    ctx.font = "bold 34px Sarabun";

    ctx.fillText(

        "คะแนน : " + this.game.score,

        w / 2,

        270

    );

    ctx.fillText(

        "Combo สูงสุด : " + this.game.bestCombo,

        w / 2,

        330

    );

    ctx.font = "28px Sarabun";

    ctx.fillText(

        "คลิกเพื่อเล่นใหม่",

        w / 2,

        430

    );

    ctx.restore();

}

}