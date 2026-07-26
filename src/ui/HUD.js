export default class HUD {

    constructor(game) {

        this.game = game;

    }

    getFont(size) {

    return `bold ${size + 10}px Sarabun`;

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
ctx.font = this.getFont(30);
ctx.textAlign = "center";

const question =

    this.game.questionType === "spoken"

        ? "เลือกคำภาษาพูด"

        : "เลือกคำภาษาเขียน";

ctx.fillText(

    question,

    this.game.renderer.width / 2,

    170

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

    ctx.font = this.getFont(96);
    ctx.fillText(
        "🎈 เกมลูกโป่งคำศัพท์",
        this.game.renderer.width / 2,
        140
    );

    ctx.font = this.getFont(38);
    ctx.fillText(
        "คำภาษาพูด กับ คำภาษาเขียน",
        this.game.renderer.width / 2,
        220
    );

    ctx.font = this.getFont(28);

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

    ctx.font = this.getFont(58);

    ctx.fillText(
        "▶ คลิกเพื่อเริ่มเกม",
        this.game.renderer.width / 2,
        520
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

    const x = 60;
    const y = 60;

    const text = `🏆 คะแนน ${this.game.score}`;

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    ctx.restore();

}

    drawTime(ctx) {

    ctx.save();

    ctx.fillStyle = "#FFFFFF";

    ctx.strokeStyle = "rgba(0,0,0,.45)";

    ctx.lineWidth = 6;

    ctx.font = this.getFont(56);

    ctx.textAlign = "right";

    ctx.textBaseline = "top";

    const x = this.game.renderer.gameWidth - 60;
    const y = 60;

    const text = `⏰ ${Math.ceil(this.game.time)}`;

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    ctx.restore();

}

    drawCombo(ctx) {

    if (this.game.combo <= 1) return;

    ctx.save();

    ctx.fillStyle = "#FFD700";

    ctx.strokeStyle = "#B22222";

    ctx.lineWidth = 6;

    ctx.font = this.getFont(48);

    ctx.textAlign = "right";

    ctx.textBaseline = "top";

    const x = this.game.renderer.gameWidth - 60;
    const y = 135;

    const text = `🔥 x${this.game.combo}`;

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);

    ctx.restore();

}

    drawGameOver(ctx) {

    const w = this.game.renderer.width;
const h = this.game.renderer.height;

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

    ctx.font = this.getFont(110);

    ctx.fillText(

        "หมดเวลา",

        w / 2,

        180

    );

    ctx.font = this.getFont(60);

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

    ctx.font = this.getFont(28);
    ctx.fillText(

        "คลิกเพื่อเล่นใหม่",

        w / 2,

        430

    );

    ctx.restore();

}

}