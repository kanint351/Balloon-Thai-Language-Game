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

        // Mouse
        canvas.addEventListener("mousemove", (e) => {

            updatePosition(e.clientX, e.clientY);

        });

        canvas.addEventListener("mousedown", (e) => {

            updatePosition(e.clientX, e.clientY);
            this.clicked = true;

        });

        // Touch
        canvas.addEventListener("touchstart", (e) => {

            e.preventDefault();

            const t = e.touches[0];

            updatePosition(t.clientX, t.clientY);

            this.clicked = true;

        }, { passive: false });

        canvas.addEventListener("touchmove", (e) => {

            e.preventDefault();

            const t = e.touches[0];

            updatePosition(t.clientX, t.clientY);

        }, { passive: false });

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