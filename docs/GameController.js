import Food from "./Food.js";
import Snake from "./Snake.js";
export default class GameController {
    constructor(gameOptions) {
        this.snake = new Snake(gameOptions.snakeArg);
        this.food = new Food(gameOptions.foodArg);
        this.timer = undefined;
        this.autoStart = gameOptions.autoStart;
        this.gridItemSize = gameOptions.gridItemSize;
        this.level = 1;
        this.level_ele = document.querySelector(".level");
        this.score = 0;
        this.score_ele = document.querySelector(".score");
        this.speed = 200 - (this.level - 1) * 16;
        this.initial();
    }
    initial() {
        this.addListener();
        this.autoStart && this.initialTimer();
    }
    addListener() {
        document.documentElement.addEventListener("keydown", (event) => {
            this.snake.direction = event.key;
            // 若不是自动开始，则按键后，让其开始
            if (!this.autoStart) {
                //再置为true，防止定时器的重复创建
                this.autoStart = true;
                this.initialTimer();
            }
        });
    }
    initialTimer() {
        setTimeout(() => {
            console.log(this.speed);
            try {
                this.run();
                this.initialTimer();
            }
            catch (err) {
                clearInterval(this.timer);
                alert(err.message);
            }
        }, this.speed);
    }
    run() {
        let X = this.snake.head_X;
        let Y = this.snake.head_Y;
        switch (this.snake.direction) {
            case "ArrowUp":
            case "UP": {
                Y -= this.gridItemSize;
                break;
            }
            case "ArrowDown":
            case "Down": {
                Y += this.gridItemSize;
                break;
            }
            case "ArrowLeft":
            case "Left": {
                X -= this.gridItemSize;
                break;
            }
            case "ArrowRight":
            case "Right": {
                X += this.gridItemSize;
                break;
            }
            default: {
                // console.log("按了其他键");
            }
        }
        // 更新snake位置
        this.snake.setX(X);
        this.snake.setY(Y);
        // 检测是否吃到食物
        let checkEat = this.checkEat();
        if (checkEat) {
            this.updateScore();
            this.updateLevel();
            this.food.changePosition();
            this.snake.addBodyItem();
        }
    }
    checkEat() {
        return (this.snake.head_X === this.food.X && this.snake.head_Y === this.food.Y);
    }
    updateScore() {
        this.score_ele.innerText = ++this.score + "";
    }
    updateLevel() {
        if (this.score % 10 === 0) {
            // 更新level
            this.level = this.level >= 10 ? 10 : this.level + 1;
            this.level_ele.innerText = this.level + "";
            // 更新速度
            this.speed = 200 - (this.level - 1) * 16;
        }
    }
}
