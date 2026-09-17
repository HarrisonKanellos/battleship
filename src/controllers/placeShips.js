import * as Display from "../views/display.js";

let player;
let onShipsPlaced;
let draggedShipImage = null;

const droppedShipCoordinates = {
    carrier: null,
    battleship: null,
    destroyer: null,
    submarine: null,
    "patrol boat": null,
};

export const placeShips = (playerReference, onShipsPlacedCallback) => {
    player = playerReference;
    onShipsPlaced = onShipsPlacedCallback;

    Display.renderPlaceShipsScene();
    initPlaceShipsEvents();
};

const initPlaceShipsEvents = () => {
    const placeShipsSceneWrapper = document.querySelector(
        ".place-ships-scene-wrapper",
    );
    const gameboard = document.querySelector(".gameboard");
    const buttonContainer = document.querySelector(
        ".place-ships-buttons-container",
    );

    placeShipsSceneWrapper.addEventListener("dragstart", handleDragStartShip);
    placeShipsSceneWrapper.addEventListener("drag", handleDraggingShip);
    gameboard.addEventListener("dragover", handleDragOverShip);
    gameboard.addEventListener("dragenter", handleDragEnterShip);
    gameboard.addEventListener("drop", handleDropShip);
    placeShipsSceneWrapper.addEventListener("dragend", handleDragEndShip);

    gameboard.addEventListener("click", handleToggleShipOrientation);

    buttonContainer.addEventListener("click", handleButtonClick);
};

/* Assigns reference to ship being dragged 
   Sets drag image and drag effect */
const handleDragStartShip = (event) => {
    const target = event.target;
    if (target.classList.contains("ship-image")) {
        /* Create a custom drag image for vertical ships
           Image offset points to center of first cell occupied by ship */
        if (target.classList.contains("vertical")) {
            const verticalDragImageWrapper = document.createElement("div");
            const verticalDragImage = target.cloneNode();
            const placeShipsSceneWrapper = document.querySelector(
                ".place-ships-scene-wrapper",
            );

            verticalDragImageWrapper.classList.add(
                "vertical-drag-image-wrapper",
            );

            verticalDragImageWrapper.appendChild(verticalDragImage);
            placeShipsSceneWrapper.appendChild(verticalDragImageWrapper);

            event.dataTransfer.setDragImage(verticalDragImageWrapper, 42, 42);
        } else {
            event.dataTransfer.setDragImage(target, 42, 42);
        }
        event.dataTransfer.effectAllowed = "move";
        draggedShipImage = target;

        /* If ship was previously dropped on gameboard
           remove it's cells dropped classes */
        const shipName = target.dataset.shipName;
        if (droppedShipCoordinates[shipName]) {
            const gameboard = document.querySelector(".gameboard");

            // Remove previous dropped coordinates while dragging
            Display.removeClassFromCoordinates(
                gameboard,
                droppedShipCoordinates[shipName],
                "dropped",
            );
        }
    }
};

// Hide source image while dragging
const handleDraggingShip = (event) => {
    const target = event.target;
    if (target.classList.contains("ship-image")) {
        target.classList.add("dragging");
    }
};

// Sets valid drop targets
const handleDragOverShip = (event) => {
    const target = event.target;
    const isCell = target.classList.contains("cell");

    if (!isCell || !draggedShipImage) {
        return;
    }

    const cellCoordinate = target.dataset.coordinate;
    const shipLength = draggedShipImage.dataset.length;
    const orientation = draggedShipImage.classList.contains("horizontal")
        ? "horizontal"
        : "vertical";
    const shipName = draggedShipImage.dataset.shipName;

    // If valid drop placement, make target valid drop target
    if (
        Display.isValidPlacement(
            cellCoordinate,
            shipLength,
            orientation,
            shipName,
            droppedShipCoordinates,
        )
    ) {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }
};

/* Provides visual feedback on valid drop targets
   by add/remove dragover class */
const handleDragEnterShip = (event) => {
    const target = event.target;
    const isCell = target.classList.contains("cell");

    // Remove any dragover class on cells from previous dragenter
    const previousDragoverCells = document.querySelectorAll(".dragover");
    previousDragoverCells.forEach((cell) => cell.classList.remove("dragover"));

    if (!isCell || !draggedShipImage) {
        return;
    }

    const cellCoordinate = target.dataset.coordinate;
    const shipLength = draggedShipImage.dataset.length;
    const orientation = draggedShipImage.classList.contains("horizontal")
        ? "horizontal"
        : "vertical";
    const shipName = draggedShipImage.dataset.shipName;

    if (
        Display.isValidPlacement(
            cellCoordinate,
            shipLength,
            orientation,
            shipName,
            droppedShipCoordinates,
        )
    ) {
        const gameboard = document.querySelector(".gameboard");
        const hoverCoordinates = Display.getShipOverCoordinates(
            cellCoordinate,
            shipLength,
            orientation,
        );

        Display.addClassToCoordinates(gameboard, hoverCoordinates, "dragover");
    }
};

