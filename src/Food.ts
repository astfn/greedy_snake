export interface FoodArgs {
  element: HTMLElement;
  size: number;
  gameBoxSize: {
    width: number;
    height: number;
  };
}

export default class Food {
  X: number;
  Y: number;
  size: number;
  ele: HTMLElement;
  gameBoxSize: FoodArgs["gameBoxSize"];

  constructor(arg: FoodArgs) {
    this.X = 0;
    this.Y = 0;
    this.size = arg.size;
    this.ele = arg.element;
    this.gameBoxSize = arg.gameBoxSize;

    this.changePosition();
  }
  randomX() {
    const base = Math.floor(
      Math.random() * (this.gameBoxSize.width + 1 - this.size)
    );
    return Math.floor(base / 10) * 10;
  }
  randomY() {
    const base = Math.floor(
      Math.random() * (this.gameBoxSize.height + 1 - this.size)
    );
    return Math.floor(base / 10) * 10;
  }

  setX(newX: number) {
    this.X = newX;
    this.ele.style.left = this.X + "px";
  }
  setY(newY: number) {
    this.Y = newY;
    this.ele.style.top = this.Y + "px";
  }
  changePosition() {
    this.setX(this.randomX());
    this.setY(this.randomY());
  }
}
