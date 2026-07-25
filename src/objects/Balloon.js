export default class Balloon {

    constructor(x, y, word = "") {

        this.x = x;
        this.y = y;

        this.word = word;

        this.radius = 45;

        this.uiScale = 1;

        this.speed = 2 + Math.random() * 2;

        this.offset = Math.random() * 1000;

        this.color = `hsl(${Math.random() * 360}, 80%, 60%)`;

        this.scale = 1;

        this.dead = false;

    }

    update() {

    // ลอยขึ้น
    this.y -= this.speed * this.uiScale;

    // แกว่งซ้าย-ขวา
    this.x += Math.sin(
    performance.now() * 0.002 + this.offset
) * (0.5 * this.uiScale);

    // ย่อกลับหลังจากโดนคลิก
    this.scale += (1 - this.scale) * 0.15;

}

    setScale(scale) {

    this.uiScale = scale;

}

    draw(ctx) {

    const r = this.radius * this.uiScale;

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    // ===== เชือก =====
ctx.beginPath();
ctx.moveTo(0, r - 3 * this.uiScale);
ctx.lineTo(0, r + 45 * this.uiScale);

ctx.strokeStyle = "#666";
ctx.lineWidth = 2 * this.uiScale;
ctx.stroke();

    // ===== ตัวลูกโป่ง =====
    ctx.beginPath();
    ctx.arc(
        0,
        0,
        r,
        0,
        Math.PI * 2
    );

    // ไล่เฉดสี
    const gradient = ctx.createRadialGradient(
    -r * 0.35,
    -r * 0.45,
    r * 0.12,
    0,
    0,
    r
);

    gradient.addColorStop(0, "#FFFFFF");
    gradient.addColorStop(0.2, this.color);
    gradient.addColorStop(1, this.color);

    ctx.fillStyle = gradient;

    ctx.shadowColor = "rgba(0,0,0,0.35)";
    ctx.shadowBlur = 10 * this.uiScale;

    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 4 * this.uiScale;
    ctx.stroke();

    // ===== ไฮไลต์ =====
    ctx.beginPath();
ctx.arc(
    -15 * this.uiScale,
    -18 * this.uiScale,
    8 * this.uiScale,
    0,
    Math.PI * 2
);

    ctx.fillStyle = "rgba(255,255,255,.75)";
    ctx.fill();

    // ===== ข้อความ =====
    ctx.fillStyle = "#FFF";
    const fontSize = Math.min(
    20 * this.uiScale,
    r * 0.55
);

ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    ctx.fillText(
        this.word,
        0,
        0
    );

    ctx.restore();

}

    hit(px, py) {

    const dx = px - this.x;
    const dy = py - this.y;

    const r = this.radius * this.uiScale;

    return dx * dx + dy * dy <= r * r;

}

}