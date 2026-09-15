import * as Display from "../views/display.js";
import * as Player from "../models/player.js";

import { testSetCoordinates, testHitCoordinates } from "./testPlayGame.js"; // TEMP

const players = {
    realPlayer: Player.createRealPlayer(),
    computerPlayer: Player.createComputerPlayer(),
};

export const playGame = () => {
    
    testSetCoordinates();
    testHitCoordinates();
    Display.renderGameScene();
    
    const playerGameboard = document.querySelector(".player-gameboard");
    Display.renderPlayerGameboard(
            playerGameboard,
            players.realPlayer.gameboard.getShipPositions(),
            players.realPlayer.gameboard.getHitCoordinates(),
            players.realPlayer.gameboard.getMisses(),
        );
};
