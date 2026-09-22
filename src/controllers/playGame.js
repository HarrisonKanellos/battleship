import * as Display from "../views/display.js";

import { testSetCoordinates, testHitCoordinates } from "./testPlayGame.js"; // TEMP

let realPlayer, computerPlayer;
let onGameWinner;
let activePlayer = realPlayer;

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

const initPlayGameEvents = () => {
    const enemyGameboard = document.querySelector(".enemy-gameboard");

    enemyGameboard.addEventListener("click", handleClickAttack);
};

const handleClickAttack = (event) => {
    const target = event.target;

    const isCell = target.classList.contains(".cell");
    const isRealPlayersTurn = activePlayer === realPlayer;
    if (!isCell || !isRealPlayersTurn) {
        return;
    }

    const coordinate = target.dataset.coordinate;
    const isSuccessfulAttack = handlePlayerAttack(realPlayer, coordinate);
    if (!isSuccessfulAttack) {
        return;
    }

    // TODO: render enemy gameboard state
    // TODO: render enemy ships list state
};

const handlePlayerAttack = (player, coordinate) => {
    try {
        player.gameboard.receiveAttack(coordinate);
    } catch (error) {
        if (error instanceof RangeError) {
            console.error(error);
        }
        return false;
    }
    return true;
};
