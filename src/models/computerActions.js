import { coordinatesInRange } from "../helpers/gameboardChecks.js";

const previousAttacks = [];
const lastAttack = {
    isHit: null,
    coordinate: null,
    sunkShip: null,
};
const recentHitAttacks = [];

export const defineActions = () => {
    return {
        getRandomPlacement,
        setLastAttack,
        getNewAttack,
    };
};

const setLastAttack = (isHit, coordinate, sunkShip) => {
    // Track all previous attacks
    previousAttacks.push(coordinate);

    if (sunkShip) {
        // Remove recent hit attacks after sinking ship
        recentHitAttacks.length = 0;
    } else if (isHit) {
        // Keep track of all hits on a ship
        recentHitAttacks.push(coordinate);
    }

    // Keep the previous lastAttack after an adjacent/inline miss
    // Ensures computer keeps targeting ship until it is sunk
    if (lastAttack.isHit && !isHit) {
        return;
    }

    lastAttack.isHit = isHit;
    lastAttack.coordinate = coordinate;
    lastAttack.sunkShip = sunkShip;
};

const getNewAttack = () => {
    let newAttackCoordinate;
    let isUniqueAttack = false;
    const usedDirections = [];

    do {
        if (!lastAttack.isHit || lastAttack.sunkShip) {
            // Target random coordinate if recent attack missed or sunk ship
            newAttackCoordinate = getRandomCoordinate();
        } else if (recentHitAttacks.length === 1) {
            // Target adjacent to recent hit if ship has been hit only once
            newAttackCoordinate = getAdjacentCoordinate(
                lastAttack.coordinate,
                usedDirections,
            );

            // If unable to get adjacent coordinate, get random instead
            if (!newAttackCoordinate) {
                newAttackCoordinate = getRandomCoordinate();

                // Ensure next attack attacks random coordinate
                recentHitAttacks.length = 0;
                lastAttack.isHit = false;
            }
        } else {
            // Target inline of other hits to ship
            newAttackCoordinate = getInlineCoordinate(usedDirections);

            // If unable to get valid inline coordinate, get random instead
            if (!newAttackCoordinate) {
                newAttackCoordinate = getRandomCoordinate();

                // Ensure next attack attacks random coordinate
                recentHitAttacks.length = 0;
                lastAttack.isHit = false;
            }
        }

        isUniqueAttack = !previousAttacks.includes(newAttackCoordinate);
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

const getAdjacentCoordinate = (coordinate, usedDirections) => {
    if (usedDirections.length === 4) {
        return null;
    }

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

const getInlineCoordinate = (usedDirections) => {
    while (usedDirections.length < 2) {
        let direction, outsideCoordinate;
        if (usedDirections.length === 0) {
            // Get direction using last 2 hit coordinates
            direction = getDirectionFromCoordinates(
                recentHitAttacks.at(-2),
                recentHitAttacks.at(-1),
            );
            outsideCoordinate = recentHitAttacks.at(-1);
        } else {
            // Get direction using first 2 hit coordinates
            direction = getDirectionFromCoordinates(
                recentHitAttacks[1],
                recentHitAttacks[0],
            );
            outsideCoordinate = recentHitAttacks[0];
        }

        let columnCharCode = outsideCoordinate.at(0).charCodeAt(0);
        let rowNum = outsideCoordinate.slice(1);
        switch (direction) {
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

        const inlineCoordinate =
            String.fromCharCode(columnCharCode).concat(rowNum);
        const directionFailed = !coordinatesInRange([inlineCoordinate]);
        usedDirections.push(direction);
        if (!directionFailed) {
            return inlineCoordinate;
        }
    }

    return null;
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

    if (baseRowNum > adjacentRowNum) {
        return "up";
    } else if (baseColumnCharCode < adjacentColumnCharCode) {
        return "right";
    } else if (baseRowNum < adjacentRowNum) {
        return "down";
    } else {
        return "left";
    }
};
