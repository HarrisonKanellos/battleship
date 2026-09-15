const formatClassName = (string) => {
    return string.split(" ").join("-");
};

const capitalizeName = (string) => {
    return string.at(0).toUpperCase() + string.slice(1);
};

const getHoverCoordinates = (firstCoordinate, length, orientation) => {
    const coordinates = [];
    const { columnChar, rowNumString } = splitCoord(firstCoordinate);

    if (orientation === "horizontal") {
        let currentColumnCharCode = columnChar.charCodeAt(0);

        for (let i = 0; i < length; i++) {
            const currentColumnChar = String.fromCharCode(currentColumnCharCode++);
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

const isValidPlacement = (firstCoordinate, length, orientation) => {
    const LAST_COLUMN_CHAR_CODE = "J".charCodeAt(0);
    const LAST_ROW_NUM = 10;

    const { columnChar, rowNumString } = splitCoord(firstCoordinate);
    const columnCharCode = columnChar.charCodeAt(0);
    const rowNum = Number(rowNumString);
    // Number of coordinates required after the first coordinate, based on ship length
    const numCoordinatesRequired = Number(length) - 1;

    if (
        orientation === "horizontal" &&
        columnCharCode + numCoordinatesRequired > LAST_COLUMN_CHAR_CODE
    ) {
        return false;
    } else if (
        orientation === "vertical" &&
        rowNum + numCoordinatesRequired > LAST_ROW_NUM
    ) {
        return false;
    } else {
        return true;
    }
};

const splitCoord = (coord) => {
    const nonDigit = /\D/;
    const digit = /\d/g;

    const columnChar = coord.match(nonDigit).at(0);
    const rowNumString = coord.match(digit).join("");

    return { columnChar, rowNumString };
};

export {
    formatClassName,
    capitalizeName,
    isValidPlacement,
    getHoverCoordinates,
};
