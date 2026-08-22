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

export { renderGameScene };
