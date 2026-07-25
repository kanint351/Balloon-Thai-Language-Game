import { WORDS } from "../data/words.js";

export default class GameLogic {

    constructor() {

        this.words = [...WORDS];

        this.shuffle();

        this.index = 0;

        this.current = this.words[this.index];

    }

    shuffle() {

        this.words.sort(() => Math.random() - 0.5);

    }

    next() {

        this.index++;

        if (this.index >= this.words.length) {

            this.shuffle();

            this.index = 0;

        }

        this.current = this.words[this.index];

    }

    getWrongAnswers(count = 7) {

        const wrong = this.words.filter(

            word => word.spoken !== this.current.spoken

        );

        wrong.sort(() => Math.random() - 0.5);

        return wrong.slice(0, count);

    }

}