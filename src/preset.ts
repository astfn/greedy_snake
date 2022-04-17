import GameController, { GameOptions } from "./GameController.js";

/* 初始化 game 的各个选项 */

// elements
const gameBox: HTMLElement = document.querySelector("#game_box")!;
const snake_head: HTMLElement = document
  .querySelector("#snake")!
  .querySelector(".header")!;

//presetOption
const gameBoxSize = {
  width: parseInt(getComputedStyle(gameBox).width),
  height: parseInt(getComputedStyle(gameBox).height),
};

const gridItemSize = parseInt(getComputedStyle(snake_head).width);

/* realOptions */
const gameOptions: GameOptions = {
  autoStart: false,
  gridItemSize,
  foodArg: {
    element: document.getElementById("food")!,
    size: gridItemSize,
    gameBoxSize,
  },
  snakeArg: {
    head: snake_head,
    item_size: gridItemSize,
    gameBoxSize,
  },
};

/* 初始化按钮交互 */

function initialBtnOperations(game: GameController) {
  // reStart
  const start_btn = document.querySelector(".start_btn")!;
  start_btn.addEventListener("click", () => location.reload());

  // changeDirection
  const pause_btn = document.querySelector(".pause_btn")!;
  const top_btn = document.querySelector(".top_btn")!;
  const left_btn = document.querySelector(".left_btn")!;
  const down_btn = document.querySelector(".down_btn")!;
  const right_btn = document.querySelector(".right_btn")!;

  const eleMapDirection = new Map([
    [pause_btn, "Stop"],
    [top_btn, "UP"],
    [left_btn, "Left"],
    [down_btn, "Down"],
    [right_btn, "Right"],
  ]);

  const changeDirectionHandle = (
    eleMapDirection: Map<Element, string>,
    game: GameController
  ) => {
    const operation = (dir: string) => {
      game.snake.direction = dir;
      // 若不是自动开始，则按键后，让其开始
      if (!game.autoStart) {
        //再置为true，防止定时器的重复创建
        game.autoStart = true;
        game.initialTimer();
      }
    };
    for (const [ele, dir] of eleMapDirection.entries()) {
      ele.addEventListener("click", () => operation(dir));
      ele.addEventListener("touch", () => operation(dir));
    }
  };

  changeDirectionHandle(eleMapDirection, game);
}

export { gameOptions, initialBtnOperations };
