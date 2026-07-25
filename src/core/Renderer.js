import BalloonManager from "../objects/BalloonManager.js";
import Input from "./Input.js";
import Score from "../ui/Score.js";
import GameLogic from "./GameLogic.js";

const GAME_TIME = 90;
const HIT_COOLDOWN = 150;

export default class Renderer {

    constructor() {

        // Canvas
        this.canvas = document.createElement("canvas");
        this.ctx = this.canvas.getContext("2d");
        document.body.appendChild(this.canvas);

        // Core
        this.input = new Input(this.canvas);
        this.logic = new GameLogic();
        this.score = new Score();

        this.balloonManager =
            new BalloonManager(
                this.canvas,
                this.logic
            );

        // Game
        this.time = GAME_TIME;
        this.gameOver = false;
        this.gameStarted = false;
        this.gameOverStart = 0;
        this.gameOverAnim = 0;

        // Hit
        this.lastHitTime = 0;

        // Combo
        this.combo = 0;
        this.comboTimer = 0;



        // Stats
        this.stats = {

            balloons: 0,
            hit: 0,
            miss: 0,
            maxCombo: 0

        };

        // Floating score
        this.floatingTexts = [];

        

        window.addEventListener(
            "resize",
            () => this.resize()
        );

        this.ui = {
        scale: 1,
        width: 0,
        height: 0

};
        this.resize();



        this.balloonManager.reset();

    }

    resize() {

    const dpr = window.devicePixelRatio || 1;

    this.canvas.style.width = `${window.innerWidth}px`;
    this.canvas.style.height = `${window.innerHeight}px`;

    this.canvas.width = Math.floor(window.innerWidth * dpr);
    this.canvas.height = Math.floor(window.innerHeight * dpr);

    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    this.updateUIScale();

}

    start() {

        setInterval(() => {

            if (
                !this.gameOver &&
                this.time > 0
            ) {

                this.time--;

            }

        },1000);

        this.loop();
    }

            loop() {

        this.input.update();

        this.update();

        this.render();

        requestAnimationFrame(
            () => this.loop()
        );

    
}

    // =====================================
    // UPDATE
    // =====================================

    update() {

        if (this.gameOver) {

            return;

        }

        this.balloonManager.update();

        // เวลา
        if (this.time <= 0) {

    if (!this.gameOver) {
        this.gameOver = true;
        this.gameOverStart = performance.now();
    }

}

        // Floating Score
        for (

            let i = this.floatingTexts.length - 1;

            i >= 0;

            i--

        ) {

            const t =
                this.floatingTexts[i];

            const s = this.ui.scale;

            t.y -= 1.4 * s;
            t.alpha -= 0.02;
            t.scale *= 0.985;

            if (t.alpha <= 0) {

                this.floatingTexts.splice(i,1);

            }

        }

        // Combo Timeout

        const COMBO_TIMEOUT = 5000;

        if (

    this.combo > 0 &&

    performance.now() -

    this.comboTimer >

    COMBO_TIMEOUT

) {

    this.combo = 0;

}

        // Cooldown

        if (

            performance.now() -

            this.lastHitTime <

            HIT_COOLDOWN

        ) {

            return;

        }

        const hit =

            this.balloonManager.hit(

                this.input.drawX,

                this.input.drawY

            );

        if (!hit) return;

        this.lastHitTime =

            performance.now();

        this.handleHit(hit);

    }

    // =====================================
    // HIT
    // =====================================

    handleHit(hit) {

        this.stats.balloons++;

        const correct =

            hit.balloon.word ===

            this.logic.current.written;

            

        this.balloonManager.explode(

            hit.balloon

        );

        this.balloonManager.remove(

            hit.index

        );

        if (correct) {

            this.correctAnswer(hit);

        }

        else {

            this.wrongAnswer();

        }

    }

    // =====================================
    // CORRECT
    // =====================================

    correctAnswer(hit) {

        this.stats.hit++;

        this.combo++;

        this.comboTimer =

            performance.now();

        this.stats.maxCombo =

            Math.max(

                this.combo,

                this.stats.maxCombo

            );

        const point =

            10 +

            (this.combo - 1) * 5;

        this.score.value += point;

        this.floatingTexts.push({

            x: hit.balloon.x,

            y: hit.balloon.y,

            text: `+${point}`,

            alpha: 1,

            scale: 1.25

        });

        // เปลี่ยนคำถาม

        this.logic.next();

        // รีเซ็ตลูกโป่งทั้งหมด

        this.balloonManager.reset();

    }