const handleDropShip = (event) => {
    event.preventDefault();
    const target = event.target;

    const gameboard = document.querySelector(".gameboard");
    const cellCoordinate = target.dataset.coordinate;
    const shipLength = draggedShipImage.dataset.length;
    const orientation = draggedShipImage.classList.contains("horizontal")
        ? "horizontal"
        : "vertical";
    const dropCoordinates = Display.getShipOverCoordinates(
        cellCoordinate,
        shipLength,
        orientation,
    );

    // Add dropped classes
    Display.addClassToCoordinates(gameboard, dropCoordinates, "dropped");

    // Append ship image to cell
    target.appendChild(draggedShipImage);

    // Set ships current dropped coordinates
    const shipName = draggedShipImage.dataset.shipName;
    droppedShipCoordinates[shipName] = dropCoordinates;
};

const handleDragEndShip = (event) => {
    const target = event.target;

    // Add dropped classes back to original coordinates if drop failed
    const gameboard = document.querySelector(".gameboard");
    const shipName = target.dataset.shipName;
    Display.addClassToCoordinates(
        gameboard,
        droppedShipCoordinates[shipName],
        "dropped",
    );

    // Remove temporary vertical drag image
    if (target.classList.contains("vertical")) {
        const placeShipsSceneWrapper = document.querySelector(
            ".place-ships-scene-wrapper",
        );
        const verticalDragImageWrapper = document.querySelector(
            ".vertical-drag-image-wrapper",
        );
        placeShipsSceneWrapper.removeChild(verticalDragImageWrapper);
    }

    // Remove dragging class
    target.classList.remove("dragging");

    // Remove all dragover classes
    const previousDragoverCells = document.querySelectorAll(".dragover");
    if (previousDragoverCells) {
        previousDragoverCells.forEach((cell) =>
            cell.classList.remove("dragover"),
        );
    }
};

const handleToggleShipOrientation = (event) => {
    const target = event.target;
    const isShipImage = target.classList.contains("ship-image");
    if (!isShipImage) {
        return;
    }

    const firstCoordinate = target.parentNode.dataset.coordinate;
    const length = target.dataset.length;
    const newOrientation = target.classList.contains("horizontal")
        ? "vertical"
        : "horizontal";
    const shipName = target.dataset.shipName;

    // Check if new coordinates are valid
    if (
        !Display.isValidPlacement(
            firstCoordinate,
            length,
            newOrientation,
            shipName,
            droppedShipCoordinates,
        )
    ) {
        return;
    }

    const gameboard = document.querySelector(".gameboard");
    const previousCoordinates = droppedShipCoordinates[shipName];

    // Remove dropped class from previous coordinates
    Display.removeClassFromCoordinates(
        gameboard,
        previousCoordinates,
        "dropped",
    );

    // Toggle ship orientation class
    target.classList.toggle("horizontal");
    target.classList.toggle("vertical");

    // Set new coordinates
    const newCoordinates = Display.getShipOverCoordinates(
        firstCoordinate,
        length,
        newOrientation,
    );
    droppedShipCoordinates[shipName] = newCoordinates;

    // Add dropped class on new coordinates
    Display.addClassToCoordinates(gameboard, newCoordinates, "dropped");
};

const handleButtonClick = (event) => {
    const target = event.target;

    if (target.id === "button-reset-board") {
        // Reset all dropped coordinates to null
        for (const ship in droppedShipCoordinates) {
            droppedShipCoordinates[ship] = null;
        }
        // Re-render place ships scene
        Display.renderPlaceShipsScene();
        initPlaceShipsEvents();
    }

    if (target.id === "button-confirm-placements") {
        if (Object.values(droppedShipCoordinates).includes(null)) {
            console.log("THERE WAS A NULL");
            // TODO: prompt user to place all ships
            return;
        }

        for (const ship in droppedShipCoordinates) {
            player.gameboard.setCoordinatesOf(ship, droppedShipCoordinates[ship]);
        }

        // Control given back to game controller
        onShipsPlaced();
    }
};
