const formatClassName = (string) => {
    return string.split(" ").join("-");
};

const capitalizeName = (string) => {
    return string.at(0).toUpperCase() + string.slice(1);
};

const getShipOverCoordinates = (firstCoordinate, length, orientation) => {
    const coordinates = [];
    const { columnChar, rowNumString } = splitCoord(firstCoordinate);

    if (orientation === "horizontal") {
        let currentColumnCharCode = columnChar.charCodeAt(0);

        for (let i = 0; i < length; i++) {
            const currentColumnChar = String.fromCharCode(
                currentColumnCharCode++,
            );
            const currentCoordinate = currentColumnChar.concat(rowNumString);
            coordinates.push(currentCoordinate);
        }
    } else if (orientation === "vertical") {
        let currentRowNum = Number(rowNumString);

        for (let i = 0; i < length; i++) {
            const currentCoordinate = columnChar.concat(currentRowNum++);
            coordinates.push(currentCoordinate);
        }
    }

    return coordinates;
};

const isValidPlacement = (
    firstCoordinate,
    length,
    orientation,
    shipName,
    droppedShipCoordinates,
) => {
    const LAST_COLUMN_CHAR_CODE = "J".charCodeAt(0);
    const LAST_ROW_NUM = 10;

    const { columnChar, rowNumString } = splitCoord(firstCoordinate);
    const columnCharCode = columnChar.charCodeAt(0);
    const rowNum = Number(rowNumString);
    // Number of coordinates required after the first coordinate, based on ship length
    const numCoordinatesRequired = Number(length) - 1;

    // Check if ship is within gameboard dimensions
    if (
        orientation === "horizontal" &&
        columnCharCode + numCoordinatesRequired > LAST_COLUMN_CHAR_CODE
    ) {
        return false;
    }

    if (
        orientation === "vertical" &&
        rowNum + numCoordinatesRequired > LAST_ROW_NUM
    ) {
        return false;
    }

    // Check if ship overlaps with other ships
    const shipOverCoordinates = getShipOverCoordinates(
        firstCoordinate,
        length,
        orientation,
    );
    for (const ship in droppedShipCoordinates) {
        // Null check current ship coordinates
        if (!droppedShipCoordinates[ship]) {
            continue;
        }

        // Skip ship currently being checked
        if (ship === shipName) {
            continue;
        }

        for (const coordinate of shipOverCoordinates) {
            if (droppedShipCoordinates[ship].includes(coordinate)) {
                return false;
            }
        }
    }

    // If valid placement
    return true;
};

const splitCoord = (coord) => {
    const nonDigit = /\D/;
    const digit = /\d/g;

    const columnChar = coord.match(nonDigit).at(0);
    const rowNumString = coord.match(digit).join("");

    return { columnChar, rowNumString };
};

const addClassToCoordinates = (gameboard, coordinates, className) => {
    if (!coordinates) {
        return;
    }

    coordinates.forEach((coordinate) => {
        const currentCell = gameboard.querySelector(
            `[data-coordinate="${coordinate}"]`,
        );
        currentCell.classList.add(className);
    });
};

const removeClassFromCoordinates = (gameboard, coordinates, className) => {
    if (!coordinates) {
        return;
    }

    coordinates.forEach((coordinate) => {
        const currentCell = gameboard.querySelector(
            `[data-coordinate="${coordinate}"]`,
        );
        currentCell.classList.remove(className);
    });
};

export {
    formatClassName,
    capitalizeName,
    isValidPlacement,
    getShipOverCoordinates,
    addClassToCoordinates,
    removeClassFromCoordinates,
};
