import { createGameboard } from "./gameboard.js";

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

    return {
        gameboard,
    };
}

export { createRealPlayer, createComputerPlayer };
