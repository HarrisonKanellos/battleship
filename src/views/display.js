import { formatClassName } from "../helpers/displayHelpers.js";

import carrierImage from "../assets/images/carrier.svg";
import battleshipImage from "../assets/images/battleship.svg";
import destroyerImage from "../assets/images/destroyer.svg";
import submarineImage from "../assets/images/submarine.svg";
import patrolBoatImage from "../assets/images/patrol-boat.svg";

const shipImages = {
    carrier: carrierImage,
    battleship: battleshipImage,
    destroyer: destroyerImage,
    submarine: submarineImage,
    "patrol boat": patrolBoatImage,
};

const renderGameScene = () => {
    renderGameContainers();

    const enemyGameboard = document.querySelector(".enemy-gameboard");
    const playerGameboard = document.querySelector(".player-gameboard");
    renderGameboardCells(enemyGameboard);
    renderGameboardCells(playerGameboard);
};

const renderGameContainers = () => {
    const displayWrapper = document.createElement("div");
    const gameSceneWrapper = document.createElement("div");
    displayWrapper.classList.add("display-wrapper");
    gameSceneWrapper.classList.add("game-scene-wrapper");

    const enemyShipsWrapper = document.createElement("div");
    const enemyShipsHeading = document.createElement("h2");
    const enemyShipsContainer = document.createElement("div");
    enemyShipsWrapper.classList.add("ships-wrapper", "enemy-ships-wrapper");
    enemyShipsHeading.classList.add("ships-heading", "enemy-ships-heading");
    enemyShipsContainer.classList.add(
        "ships-container",
        "enemy-ships-conatiner",
    );

    const enemyGameboardWrapper = document.createElement("div");
    const enemyGameboard = document.createElement("div");
    enemyGameboardWrapper.classList.add(
        "gameboard-wrapper",
        "enemy-gameboard-wrapper",
    );
    enemyGameboard.classList.add("gameboard", "enemy-gameboard");

    const playerGameboardWrapper = document.createElement("div");
    const playerGameboard = document.createElement("div");
    playerGameboardWrapper.classList.add(
        "gameboard-wrapper",
        "player-gameboard-wrapper",
    );
    playerGameboard.classList.add("gameboard", "player-gameboard");

    const playerShipsWrapper = document.createElement("div");
    const playerShipsHeading = document.createElement("h2");
    const playerShipsContainer = document.createElement("div");
    playerShipsWrapper.classList.add("ships-wrapper", "player-ships-wrapper");
    playerShipsHeading.classList.add("ships-heading", "player-ships-heading");
    playerShipsContainer.classList.add(
        "ships-container",
        "player-ships-conatiner",
    );

    enemyShipsWrapper.appendChild(enemyShipsHeading);
    enemyShipsWrapper.appendChild(enemyShipsContainer);

    enemyGameboardWrapper.appendChild(enemyGameboard);
    playerGameboardWrapper.appendChild(playerGameboard);

    playerShipsWrapper.appendChild(playerShipsHeading);
    playerShipsWrapper.appendChild(playerShipsContainer);

    gameSceneWrapper.appendChild(enemyShipsWrapper);
    gameSceneWrapper.appendChild(enemyGameboardWrapper);
    gameSceneWrapper.appendChild(playerGameboardWrapper);
    gameSceneWrapper.appendChild(playerShipsWrapper);

    displayWrapper.appendChild(gameSceneWrapper);

    const main = document.querySelector("main");
    main.appendChild(displayWrapper);
};

const renderGameboardCells = (gameboard) => {
    const COLUMN_CHARS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let row = 1; row <= 10; row++) {
        for (let column = 1; column <= 10; column++) {
            const cell = document.createElement("div");

            const columnChar = COLUMN_CHARS[column - 1];
            cell.classList.add(`cell-${columnChar}${row}`);

            gameboard.appendChild(cell);
        }
    }
};

const renderPlayerGameboard = (
    gameboard,
    shipPositions,
    hitCoordinates,
    missedAttacks,
) => {
    // Display ships
    for (const ship in shipPositions) {
        const firstCoordinate = shipPositions[ship].coordinates[0];
        const firstCoordinateCell = gameboard.querySelector(`.cell-${firstCoordinate}`);

        const shipImage = document.createElement("img");
        shipImage.src = shipImages[ship];

        const formattedShipName = formatClassName(ship);
        shipImage.classList.add("ship-image", `${formattedShipName}-image`);
        if (shipPositions[ship].orientation === "vertical") {
            shipImage.classList.add("vertical-image");
        }

        firstCoordinateCell.appendChild(shipImage);
    }

    // Display hits
    for (const coordinate of hitCoordinates) {
        const coordinateCell = gameboard.querySelector(`.cell-${coordinate}`);
        coordinateCell.classList.add("hit-attack");
    }

    // Display misses
    for (const coordinate of missedAttacks) {
        const coordinateCell = gameboard.querySelector(`.cell-${coordinate}`);
        coordinateCell.classList.add("missed-attack");
    }
};

export { renderGameScene, renderPlayerGameboard };
