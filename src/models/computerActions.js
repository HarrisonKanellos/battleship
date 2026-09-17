import { coordinatesInRange } from "../helpers/gameboardChecks.js";

const getRandomCoordinate = () => {
    const charCodeA = "A".charCodeAt(0);

    const randomColumnCharCode = charCodeA + Math.floor(Math.random() * 10);
    const randomColumnChar = String.fromCharCode(randomColumnCharCode);
    const randomRowNum = Math.ceil(Math.random() * 10);

    const randomCoordinate = randomColumnChar.concat(randomRowNum);

    return randomCoordinate;
};

const getRandomPlacement = (length) => {
    const startCoordinate = getRandomCoordinate();
    const orientation = getRandomOrientation();
    let coordinates = [];
    
    let currColumnChar = startCoordinate.at(0);
    let currColumnCharCode = currColumnChar.charCodeAt(0);
    let currRowNum = Number(startCoordinate.slice(1));

    // Add first coordinate to array
    coordinates[0] = startCoordinate;

    // Generate more coordinates based on orientation and length
    let currCoordinate;
    for (let i = 1; i < length; i++) {
        if (orientation === "horizontal") {
            currColumnChar = String.fromCharCode(++currColumnCharCode);
            currCoordinate = currColumnChar.concat(currRowNum);
            coordinates[i] = currCoordinate;
        } else {
            ++currRowNum;
            currCoordinate = currColumnChar.concat(currRowNum);
            coordinates[i] = currCoordinate
        }
    }

    let isInRange = coordinatesInRange(coordinates);
    while (!isInRange) {
        coordinates = coordinates.map((coordinate) => {
            let columnChar = coordinate.at(0);
            let columnCharCode = columnChar.charCodeAt(0);
            let rowNum = Number(coordinate.slice(1));

            let newCoordinate;
            if (orientation === "horizontal") {
                columnChar = String.fromCharCode(--columnCharCode);
                newCoordinate = columnChar.concat(rowNum);
            } else {
                --rowNum;
                newCoordinate = columnChar.concat(rowNum);
            }
            return newCoordinate;
        });

        isInRange = coordinatesInRange(coordinates);
    }

    return coordinates;
}; 

const getRandomOrientation = () => {
    return Math.random() < 0.5 ? "horizontal" : "vertical";
};

export { getRandomCoordinate, getRandomPlacement };
