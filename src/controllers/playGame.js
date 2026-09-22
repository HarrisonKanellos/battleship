import * as Display from "../views/display.js";

import { testSetCoordinates, testHitCoordinates } from "./testPlayGame.js"; // TEMP

let realPlayer, computerPlayer;
let onGameWinner;

export const playGame = (playersReference, onGameWinnerCallback) => {
    ({ realPlayer, computerPlayer } = playersReference);
    onGameWinner = onGameWinnerCallback;

    renderScene();
};

const renderScene = () => {
    Display.renderGameScene();

    const playerGameboard = document.querySelector(".player-gameboard");
    const shipPositions = realPlayer.gameboard.getShipPositions();
    const hitCoordinates = realPlayer.gameboard.getHitCoordinates();
    const missedAttacks = realPlayer.gameboard.getMisses();

    Display.renderPlayerGameboardState(
        playerGameboard,
        shipPositions,
        hitCoordinates,
        missedAttacks,
    );
};