    // =====================================
    // WRONG
    // =====================================

    wrongAnswer() {

    this.stats.miss++;

    this.combo = 0;

    this.score.value = Math.max(
        0,
        this.score.value - 5
    );

    this.balloonManager.spawnWrongBalloon();

}

    updateUIScale() {

    const w = window.innerWidth;
const h = window.innerHeight;

    this.ui.width = w;
    this.ui.height = h;

    this.ui.scale = Math.max(
        0.75,
        Math.min(
            w / 1280,
            h / 720
        )
    );



}

getUI() {

    const s = this.ui.scale;

    return {

        s,

        margin: 20 * s,

        marginLarge: 40 * s,

        top: 45 * s,

        gapSmall: 18 * s,

        gap: 42 * s,

        gapLarge: 55 * s,

        radius: 24 * s,

        font: {

            h1: 82 * s,

            h2: 44 * s,

            h3: 36 * s,

            body: 28 * s,

            small: 18 * s,

            button: 26 * s

        },

        comboBar: {

            width: 180 * s,

            height: 12 * s

        },

        button: {

            width: 300 * s,

            height: 55 * s

        }

    };

}

        // =====================================
    // RENDER
    // =====================================

    render() {

    this.updateUIScale();

    const ctx = this.ctx;

    ctx.clearRect(
        0,
        0,
        window.innerWidth,
    window.innerHeight
    );

    this.drawBackground();

    // หน้าเริ่มเกม
    if (!this.gameStarted) {

        this.drawStartScreen();

        return;

    }

    this.balloonManager.draw(ctx);

    this.drawFloatingTexts();

    this.drawHUD();

    this.drawCursor();

    if (this.gameOver) {

        this.drawGameOver();

    }

}

    // =====================================
    // BACKGROUND
    // =====================================

    drawBackground() {

        const ctx = this.ctx;

        const g =
            ctx.createLinearGradient(
                0,
                0,
                0,
                window.innerHeight
            );

        g.addColorStop(0, "#A8E6FF");
        g.addColorStop(1, "#EAFBFF");

        ctx.fillStyle = g;

        ctx.fillRect(
            0,
            0,
            window.innerWidth,
            window.innerHeight
        );

    }

    // =====================================
    // HUD
    // =====================================

