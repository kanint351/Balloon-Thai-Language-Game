import Renderer from "./Renderer.js";
import Input from "./Input.js";
import BalloonManager from "../objects/BalloonManager.js";
import HUD from "../ui/HUD.js";

export default class Game {

    constructor() {

        this.questionType = "spoken";
        this.currentQuestion = 1;
        this.totalQuestions = 20;

        this.hud = new HUD(this);

        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);

        this.renderer = new Renderer(this.canvas);

        this.input = new Input(this.canvas);

        this.balloonManager =
    new BalloonManager(
        this,
        this.canvas,
        this.input
    );

        this.score = 0;

    this.combo = 0;
    this.bestCombo = 0;
    this.maxCombo = 0;

    this.comboTimer = 0;

    this.time = 90;



        this.running = false;

        this.showStart = true;

        this.gameOver = false;

        this.questionType = "spoken";

        this.bestCombo = 0;

        this.lastTime = 0;

        this.deltaTime = 0;

        
        this.boundLoop = this.loop.bind(this);

        requestAnimationFrame(this.boundLoop);

    }

    start() {

        this.showStart = false;

        if (this.running) return;

        this.running = true;

        this.questionType =
    Math.random() < 0.5
        ? "spoken"
        : "written";



        this.renderer.resize();

        this.balloonManager.createQuestion();

        

    }

    loop(time) {

    if (!this.lastTime)
        this.lastTime = time;

    this.deltaTime =
        (time - this.lastTime) / 1000;

    this.lastTime = time;

    this.update();

    this.render();

    requestAnimationFrame(this.boundLoop);

}

    update() {

    

    this.comboTimer += this.deltaTime;

if (this.comboTimer >= 3) {

    this.combo = 0;

    this.comboTimer = 0;

}

if (this.showStart) {

    if (this.input.justPressed) {

        this.start();

    }

    return;

}    


if (this.gameOver) {

    if (this.input.justPressed) {

        this.restart();

    }
    
    return;

}
    

if (!this.running) {

    return;

}



    this.balloonManager.update(this.deltaTime);

    this.time -= this.deltaTime;

    if (this.time <= 0) {

    this.time = 0;

    this.running = false;

    this.gameOver = true;

    return;

}

}

    render() {

        this.renderer.begin();

this.balloonManager.draw(
    this.renderer.ctx
);

this.hud.draw(
    this.renderer.ctx
);

this.renderer.end();
this.input.endFrame();

    }

    addScore(point = 10) {

    this.score += point;

    if (point > 0) {

    this.combo++;

    this.comboTimer = 0;

    if (this.combo > this.bestCombo) {

        this.bestCombo = this.combo;

    }

} else {

    this.combo = 0;

}

}

    restart() {

    this.currentQuestion = 1;
    this.score = 0;
    this.combo = 0;
    this.bestCombo = 0;
    this.maxCombo = 0;
    this.bestCombo = 0;
    this.comboTimer = 0;

    this.time = 60;

    this.gameOver = false;
    this.running = true;

    this.questionType =
    Math.random() < 0.5
        ? "spoken"
        : "written";

    

    this.balloonManager.createQuestion();
     
    

    this.balloonManager.explosions = [];
    this.balloonManager.floatingTexts = [];

}

}