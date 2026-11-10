import * as Display from "../views/display.js";

export const gameOver = (winner, players, playAgain) => {
    Display.renderGameOver(winner.name);
};