    drawHUD() {

    const ctx = this.ctx;
    const ui = this.getUI();

    const {
        margin,
        top,
        comboBar,
        font
    } = ui;

    // =======================
    // Score
    // =======================

    ctx.textAlign = "left";

    ctx.fillStyle = "#222";
    ctx.font = `bold ${font.h3}px Arial`;

    ctx.fillText(
        `⭐ Score : ${this.score.value}`,
        margin,
        top
    );

    // =======================
    // Combo
    // =======================

    ctx.fillStyle = "#FF5722";
    ctx.font = `bold ${30 * ui.s}px Arial`;

    ctx.fillText(
        `🔥 Combo : x${this.combo}`,
        margin,
        top + 40 * ui.s
    );

    ctx.fillStyle = "#1976D2";
    ctx.font = `${24 * ui.s}px Arial`;

    ctx.fillText(
        `🏆 Max : x${this.stats.maxCombo}`,
        margin,
        top + 72 * ui.s
    );

    // =======================
    // Combo Bar
    // =======================

    const remain = Math.max(
        0,
        1 -
        (
            performance.now() -
            this.comboTimer
        ) / 5000
    );

    const barX = margin;
    const barY = top + 88 * ui.s;

    ctx.fillStyle = "#DDD";
    ctx.fillRect(
        barX,
        barY,
        comboBar.width,
        comboBar.height
    );

    ctx.fillStyle =
        remain > 0.5
            ? "#4CAF50"
            : remain > 0.2
            ? "#FFC107"
            : "#F44336";

    ctx.fillRect(
        barX,
        barY,
        comboBar.width * remain,
        comboBar.height
    );

    ctx.strokeStyle = "#555";
    ctx.strokeRect(
        barX,
        barY,
        comboBar.width,
        comboBar.height
    );

    // =======================
    // Stats
    // =======================

    const accuracy =
        this.stats.balloons === 0
            ? 0
            : Math.round(
                this.stats.hit * 100 /
                this.stats.balloons
            );

    ctx.fillStyle = "#333";
    ctx.font = `${font.small}px Arial`;

    ctx.fillText(
        `🎯 ถูก : ${this.stats.hit}`,
        margin,
        top + 128 * ui.s
    );

    ctx.fillText(
        `❌ ผิด : ${this.stats.miss}`,
        margin,
        top + 155 * ui.s
    );

    ctx.fillText(
        `📊 ความแม่นยำ : ${accuracy}%`,
        margin,
        top + 182 * ui.s
    );

    // =======================
    // Target
    // =======================

    ctx.textAlign = "center";

    ctx.fillStyle = "#1565C0";
    ctx.font = `bold ${font.h3}px Arial`;

    ctx.fillText(
        this.logic.current.spoken,
        this.ui.width / 2,
        top
    );

    // =======================
    // Timer
    // =======================

    ctx.textAlign = "right";

    ctx.fillStyle =
        this.time <= 10
            ? "#E53935"
            : "#222";

    ctx.font = `bold ${font.h3}px Arial`;

    ctx.fillText(
        `⏰ ${this.time}`,
        this.ui.width - margin,
        top
    );

}

drawFloatingTexts() {

    const ctx = this.ctx;
    const ui = this.getUI();

    for (const t of this.floatingTexts) {

        ctx.save();

        ctx.globalAlpha = t.alpha;

        ctx.translate(t.x, t.y);

        ctx.scale(t.scale, t.scale);

        ctx.fillStyle = "#2E7D32";
        ctx.font = `bold ${28 * ui.s}px Arial`;
        ctx.textAlign = "center";

        ctx.fillText(t.text, 0, 0);

        ctx.restore();
    }

}
    // =====================================
    // FLOATING SCORE
    // =====================================

