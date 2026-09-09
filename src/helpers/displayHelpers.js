const formatClassName = (string) => {
    return string.split(" ").join("-");
};

const capitalizeName = (string) => {
    return string.at(0).toUpperCase() + string.slice(1);
};

const getHoverCoordinates = (firstCoordinate, length, orientation) => {
    const coordinates = [];
    const { columnChar, rowNum } = splitCoord(firstCoordinate);

    coordinates.push(firstCoordinate);

    if (orientation === "horizontal") {
        const columnCharCode = columnChar.charCodeAt(0);

        // Skip first coordinate, already pushed
        for (let i = 1; i < length; i++) {
            const currentColumnChar = String.fromCharCode(columnCharCode + 1);
            const currentCoordinate = currentColumnChar.concat(rowNum);
            coordinates.push(currentCoordinate);
        }
    } else if (orientation === "vertical") {
        // Skip first coordinate, already pushed
        for (let i = 1; i < length; i++) {
            const currentRowNum = rowNum + 1;
            const currentCoordinate = columnChar.concat(currentRowNum);
            coordinates.push(currentCoordinate);
        }
    }

    return coordinates;
};

const validPlacement = (firstCoordinate, length, orientation) => {
    const LAST_COLUMN_CHAR_CODE = "J".charCodeAt(0);
    const LAST_ROW_NUM = 10;

    const { columnChar, rowNum } = splitCoord(firstCoordinate);
    const columnCharCode = columnChar.charCodeAt(0);

    if (
        orientation === "horizontal" &&
        columnCharCode + length > LAST_COLUMN_CHAR_CODE
    ) {
        return false;
    } else if (orientation === "vertical" && rowNum + length > LAST_ROW_NUM) {
        return false;
    } else {
        return true;
    }
};

const splitCoord = (coord) => {
    const nonDigit = /\D/;
    const digit = /\d/g;

    const columnChar = coord.matches(nonDigit).toUpperCase();
    const rowNum = coord.matches(digit);

    return { columnChar, rowNum };
};

export { formatClassName, capitalizeName, validPlacement, getHoverCoordinates };
