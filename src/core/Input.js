export default class Input {

    constructor(canvas) {

    this.x = 0;
    this.y = 0;

    this.drawX = 0;
    this.drawY = 0;

    this.clicked = false;

    const updatePosition = (clientX, clientY) => {

        const rect = canvas.getBoundingClientRect();

        this.x = clientX - rect.left;
        this.y = clientY - rect.top;

    };

    canvas.style.touchAction = "none";

    canvas.addEventListener("pointermove", (e) => {

        updatePosition(e.clientX, e.clientY);

    });

    canvas.addEventListener("pointerdown", (e) => {

        updatePosition(e.clientX, e.clientY);

        this.clicked = true;

    });

}

    update() {

        this.drawX += (this.x - this.drawX) * 0.25;
        this.drawY += (this.y - this.drawY) * 0.25;

    }

    consumeClick() {

        if (this.clicked) {

            this.clicked = false;
            return true;

        }

        return false;

    }

}