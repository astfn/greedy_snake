/* 这里为了让编译后的 ts 文件，能够正常引入 js ，所以这里填写 .js 后缀名 */

import GameController, { GameOptions } from "./GameController.js";
import { gameOptions, initialBtnOperations } from "./preset.js";

const game = new GameController(gameOptions);

initialBtnOperations(game);
