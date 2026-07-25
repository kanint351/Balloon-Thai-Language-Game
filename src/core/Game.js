import Renderer from "./Renderer.js";

export default class Game {

    constructor() {

        this.renderer = new Renderer();

        this.renderer.resize();

        window.addEventListener("resize", () => {
            this.renderer.resize();
        });

    }

    start() {

        this.renderer.start();

    }

}