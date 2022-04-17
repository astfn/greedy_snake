export interface SnakeArgs {
  head: HTMLElement;
  item_size: number;
  gameBoxSize: {
    width: number;
    height: number;
  };
}

// type Direction =
//   | "ArrowUp"
//   | "UP"
//   | "ArrowDown"
//   | "Down"
//   | "ArrowLeft"
//   | "Left"
//   | "ArrowRight"
//   | "Right";

export default class Snake {
  head: HTMLElement;
  head_X: number;
  head_Y: number;
  snake: HTMLElement;
  snake_allItem: HTMLCollectionOf<HTMLDivElement>;

  item_size: number;
  direction: string;
  gameBoxSize: SnakeArgs["gameBoxSize"];

  constructor(arg: SnakeArgs) {
    this.head = arg.head;
    this.head_X = 0;
    this.head_Y = 0;
    this.snake = this.head.parentElement!;
    this.snake_allItem = this.snake.getElementsByTagName("div");

    this.item_size = arg.item_size;
    this.gameBoxSize = arg.gameBoxSize;
    this.direction = "Right";
  }
  setHeadX(X: number) {
    // 避免无用更新
    if (X !== this.head_X) {
      this.moveBody();
      this.head_X = X;
      this.head.style.left = this.head_X + "px";
      this.isSelfMutilation();
    }
  }
  setHeadY(Y: number) {
    // 避免无用更新
    if (Y !== this.head_Y) {
      this.moveBody();
      this.head_Y = Y;
      this.head.style.top = this.head_Y + "px";
      this.isSelfMutilation();
    }
  }

  setX(X: number) {
    //判断是否越界
    let max = this.gameBoxSize.width - this.item_size;
    if (X > max || X < 0) {
      throw new Error("X越界");
    }

    // 判断是否横向掉头
    let secondItem = this.snake_allItem[1];
    if (secondItem) {
      if (X === parseInt(secondItem.style.left)) {
        if (X > this.head_X) {
          //右侧掉头:继续向左移动，更新正确的direction
          X = this.head_X - this.item_size;
          this.direction = "Left";
        } else if (X < this.head_X) {
          //左侧掉头"继续向右移动，更新正确的direction
          X = this.head_X + this.item_size;
          this.direction = "Right";
        }
      }
    }

    this.setHeadX(X);
  }
  setY(Y: number) {
    //判断是否越界
    let max = this.gameBoxSize.height - this.item_size;
    if (Y > max || Y < 0) {
      throw new Error("Y越界");
    }

    // 判断是否纵向掉头
    let secondItem = this.snake_allItem[1];
    if (secondItem) {
      if (Y === parseInt(secondItem.style.top)) {
        if (Y > this.head_Y) {
          //下侧掉头:继续向上移动，更新正确的direction
          Y = this.head_Y - this.item_size;
          this.direction = "UP";
        } else if (Y < this.head_Y) {
          //上侧掉头"继续向下移动，更新正确的direction
          Y = this.head_Y + this.item_size;
          this.direction = "Down";
        }
      }
    }

    this.setHeadY(Y);
  }

  /* 添加新的身体元素 */
  addBodyItem() {
    let snake_body = document.createElement("div");
    snake_body.classList.add("snake_body");
    //样式同步到最后
    let last_body_item = this.snake_allItem[this.snake_allItem.length - 1];
    snake_body.style.top = last_body_item.style.top;
    snake_body.style.left = last_body_item.style.left;
    //追加
    this.snake.appendChild(snake_body);
  }

  /* 让身体跟随head移动 */
  moveBody() {
    const length = this.snake_allItem.length;
    for (let i = length - 1; i > 0; i--) {
      let current = this.snake_allItem[i];
      let prev = this.snake_allItem[i - 1];

      current.style.top = prev.style.top;
      current.style.left = prev.style.left;
    }
  }

  /* 身体碰撞侦测 */
  isSelfMutilation() {
    const length = this.snake_allItem.length;
    for (let i = 1; i < length; i++) {
      let current = this.snake_allItem[i];
      if (
        parseInt(current.style.top) == this.head_Y &&
        parseInt(current.style.left) == this.head_X
      ) {
        throw new Error("你吃到了自己!");
      }
    }
  }
}
