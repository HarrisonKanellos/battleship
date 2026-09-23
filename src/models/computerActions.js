import { coordinatesInRange } from "../helpers/gameboardChecks.js";

const previousAttacks = [];
const recentAttack = {
    isHit: null,
    coordinate: null,
    sunkShip: null,
};

export const defineActions = () => {
    return {
        getRandomPlacement,
        addCompletedAttack,
        setRecentAttack,
        getNewAttack,
    };
};

const addCompletedAttack = (coordinate) => {
    previousAttacks.push(coordinate);
};

const setRecentAttack = (isHit, coordinate, sunkShip) => {
    // Keep the most recent hit after an adjacent miss
    // Ensures computer keeps targeting ship until it is sunk
    if (recentAttack.isHit && !isHit) {
        return;
    }

    recentAttack.isHit = isHit;
    recentAttack.coordinate = coordinate;
    recentAttack.sunkShip = sunkShip;
};

const getNewAttack = () => {
    let newAttackCoordinate;
    let isUniqueAttack = false;
    const usedAdjacentDirections = [];

    do {
        if (recentAttack.isHit && !recentAttack.sunkShip) {
            // Target adjacent to recent hit if ship hasn't been sunk
            newAttackCoordinate = getAdjacentCoordinate(
                recentAttack.coordinate,
                usedAdjacentDirections,
            );
            if (previousAttacks.includes(newAttackCoordinate)) {
                const direction = getDirectionFromCoordinates(
                    recentAttack.coordinate,
                    newAttackCoordinate,
                );
                usedAdjacentDirections.push(direction);
            } else {
                isUniqueAttack = true;
            }
        } else {
            // Target random coordinate if recent attack missed or sunk ship
            newAttackCoordinate = getRandomCoordinate();
            if (!previousAttacks.includes(newAttackCoordinate)) {
                isUniqueAttack = true;
            }
        }
    } while (!isUniqueAttack);

    return newAttackCoordinate;
};

const getRandomCoordinate = () => {
    const charCodeA = "A".charCodeAt(0);

    const randomColumnCharCode = charCodeA + Math.floor(Math.random() * 10);
    const randomColumnChar = String.fromCharCode(randomColumnCharCode);
    const randomRowNum = Math.ceil(Math.random() * 10);
    const randomCoordinate = randomColumnChar.concat(randomRowNum);

    return randomCoordinate;
};

const getAdjacentCoordinate = (coordinate, usedDirections = []) => {
    let randomDirection;
    let isUniqueDirection = false;
    do {
        randomDirection = getRandomDirection();
        if (!usedDirections.includes(randomDirection)) {
            usedDirections.push(randomDirection);
            isUniqueDirection = true;
        }
    } while (!isUniqueDirection);

    let columnCharCode = coordinate.at(0).charCodeAt(0);
    let rowNum = Number(coordinate.slice(1));
    switch (randomDirection) {
        case "up":
            rowNum--;
            break;
        case "right":
            columnCharCode++;
            break;
        case "down":
            rowNum++;
            break;
        case "left":
            columnCharCode--;
    }

    const adjacentCoordinate =
        String.fromCharCode(columnCharCode).concat(rowNum);
    if (coordinatesInRange([adjacentCoordinate])) {
        return adjacentCoordinate;
    }

    return getAdjacentCoordinate(coordinate, usedDirections);
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
            coordinates[i] = currCoordinate;
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

const getRandomDirection = () => {
    const randomNum = Math.random();

    if (randomNum < 0.25) {
        return "up";
    } else if (randomNum < 0.5) {
        return "right";
    } else if (randomNum < 0.75) {
        return "down";
    } else {
        return "left";
    }
};

const getDirectionFromCoordinates = (baseCoordinate, adjacentCoordinate) => {
    const baseColumnCharCode = baseCoordinate.at(0).charCodeAt(0);
    const baseRowNum = Number(baseCoordinate.slice(1));
    const adjacentColumnCharCode = adjacentCoordinate.at(0).charCodeAt(0);
    const adjacentRowNum = Number(adjacentCoordinate.slice(1));

    if (baseRowNum < adjacentRowNum) {
        return "up";
    } else if (baseColumnCharCode < adjacentColumnCharCode) {
        return "right";
    } else if (baseRowNum > adjacentRowNum) {
        return "down";
    } else {
        return "left";
    }
};
