export default class Balloon {

    constructor(x, y, word, wordType) {

    this.popping = false;
    this.popTime = 0;
    this.popDuration = 0.12;

    this.reset(x, y, word, wordType);

}

    reset(x, y, word, wordType) {

    this.alive = true;

this.popping = false;

this.popTime = 0;

this.scale = 1;

    this.x = x;
    this.startX = x;

    this.y = y;

    this.word = word;
    this.wordType = wordType;

    this.radius = 42 + Math.random() * 8;

    this.speed = 220 + Math.random() * 120;

    this.swingOffset = Math.random() * Math.PI * 2;

    this.swingSpeed = 1.5 + Math.random();

    this.swingAmount = 40 + Math.random() * 20;

    this.time = 0;

    this.alive = true;

    const colors = [
        "#ff4d6d",
        "#ff8fab",
        "#ffb703",
        "#8ecae6",
        "#90be6d",
        "#b5179e",
        "#4361ee"
    ];

    this.color =
        colors[
            Math.floor(Math.random() * colors.length)
        ];

    this.scale = 1;

this.popping = false;

this.popTime = 0;

this.popDuration = 0.12;

}

    update(dt) {

    if (!this.alive) return;


    if (this.popping) {

    this.popTime += dt;

    this.scale =
        1 -
        this.popTime / this.popDuration;

    if (this.popTime >= this.popDuration) {

        this.alive = false;

    }

    return;

}

    this.y -= this.speed * dt;
    this.time += dt;

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

    // ย้ายจุดอ้างอิงไปที่กึ่งกลางลูกโป่ง
    ctx.translate(
        this.x,
        this.y
    );

    // ย่อหรือขยาย
    ctx.scale(
        this.scale,
        this.scale
    );

    // ย้ายกลับ
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

    ctx.save();

    ctx.translate(this.x, this.y);

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.moveTo(0, -48);

    ctx.bezierCurveTo(
        35, -48,
        45, -5,
        0, 48
    );

    ctx.bezierCurveTo(
        -45, -5,
        -35, -48,
        0, -48
    );

    ctx.fill();

    // แสงสะท้อน

    ctx.fillStyle = "rgba(255,255,255,.35)";

    ctx.beginPath();

    ctx.ellipse(
        -12,
        -18,
        8,
        16,
        Math.PI / 6,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // ปมลูกโป่ง

    ctx.fillStyle = this.color;

    ctx.beginPath();

    ctx.moveTo(-5, 46);
    ctx.lineTo(5, 46);
    ctx.lineTo(0, 58);

    ctx.closePath();

    ctx.fill();

    ctx.restore();

}

    drawString(ctx) {

    ctx.strokeStyle = "#666";

    ctx.lineWidth = 2;

    ctx.beginPath();

    ctx.moveTo(
        this.x,
        this.y + 55
    );

    const curve =
        Math.sin(this.time * 4) * 10;

    ctx.quadraticCurveTo(

        this.x + curve,

        this.y + 90,

        this.x,

        this.y + 125

    );

    ctx.stroke();

}

    drawWord(ctx) {

    ctx.fillStyle = "#fff";

    ctx.font = "bold 20px Sarabun";

    ctx.textAlign = "center";

    ctx.textBaseline = "middle";

    ctx.strokeStyle = "rgba(0,0,0,.25)";

    ctx.lineWidth = 4;

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