export default class Input {
    constructor(canvas) {
        this.canvas = canvas;

        this.x = 0;
        this.y = 0;

        this.drawX = 0;
        this.drawY = 0;

        this.clicked = false;
        this.isPointerDown = false;

        // ป้องกันการเลื่อน/ซูมขณะลากบนมือถือ
        canvas.style.touchAction = "none";

        const updatePosition = (clientX, clientY) => {
            const rect = canvas.getBoundingClientRect();

            // แปลงพิกัดจาก CSS เป็นพิกัดจริงของ Canvas
            this.x = clientX - rect.left;
            this.y = clientY - rect.top;
        };

        canvas.addEventListener("pointerdown", (e) => {
            this.isPointerDown = true;
            this.clicked = true;

            updatePosition(e.clientX, e.clientY);

            canvas.setPointerCapture(e.pointerId);
        });

        canvas.addEventListener("pointermove", (e) => {
            updatePosition(e.clientX, e.clientY);
        });

        canvas.addEventListener("pointerup", (e) => {
            this.isPointerDown = false;

            if (canvas.hasPointerCapture(e.pointerId)) {
                canvas.releasePointerCapture(e.pointerId);
            }
        });

        canvas.addEventListener("pointercancel", () => {
            this.isPointerDown = false;
        });

        canvas.addEventListener("pointerleave", () => {
            this.isPointerDown = false;
        });
    }

    update() {
        this.drawX += (this.x - this.drawX) * 0.35;
        this.drawY += (this.y - this.drawY) * 0.35;
    }

    consumeClick() {
        if (this.clicked) {
            this.clicked = false;
            return true;
        }

        return false;
    }
}