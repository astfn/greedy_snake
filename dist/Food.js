export default class Food {
    constructor(arg) {
        this.X = 0;
        this.Y = 0;
        this.size = arg.size;
        this.ele = arg.element;
        this.gameBoxSize = arg.gameBoxSize;
        this.changePosition();
    }
    randomX() {
        const base = Math.floor(Math.random() * (this.gameBoxSize.width + 1 - this.size));
        return Math.floor(base / 10) * 10;
    }
    randomY() {
        const base = Math.floor(Math.random() * (this.gameBoxSize.height + 1 - this.size));
        return Math.floor(base / 10) * 10;
    }
    setX(newX) {
        this.X = newX;
        this.ele.style.left = this.X + "px";
    }
    setY(newY) {
        this.Y = newY;
        this.ele.style.top = this.Y + "px";
    }
    changePosition() {
        this.setX(this.randomX());
        this.setY(this.randomY());
    }
}
