import { createGameboard } from "./gameboard.js";
import { defineActions } from "./computerActions.js";

function createPlayer() {
    const gameboard = createGameboard();
    gameboard.initShips();

    return {
        gameboard,
    };
}

function createRealPlayer(name) {
    const { gameboard } = createPlayer();

    return {
        name,
        gameboard,
    };
}

function createComputerPlayer() {
    const { gameboard } = createPlayer();
    const actions = defineActions();

    return {
        gameboard,
        actions,
    };
}

export { createRealPlayer, createComputerPlayer };
