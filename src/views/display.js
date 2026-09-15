import {
    formatClassName,
    capitalizeName,
    isValidPlacement,
    getShipOverCoordinates,
    addClassToCoordinates,
    removeClassFromCells,
} from "../helpers/displayHelpers.js";

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

const shipLengths = {
    carrier: 5,
    battleship: 4,
    destroyer: 3,
    submarine: 3,
    "patrol boat": 2,
};

const renderPlaceShipsScene = () => {
    const displayWrapper = document.querySelector(".display-wrapper");

    const placeShipsSceneWrapper = document.createElement("div");
    placeShipsSceneWrapper.classList.add("place-ships-scene-wrapper");

    const gameboardWrapper = renderGameboard("player");
    const shipsWrapper = renderDraggableShips();
    const buttonsWrapper = renderPlaceShipsButtons();

    placeShipsSceneWrapper.appendChild(gameboardWrapper);
    placeShipsSceneWrapper.appendChild(shipsWrapper);
    placeShipsSceneWrapper.appendChild(buttonsWrapper);

    displayWrapper.appendChild(placeShipsSceneWrapper);
};

const renderGameScene = () => {
    const displayWrapper = document.querySelector(".display-wrapper");

    const gameSceneWrapper = document.createElement("div");
    gameSceneWrapper.classList.add("game-scene-wrapper");

    const enemyShipsWrapper = renderShipsList("enemy");
    const enemyGameboardWrapper = renderGameboard("enemy");
    const playerGameboardWrapper = renderGameboard("player");
    const playerShipsWrapper = renderShipsList("player");

    gameSceneWrapper.appendChild(enemyShipsWrapper);
    gameSceneWrapper.appendChild(enemyGameboardWrapper);
    gameSceneWrapper.appendChild(playerGameboardWrapper);
    gameSceneWrapper.appendChild(playerShipsWrapper);

    displayWrapper.appendChild(gameSceneWrapper);
};

const renderDraggableShips = () => {
    const shipsWrapper = document.createElement("div");
    shipsWrapper.classList.add("ships-list-wrapper", "draggable-ships-wrapper");

    const shipsHeading = document.createElement("h2");
    shipsHeading.classList.add("ships-heading");
    shipsHeading.textContent = "Chart Your Fleet";

    const shipsContainer = document.createElement("div");
    shipsContainer.classList.add("ships-container");

    // Ship images and captions
    for (const ship in shipImages) {
        const shipWrapper = document.createElement("figure");
        shipWrapper.classList.add("ship-wrapper");

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");

        const shipImage = document.createElement("img");
        shipImage.classList.add("ship-image", `${formatClassName(ship)}-image`, "horizontal");
        shipImage.id = `draggable-${formatClassName(ship)}`;
        shipImage.src = shipImages[ship];
        shipImage.draggable = true;
        shipImage.dataset.length = shipLengths[ship];

        const divLine = document.createElement("div");
        divLine.classList.add("divider");

        const shipCaption = document.createElement("figcaption");
        shipCaption.textContent = capitalizeName(ship);

        imageWrapper.appendChild(shipImage);

        shipWrapper.appendChild(imageWrapper);
        shipWrapper.appendChild(divLine);
        shipWrapper.appendChild(shipCaption);

        shipsContainer.appendChild(shipWrapper);
    }

    shipsWrapper.appendChild(shipsHeading);
    shipsWrapper.appendChild(shipsContainer);

    return shipsWrapper;
};

const renderPlaceShipsButtons = () => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("place-ships-buttons-container");

    const resetBoard = document.createElement("button");
    resetBoard.classList.add("button-reset-board");
    resetBoard.textContent = "Reset Board";

    const confirmPlacements = document.createElement("button");
    confirmPlacements.classList.add("button-confirm-placements");
    confirmPlacements.textContent = "Confirm Placements";

    buttonsContainer.appendChild(resetBoard);
    buttonsContainer.appendChild(confirmPlacements);

    return buttonsContainer;
};

const renderShipsList = (playerType) => {
    const shipsWrapper = document.createElement("div");
    shipsWrapper.classList.add(
        "ships-list-wrapper",
        `${playerType}-ships-wrapper`,
    );

    const shipsHeading = document.createElement("h2");
    shipsHeading.classList.add("ships-heading", `${playerType}-ships-heading`);

    const shipsContainer = document.createElement("div");
    shipsContainer.classList.add(
        "ships-container",
        `${playerType}-ships-conatiner`,
    );

    // Display list of draggable ships

    shipsWrapper.appendChild(shipsHeading);
    shipsWrapper.appendChild(shipsContainer);

    return shipsWrapper;
};

const renderGameboard = (playerType) => {
    const gameboardWrapper = document.createElement("div");
    gameboardWrapper.classList.add(
        "gameboard-wrapper",
        `${playerType}-gameboard-wrapper`,
    );

    const gameboard = document.createElement("div");
    gameboard.classList.add("gameboard", `${playerType}-gameboard`);

    renderGameboardCells(gameboard);
    gameboardWrapper.appendChild(gameboard);

    return gameboardWrapper;
};

const renderGameboardCells = (gameboard) => {
    const columnChars = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    for (let row = 1; row <= 10; row++) {
        for (let column = 1; column <= 10; column++) {
            const cell = document.createElement("div");
            const columnChar = columnChars[column - 1];

            cell.classList.add("cell");
            cell.dataset.coordinate = `${columnChar}${row}`;

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
        const firstCoordinateCell = gameboard.querySelector(
            `[data-coordinate="${firstCoordinate}"]`,
        );

        const shipImage = document.createElement("img");
        shipImage.classList.add("ship-image", `${formatClassName(ship)}-image`);
        if (shipPositions[ship].orientation === "vertical") {
            shipImage.classList.add("vertical-image");
        }
        shipImage.src = shipImages[ship];

        firstCoordinateCell.appendChild(shipImage);
    }

    // Display hits
    for (const coordinate of hitCoordinates) {
        const coordinateCell = gameboard.querySelector(`[data-coordinate="${coordinate}"]`);
        coordinateCell.classList.add("hit-attack");
    }

    // Display misses
    for (const coordinate of missedAttacks) {
        const coordinateCell = gameboard.querySelector(`[data-coordinate="${coordinate}"]`);
        coordinateCell.classList.add("missed-attack");
    }
};

export {
    renderPlaceShipsScene,
    renderGameScene,
    renderPlayerGameboard,
    isValidPlacement,
    getShipOverCoordinates,
    addClassToCoordinates,
    removeClassFromCells,
};
