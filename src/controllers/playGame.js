import * as Display from "../views/display.js";
import * as Player from "../models/player.js";

import { testSetCoordinates, testHitCoordinates } from "./testPlayGame.js"; // TEMP

export const playGame = (players, onGameWinnerCallback) => {
    Display.renderGameScene();
};
