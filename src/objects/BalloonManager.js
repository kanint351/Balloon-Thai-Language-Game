import Balloon from "./Balloon.js";
import Particle from "./Particle.js";

const BASE_margin = 80;
const BASE_DISTANCE = 110;

export default class BalloonManager {

    constructor(canvas, logic) {

        this.canvas = canvas;
        this.logic = logic;
        this.uiScale = 1;
        this.balloons = [];
        this.particles = [];

    }

    updateScale() {

    this.uiScale = Math.max(
        0.75,
        Math.min(
        this.canvas.clientWidth / 1280,
        this.canvas.clientHeight / 720
        )
    );

}

    // =====================================
    // RESET
    // =====================================

    reset() {

        this.balloons = [];

        this.spawnInitial();

    }

    // =====================================
    // INITIAL
    // =====================================

    spawnInitial() {

        this.spawnBalloon(
            this.logic.current
        );

        this.logic
            .getWrongAnswers(7)
            .forEach(word => {

                this.spawnBalloon(word);

            });

    }

    // =====================================
    // POSITION
    // =====================================

    randomPosition() {

    this.updateScale();

    const margin =
        BASE_margin * this.uiScale;

    const minDistance =
        BASE_DISTANCE * this.uiScale;

    let x;
    let y;

    let attempts = 0;

        while (true) {

            x =
                margin +
                Math.random() *
                (this.canvas.clientWidth - margin * 2);

            y =
                this.canvas.clientHeight +
                80 * this.uiScale +
                Math.random() * 
                (300 * this.uiScale);

            let overlap = false;

            for (const balloon of this.balloons) {

                if (

                    Math.hypot(

                        balloon.x - x,

                        balloon.y - y

                    ) < minDistance

                ) {

                    overlap = true;
                    break;

                }

            }

            if (!overlap || attempts > 100) {

                return { x, y };

            }

            attempts++;

        }

    }

    // =====================================
    // CREATE BALLOON
    // =====================================

    spawnBalloon(word) {

    const pos = this.randomPosition();

    const balloon = new Balloon(

            pos.x,

            pos.y,

            word.written

    

    );
    balloon.setScale(this.uiScale);
    this.balloons.push(balloon);

}
        // =====================================
    // WRONG BALLOON
    // =====================================

    spawnWrongBalloon() {

    const hasCorrect = this.balloons.some(
        b => b.word === this.logic.current.written
    );

    // ถ้าไม่มีคำตอบ ให้สร้างคำตอบก่อน
    if (!hasCorrect) {

    console.log("ไม่มีคำตอบ สร้างใหม่:", this.logic.current.written);

    this.spawnBalloon(this.logic.current);

    return;

}

    // มีคำตอบแล้ว ค่อยสร้างคำหลอก
    const used = this.balloons.map(b => b.word);

    const pool = this.logic
        .getWrongAnswers()
        .filter(
            word => !used.includes(word.written)
        );

    if (pool.length === 0) return;

    const random =
        pool[Math.floor(Math.random() * pool.length)];

    this.spawnBalloon(random);
}

    // =====================================
    // UPDATE
    // =====================================

    update() {
        this.updateScale();

        for (

            let i = this.balloons.length - 1;

            i >= 0;

            i--

        ) {

            const balloon = this.balloons[i];

            balloon.setScale(this.uiScale);
            balloon.update();

            // ลอยพ้นจอ

            if (

                balloon.y <

                -(balloon.radius * this.uiScale)

            ) {

                this.balloons.splice(i,1);

                this.spawnWrongBalloon();

            }

        }

        // Particle

        for (

            let i = this.particles.length - 1;

            i >= 0;

            i--

        ) {

            const p =

                this.particles[i];

            p.update();

            if (p.life <= 0) {

                this.particles.splice(i,1);

            }

        }

    }

    // =====================================
    // DRAW
    // =====================================

    draw(ctx) {

        for (

            const balloon of

            this.balloons

        ) {

            balloon.draw(ctx);

        }

        for (

            const p of

            this.particles

        ) {

            p.draw(ctx);

        }

    }

    // =====================================
    // HIT
    // =====================================

    hit(x,y) {

        for (

            let i =

            this.balloons.length-1;

            i>=0;

            i--

        ) {

            const balloon =

                this.balloons[i];

            if (

                balloon.hit(x,y)

            ) {

                return {

                    balloon,

                    index:i

                };

            }

        }

        return null;

    }
        // =====================================
    // REMOVE
    // =====================================

    remove(index) {

        if (
            index >= 0 &&
            index < this.balloons.length
        ) {

            this.balloons.splice(index, 1);

        }

    }

    // =====================================
    // EXPLODE
    // =====================================

    explode(balloon) {

        for (let i = 0; i < 20; i++) {

            this.particles.push(

                new Particle(

                    balloon.x,

                    balloon.y,

                    balloon.color

                )

            );

        }

    }

}
