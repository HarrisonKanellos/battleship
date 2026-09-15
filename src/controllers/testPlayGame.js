const testCoordinates = {
    realPlayer: {
        carrier: ["B2", "B3", "B4", "B5", "B6"],
        battleship: ["E7", "F7", "G7", "H7"],
        destroyer: ["C4", "C5", "C6"],
        submarine: ["F8", "F9", "F10"],
        "patrol boat": ["G9", "H9"],
    },
    computerPlayer: {
        carrier: ["D7", "E7", "F7", "G7", "H7"],
        battleship: ["C4", "C5", "C6", "C7"],
        destroyer: ["F8", "F9", "F10"],
        submarine: ["G8", "G9", "G10"],
        "patrol boat": ["A2", "B2"],
    },
};

const testSetCoordinates = () => {
    Object.keys(testCoordinates.realPlayer).forEach((shipName) => {
        players.realPlayer.gameboard.setCoordinatesOf(
            shipName,
            testCoordinates.realPlayer[shipName],
        );
    });
    Object.keys(testCoordinates.computerPlayer).forEach((shipName) => {
        players.computerPlayer.gameboard.setCoordinatesOf(
            shipName,
            testCoordinates.computerPlayer[shipName],
        );
    });
};

const testHitCoordinates = () => {
    players.realPlayer.gameboard.receiveAttack("A7");
    players.realPlayer.gameboard.receiveAttack("B2");
    players.realPlayer.gameboard.receiveAttack("F10");
    players.realPlayer.gameboard.receiveAttack("H5");
    players.realPlayer.gameboard.receiveAttack("E2");
    players.realPlayer.gameboard.receiveAttack("E8");
};

export {
    testSetCoordinates,
    testHitCoordinates,
};