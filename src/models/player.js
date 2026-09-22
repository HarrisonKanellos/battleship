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
    const recentAttack = {
        isHit: null,
        coordinate: null,
    };

    const setRecentAttack = (isHit, coordinate) => {
        recentAttack.isHit = isHit;
        recentAttack.coordinate = coordinate;
    };

    const recentAttackIsHit = () => recentAttack.isHit;

    const recentAttackCoordinate = () => recentAttack.coordinate;

    return {
        gameboard,
        setRecentAttack,
        recentAttackIsHit,
        recentAttackCoordinate,
    };
}

export { createRealPlayer, createComputerPlayer };
