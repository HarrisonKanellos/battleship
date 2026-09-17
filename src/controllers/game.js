import { placeShips } from "./placeShips.js";
import { playGame } from "./playGame.js";
import * as Player from "../models/player.js";

const players = {
    computerPlayer: Player.createComputerPlayer(),
    realPlayer: Player.createRealPlayer(),
};

export const startGame = () => {
    showPlaceShips();
};

const showPlaceShips = () => {
    placeShips(players.realPlayer, showPlayGame);
};

const showPlayGame = () => {
    playGame(players, handleGameOver);
}

const handleGameOver = () => {

};