import * as Display from "../views/display.js";

let playAgain;

export const gameOver = (winner, playAgainCallback) => {
    playAgain = playAgainCallback;

    Display.renderGameOver(winner.name);

    const playAgainButton = document.querySelector("#button-play-again");
    playAgainButton.addEventListener("click", handlePlayAgain);
};

const handlePlayAgain = () => {
    const body = document.querySelector("body");
    const gameOverModal = document.querySelector(".game-over-modal");

    // Close and remove game over modal
    gameOverModal.close();
    body.removeChild(gameOverModal);

    playAgain();
};
