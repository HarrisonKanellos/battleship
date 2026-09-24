import * as Display from "../views/display.js";

let realPlayer, computerPlayer;
let onGameWinner;
let activePlayer;

export const playGame = (playersReference, onGameWinnerCallback) => {
    ({ realPlayer, computerPlayer } = playersReference);
    onGameWinner = onGameWinnerCallback;
    activePlayer = realPlayer;

    renderScene();
    initRealPlayerClickAttack();
};

const renderScene = () => {
    Display.renderGameScene();

    const playerGameboard = document.querySelector(".player-gameboard");
    const shipPositions = realPlayer.gameboard.getShipPositions();
    const hitCoordinates = realPlayer.gameboard.getHitCoordinates();
    const missedAttacks = realPlayer.gameboard.getMisses();

    Display.renderPlayerGameboardState(
        playerGameboard,
        shipPositions,
        hitCoordinates,
        missedAttacks,
    );
};

const initRealPlayerClickAttack = () => {
    const enemyGameboard = document.querySelector(".enemy-gameboard");
    enemyGameboard.addEventListener("click", handleClickAttack);
};

const removeRealPlayerClickAttack = () => {
    const enemyGameboard = document.querySelector(".enemy-gameboard");
    enemyGameboard.removeEventListener("click", handleClickAttack);
};

const handleClickAttack = (event) => {
    const target = event.target;
    const isRealPlayersTurn = activePlayer === realPlayer;
    const isCell = target.classList.contains("cell");
    if (!isRealPlayersTurn || !isCell) {
        return;
    }

    const coordinate = target.dataset.coordinate;
    const isSuccessfulAttack = handlePlayerAttack(realPlayer, coordinate);
    if (!isSuccessfulAttack) {
        return;
    }

    // TODO: render enemy gameboard state
    // TODO: render enemy ships list state

    const isGameWinner = checkGameWinner(realPlayer);
    if (isGameWinner) {
        removeRealPlayerClickAttack();
        onGameWinner(realPlayer);
        return;
    }

    activePlayer = computerPlayer;
    handleComputerPlayerAttack();
};

const handleComputerPlayerAttack = () => {
    const coordinate = computerPlayer.actions.getNewAttack();
    const isSuccessfulAttack = handlePlayerAttack(computerPlayer, coordinate);
    if (!isSuccessfulAttack) {
        // Attack again if attack fails
        handleComputerPlayerAttack();
        return;
    }

    let sunkShip;
    const isHit = realPlayer.gameboard.getHitCoordinates().includes(coordinate);
    if (!isHit) {
        sunkShip = false;
    } else {
        const shipNameAtCoordinate =
            realPlayer.gameboard.getShipNameAtCoordinate(coordinate);
        const shipIsSunk =
            realPlayer.gameboard.shipIsSunk(shipNameAtCoordinate);
        if (shipIsSunk) {
            sunkShip = true;
        } else {
            sunkShip = false;
        }
    }

    computerPlayer.actions.setRecentAttack(isHit, coordinate, sunkShip);
    computerPlayer.actions.addCompletedAttack(coordinate);

    Display.renderPlayerGameboardState(
        document.querySelector(".player-gameboard"),
        realPlayer.gameboard.getShipPositions(),
        realPlayer.gameboard.getHitCoordinates(),
        realPlayer.gameboard.getMisses(),
    );
    // TODO: render realPlayer ships list state

    const isGameWinner = checkGameWinner(computerPlayer);
    if (isGameWinner) {
        removeRealPlayerClickAttack();
        onGameWinner(computerPlayer);
        return;
    }

    activePlayer = realPlayer;
};

const handlePlayerAttack = (player, coordinate) => {
    try {
        player.gameboard.receiveAttack(coordinate);
    } catch (error) {
        if (error instanceof RangeError) {
            console.error(error);
        }
        return false;
    }
    return true;
};

const checkGameWinner = (player) => {
    let isGameWinner;
    if (player === realPlayer) {
        isGameWinner = computerPlayer.gameboard.allSunk();
    } else if (player === computerPlayer) {
        isGameWinner = realPlayer.gameboard.allSunk();
    }

    return isGameWinner;
};
