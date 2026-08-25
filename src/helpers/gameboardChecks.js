const shipNameExists = (shipName, gbState) => {
    return gbState.ships.some((ship) => ship.getName() === shipName);
};

const validCoordinatesArrLength = (shipName, coordinatesLength, gbState) => {
    const ship = gbState.ships.find((ship) => ship.getName() === shipName);
    return ship.getLength() === coordinatesLength;
};

const coordinatesInRange = (coordinatesArr) => {
    const splitCoordinatesArr = splitCoordinates(coordinatesArr);

    for (const coordinate of splitCoordinatesArr) {
        if (coordinate.letter.length !== 1) {
            return false;
        }
        if (
            coordinate.letter.charCodeAt(0) < 65 ||
            coordinate.letter.charCodeAt(0) > 74
        ) {
            return false;
        }
        if (Number.isNaN(coordinate.number)) {
            return false;
        }
        if (coordinate.number < 1 || coordinate.number > 10) {
            return false;
        }
    }
    return true;
};

const coordinatesInLine = (coordinatesArr) => {
    const splitCoordinatesArr = splitCoordinates(coordinatesArr);

    let direction;
    const letCode1 = splitCoordinatesArr[0].letter.charCodeAt(0);
    const letCode2 = splitCoordinatesArr[1].letter.charCodeAt(0);
    const num1 = splitCoordinatesArr[0].number;
    const num2 = splitCoordinatesArr[1].number;
    if (letCode1 - letCode2 === -1 && num1 - num2 === 0) {
        direction = "left-right";
    } else if (letCode1 - letCode2 === 1 && num1 - num2 === 0) {
        direction = "right-left";
    } else if (num1 - num2 === -1 && letCode1 - letCode2 === 0) {
        direction = "top-bottom";
    } else if (num1 - num2 === 1 && letCode1 - letCode2 === 0) {
        direction = "bottom-top";
    } else {
        return false;
    }

    for (let i = 1; i < splitCoordinatesArr.length - 1; i++) {
        const letCodeCurr = splitCoordinatesArr[i].letter.charCodeAt(0);
        const letCodeNext = splitCoordinatesArr[i + 1].letter.charCodeAt(0);
        const numCurr = splitCoordinatesArr[i].number;
        const numNext = splitCoordinatesArr[i + 1].number;

        switch (direction) {
            case "left-right":
                if (
                    letCodeCurr - letCodeNext !== -1 ||
                    numCurr - numNext !== 0
                ) {
                    return false;
                }
                break;
            case "right-left":
                if (
                    letCodeCurr - letCodeNext !== 1 ||
                    numCurr - numNext !== 0
                ) {
                    return false;
                }
                break;
            case "top-bottom":
                if (
                    numCurr - numNext !== -1 ||
                    letCodeCurr - letCodeNext !== 0
                ) {
                    return false;
                }
                break;
            case "bottom-top":
                if (
                    numCurr - numNext !== 1 ||
                    letCodeCurr - letCodeNext !== 0
                ) {
                    return false;
                }
        }
    }
    return true;
};

const splitCoordinates = (coordinatesArr) => {
    const splitCoordinates = [];
    const nonDigitChars = /\D/g;
    const digits = /\d/g;

    coordinatesArr.forEach((coordinate) => {
        const letter = coordinate.match(nonDigitChars).join("");
        const number = Number(coordinate.match(digits).join(""));

        splitCoordinates.push({ letter, number });
    });

    return splitCoordinates;
};

const coordinatesOccupied = (coordinatesArr, gbState) => {
    for (const ship of gbState.ships) {
        const isOccupied = ship
            .getCoordinates()
            .some((coordinate) => coordinatesArr.includes(coordinate));

        if (isOccupied) {
            return true;
        }
    }
    return false;
};

const duplicateAttack = (coordinate, gbState) => {
    // Coordinate of ship has already been attacked
    for (const ship of gbState.ships) {
        if (ship.getHits().includes(coordinate)) {
            return true;
        }
    }

    if (gbState.missedAttacks.includes(coordinate)) {
        return true;
    }

    return false;
};

export {
    shipNameExists,
    validCoordinatesArrLength,
    coordinatesInRange,
    coordinatesInLine,
    coordinatesOccupied,
    duplicateAttack,
};
