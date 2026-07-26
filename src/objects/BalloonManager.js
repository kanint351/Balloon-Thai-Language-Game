import Balloon from "./Balloon.js";
import { WORDS } from "../data/words.js";
import Particle from "./Particle.js";
import Explosion from "./Explosion.js";
import FloatingText from "./FloatingText.js";

export default class BalloonManager {

    constructor(game, canvas, input) {
        this.game = game;
        this.canvas = canvas;
        this.input = input;

        this.balloons = [];

        this.spawnTimer = 0;

        this.spawnInterval = 1.0;

        this.maxBalloons = 12;

        this.particles = [];

        this.explosions = [];

        this.floatingTexts = [];
    }

    update(dt) {

        for (const p of this.particles) {

    p.update(dt);

}

for (const e of this.explosions) {

    e.update(dt);

}
for (const text of this.floatingTexts) {

    text.update(dt);

}

this.floatingTexts =
    this.floatingTexts.filter(
        text => text.alive
    );

this.explosions = this.explosions.filter(
    e => e.alive
);

this.particles = this.particles.filter(
    p => p.alive
);

        

        for (const balloon of this.balloons) {

            balloon.update(dt);

        }

        if (this.input.down) {

    this.checkSwipe();

}

        this.balloons = this.balloons.filter(b => {

            return b.alive && !b.isOutOfScreen();

        

        });

        if (this.balloons.length === 0) {

    this.game.currentQuestion++;

    this.game.questionType =
        Math.random() < 0.5
            ? "spoken"
            : "written";

    this.createQuestion();

}

    }

    draw(ctx) {

    for (const p of this.particles) {

        p.draw(ctx);

    }

    for (const e of this.explosions) {

        e.draw(ctx);

    }

    for (const balloon of this.balloons) {

        balloon.draw(ctx);

    }

    for (const text of this.floatingTexts) {

    text.draw(ctx);

}

}

    spawn() {

    const area =
    this.game.renderer.getPlayArea();

const x =
    area.left +
    Math.random() *
    (area.right - area.left);

const y =
    area.bottom + 100;

    // สุ่มชุดคำ
    const word =
        WORDS[
            Math.floor(Math.random() * WORDS.length)
        ];

    // 50% ออกคำตอบที่ถูก
    const showCorrect = Math.random() < 0.5;

    let text;
    let type;

    if (showCorrect) {

        if (this.game.questionType === "spoken") {

            text = word.spoken;
            type = "spoken";

        } else {

            text = word.written;
            type = "written";

        }

    } else {

        if (this.game.questionType === "spoken") {

            text = word.written;
            type = "written";

        } else {

            text = word.spoken;
            type = "spoken";

        }

    }

    const balloon = new Balloon(
        x,
        y,
        text,
        type
    );

    this.balloons.push(balloon);

}

    createQuestion() {

    this.balloons = [];

    const area =
        this.game.renderer.getPlayArea();

    const spacing =
        (area.right - area.left) / 5;

    for (let i = 0; i < 4; i++) {

        const x =
            area.left +
            spacing * (i + 1);

        const y =
            area.bottom +
            Math.random() * 120;

        this.spawnAt(x, y);

    }

}

        spawnAt(x, y) {

    const word =
        WORDS[
            Math.floor(
                Math.random() *
                WORDS.length
            )
        ];

    const showCorrect =
        Math.random() < 0.5;

    let text;
    let type;

    if (showCorrect) {

        if (this.game.questionType === "spoken") {

            text = word.spoken;
            type = "spoken";

        } else {

            text = word.written;
            type = "written";

        }

    } else {

        if (this.game.questionType === "spoken") {

            text = word.written;
            type = "written";

        } else {

            text = word.spoken;
            type = "spoken";

        }

    }

    this.balloons.push(
        new Balloon(
            x,
            y,
            text,
            type
        )
    );

}

    checkSwipe() {

        const x1 = this.input.prevX;
        const y1 = this.input.prevY;

        const x2 = this.input.x;
        const y2 = this.input.y;

        for (const balloon of this.balloons) {

            if (!balloon.alive) continue;

            if (
                !balloon.popping &&
                this.lineHitsCircle(
                    x1,
                    y1,
                    x2,
                    y2,
                    balloon.x,
                    balloon.y,
                    balloon.radius
                )
            ) {

                balloon.pop();
                this.createExplosion(
    balloon.x,
    balloon.y
);

        this.explosions.push(

    new Explosion(

        balloon.x,

        balloon.y,

        balloon.color

    )




);
            
        
    

if (balloon.wordType === this.game.questionType) {

    this.game.addScore(10);

    setTimeout(() => {

        this.game.currentQuestion++;

        this.game.questionType =
            Math.random() < 0.5
                ? "spoken"
                : "written";

        this.createQuestion();

    }, 120);

    return;




    

} else {

    

    this.game.addScore(-5);

    

}



            }

        }

    }

    lineHitsCircle(
        x1,
        y1,
        x2,
        y2,
        cx,
        cy,
        r
    ) {

        const dx = x2 - x1;
        const dy = y2 - y1;

        const length2 =
            dx * dx + dy * dy;

        if (length2 === 0) {

            const dist2 =
                (cx - x1) ** 2 +
                (cy - y1) ** 2;

            return dist2 <= r * r;

        }

        let t =
            (
                (cx - x1) * dx +
                (cy - y1) * dy
            ) / length2;

        t = Math.max(
            0,
            Math.min(
                1,
                t
            )
        );

        const px =
            x1 + t * dx;

        const py =
            y1 + t * dy;

        const dist2 =
            (cx - px) ** 2 +
            (cy - py) ** 2;

        return dist2 <= r * r;

    }

    createExplosion(x, y) {

    for (let i = 0; i < 20; i++) {

        this.particles.push(
            new Particle(x, y)
        );

    }
}
}

    

    