    drawCursor() {

    const ctx = this.ctx;
    const ui = this.getUI();

    const x = this.input.drawX;
    const y = this.input.drawY;

    const outer = 18 * ui.s;
    const inner = 4 * ui.s;

    ctx.save();

    ctx.beginPath();
    ctx.arc(
        x,
        y,
        outer,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.fill();

    ctx.lineWidth = 3 * ui.s;
    ctx.strokeStyle = "#2196F3";
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        inner,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#1565C0";
    ctx.fill();

    ctx.restore();

}
        // =====================================
    // CURSOR
    // =====================================

    drawCursor() {

    const ctx = this.ctx;
    const ui = this.getUI();

    const x = this.input.drawX;
    const y = this.input.drawY;

    const outer = 18 * ui.s;
    const inner = 4 * ui.s;

    ctx.save();

    ctx.beginPath();
    ctx.arc(
        x,
        y,
        outer,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "rgba(255,255,255,.35)";
    ctx.fill();

    ctx.lineWidth = 3 * ui.s;
    ctx.strokeStyle = "#2196F3";
    ctx.stroke();

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        inner,
        0,
        Math.PI * 2
    );

    ctx.fillStyle = "#1565C0";
    ctx.fill();

    ctx.restore();

}

    // =====================================
    // GAME OVER
    // =====================================

    drawGameOver() {

    const ctx = this.ctx;
    const elapsed = performance.now() - this.gameOverStart;
    this.gameOverAnim = Math.min(
    1,
    elapsed / 500
);

    const total = this.stats.hit + this.stats.miss;

    const accuracy =
        total === 0
            ? 0
            : Math.round(this.stats.hit * 100 / total);

    const timeUsed = GAME_TIME - this.time;

    const avgCombo =
        this.stats.hit === 0
            ? 0
            : (this.score.value / this.stats.hit / 10).toFixed(1);

    // Background
    ctx.fillStyle = "rgba(0,0,0,.65)";
    ctx.fillRect(0,0,this.ui.width,this.ui.height);

    // Card
    const ui = this.getUI();

const w = Math.min(
    560 * ui.s,
    this.ui.width * 0.9
);

const h = Math.min(
    840 * ui.s,
    this.ui.height * 0.95
);

const x = (this.ui.width - w) / 2;

const targetY = Math.max(
    ui.margin,
    (this.ui.height - h) / 2
);

const startY = this.ui.height + h;

const y =
    startY -
    (startY - targetY) *
    this.gameOverAnim;
    const centerX = x + w / 2;

ctx.fillStyle = "#FFF";
ctx.strokeStyle = "#DDD";
ctx.lineWidth = 4 * ui.s;

ctx.beginPath();
ctx.roundRect(
    x,
    y,
    w,
    h,
    ui.radius
);

ctx.fill();
ctx.stroke();

    // Title
    ctx.textAlign = "center";
    ctx.fillStyle = "#333";
    

    const scoreDuration = 1200;

const scoreProgress = Math.min(
    1,
    Math.max(
        0,
        (elapsed - 200) / scoreDuration
    )
);

const ease =
    1 - Math.pow(1 - scoreProgress, 3);

const displayScore =
    Math.floor(this.score.value * ease);

const stars = this.getStars();

let show = 0;

if (elapsed > 400) show = 1;
if (elapsed > 700) show = 2;
if (elapsed > 1000) show = 3;
if (elapsed > 1300) show = 4;
if (elapsed > 1600) show = 5;

// ===============================
// HEADER
// ===============================

let cursorY = y + 70 * ui.s;

cursorY = this.drawGameHeader(
    ctx,
    centerX,
    cursorY,
    displayScore,
    stars,
    show
);

// ===============================
// STATS
// ===============================

cursorY = this.drawGameStats(
    ctx,
    x,
    w,
    cursorY,
    elapsed,
    accuracy,
    total,
    timeUsed,
    avgCombo
);

if (elapsed > 3000) {

    // คำนวณตำแหน่งปุ่ม
    const buttonY = Math.min(
        cursorY + 20 * ui.s,
        y + h - ui.button.height - 30 * ui.s
    );

    this.drawRestartButton(
        ctx,
        centerX,
        buttonY
    );
}

if (
    elapsed > 3000 &&
    this.input.consumeClick()
) {
    this.restartGame();
}
    }

    drawStartScreen() {

    const ctx = this.ctx;
    const ui = this.getUI();

    const w = Math.min(
        650 * ui.s,
        this.ui.width * 0.9
    );

    const h = Math.min(
        520 * ui.s,
        this.ui.height * 0.85
    );

    const x = (this.ui.width - w) / 2;
    const y = (this.ui.height - h) / 2;

    const centerX = x + w / 2;

    ctx.beginPath();
    ctx.roundRect(
        x,
        y,
        w,
        h,
        ui.radius
    );

    ctx.fillStyle = "#FFF";
    ctx.fill();

    ctx.strokeStyle = "#DDD";
    ctx.lineWidth = 4 * ui.s;
    ctx.stroke();

    ctx.textAlign = "center";

    ctx.fillStyle = "#333";
    ctx.font = `bold ${56 * ui.s}px Arial`;

    ctx.fillText(
        "🎈 Balloon Game",
        centerX,
        y + 90 * ui.s
    );

    ctx.font = `${28 * ui.s}px Arial`;

    ctx.fillStyle = "#666";

    ctx.fillText(
        "ฝึกคำภาษาพูดและภาษาเขียน",
        centerX,
        y + 145 * ui.s
    );

    const subtitleSize = Math.min(
    24 * ui.s,
    w * 0.055
);

ctx.font = `bold ${subtitleSize}px Arial`;

    ctx.fillText(
        "⏱ เวลา 90 วินาที",
        centerX,
        y + 220 * ui.s
    );

    ctx.fillText(
        "🎯 ตอบให้ถูกมากที่สุด",
        centerX,
        y + 260 * ui.s
    );

    this.drawStartButton(
        ctx,
        centerX,
        y + h - 90 * ui.s
    );

}

drawStartButton(ctx, centerX, y) {

    const ui = this.getUI();

    const w = ui.button.width;
    const h = ui.button.height;

    const x = centerX - w / 2;

    ctx.beginPath();
    ctx.roundRect(
        x,
        y,
        w,
        h,
        h / 2
    );

    ctx.fillStyle = "#2196F3";
    ctx.fill();

    ctx.fillStyle = "#FFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `bold ${ui.font.button}px Arial`;

    ctx.fillText(
        "▶ เริ่มเกม",
        centerX,
        y + h / 2
    );

    if (this.input.consumeClick()) {

        this.gameStarted = true;

    }

}

drawGameHeader(ctx, centerX, y, displayScore, stars, show) {

    const ui = this.getUI();

    

    
    ctx.font = `bold ${ui.font.h2}px Arial`;
    ctx.fillText("🎉 จบเกม", centerX, y);

    y += ui.gapLarge;

    ctx.fillStyle = "#FF9800";
    ctx.font = `bold ${ui.font.h1}px Arial`;
    ctx.fillText(displayScore, centerX, y);

    y += ui.gap;

    ctx.fillStyle = "#777";
    ctx.font = `${30 * ui.s}px Arial`;
    ctx.fillText("คะแนนรวม", centerX, y);

    y += ui.gap;

    ctx.fillStyle = "#FFD700";
    ctx.font = `${40 * ui.s}px Arial`;
    ctx.fillText(
        stars.substring(0, show),
        centerX,
        y
    );

    return y + 20 * ui.s;

}
    

drawGameStats(ctx, x, w, startY, elapsed, accuracy, total, timeUsed, avgCombo) {

    const ui = this.getUI();

    let yy = startY;

    const left = x + ui.marginLarge;
    const right = x + w - ui.marginLarge;

    ctx.font = `${ui.font.body}px Arial`;

    const row = (label, value) => {

        ctx.textAlign = "left";
        ctx.fillStyle = "#666";
        ctx.fillText(label, left, yy);

        ctx.textAlign = "right";
        ctx.fillStyle = "#111";
        ctx.fillText(value, right, yy);

        yy += ui.gap;

    };

    if (elapsed > 500)
        row("🎯 ความแม่นยำ", accuracy + "%");

    if (elapsed > 800)
        row("🔥 คอมโบสูงสุด", "x" + this.stats.maxCombo);

    if (elapsed > 1100)
        row("🎈 ตอบถูก", this.stats.hit);

    if (elapsed > 1400)
        row("❌ ตอบผิด", this.stats.miss);

    if (elapsed > 1700)
        row("📊 จำนวนข้อ", total);

    if (elapsed > 2000)
        row("⏱ เวลา", timeUsed + " s");

    if (elapsed > 2300)
        row("⚡ คอมโบเฉลี่ย", "x" + avgCombo);

    return yy;

}

drawRestartButton(ctx, centerX, y) {

    const ui = this.getUI();

    const bw = Math.min(
        320 * ui.s,
        this.ui.width * 0.6
    );

    const bh = ui.button.height;

    const bx = centerX - bw / 2;

    ctx.fillStyle = "#2196F3";

    ctx.beginPath();
    ctx.roundRect(
        bx,
        y,
        bw,
        bh,
        15 * ui.s
    );

    ctx.fill();

    ctx.fillStyle = "#FFF";
    ctx.font = `bold ${ui.font.button}px Arial`;
    ctx.textAlign = "center";

    ctx.fillText(
        "▶ เล่นอีกครั้ง",
        centerX,
        y + bh * 0.66
    );

}

getStars() {

    const total =
        this.stats.hit + this.stats.miss;

    if (total === 0)
        return "☆☆☆☆☆";

    const accuracy =
        this.stats.hit * 100 / total;

    if (accuracy >= 98)
        return "★★★★★";

    if (accuracy >= 90)
        return "★★★★☆";

    if (accuracy >= 80)
        return "★★★☆☆";

    if (accuracy >= 70)
        return "★★☆☆☆";

    return "★☆☆☆☆";
}



    // =====================================
    // RESTART
    // =====================================

    restartGame() {

    this.time = GAME_TIME;

    this.gameOver = false;
    this.gameOverStart = 0;
    this.gameOverAnim = 0;

    this.logic = new GameLogic();

    this.score.value = 0;

    this.combo = 0;
    this.comboTimer = 0;

    this.lastHitTime = 0;

    this.stats = {
        balloons: 0,
        hit: 0,
        miss: 0,
        maxCombo: 0
    };

    this.floatingTexts.length = 0;

    this.balloonManager =
        new BalloonManager(
            this.ui,
            this.logic
        );

    this.balloonManager.reset();

    this.input.clicked = false;

}
    }




