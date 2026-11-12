import { placeShips } from "./placeShips.js";
import { playGame } from "./playGame.js";
import { gameOver } from "./gameOver.js";
import * as Player from "../models/player.js";

const players = {
    computerPlayer: null,
    realPlayer: null,
};

const initPlayers = () => {
    players.computerPlayer = Player.createComputerPlayer();
    players.realPlayer = Player.createRealPlayer();
};

export const startGame = () => {
    // TODO: Modal to get players name
    initPlayers();
    showPlaceShips();
};

const showPlaceShips = () => {
    placeShips(players, showPlayGame);
};

const showPlayGame = () => {
    playGame(players, handleGameOver);
};

const handleGameOver = (winner) => {
    gameOver(winner, playAgain);
};

const playAgain = () => {
    initPlayers();
    showPlaceShips();
};
