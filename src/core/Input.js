export default class Input {

    constructor(canvas) {

        this.x = 0;
        this.y = 0;

        // Cursor แบบ Smooth
        this.drawX = 0;
        this.drawY = 0;

        // คลิก 1 ครั้ง
        this.clicked = false;

        canvas.addEventListener("mousemove", (e) => {

            this.x = e.offsetX;
            this.y = e.offsetY;

        });

        canvas.addEventListener("mousedown", () => {

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