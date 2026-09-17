import { placeShips } from "./placeShips.js";
import { playGame } from "./playGame.js";
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
    initPlayers();
    // TODO: Modal to get players name
    showPlaceShips();
};

const showPlaceShips = () => {
    placeShips(players.realPlayer, showPlayGame);
};

const showPlayGame = () => {
    playGame(players, handleGameOver);
};

const handleGameOver = () => {
    // TODO: Game ends logic - prompt to play again
};