import { createShip } from "./ship.js";

export function createGameboard() {
    const gbState = {
        shipsArr: [],
    };

    const initShips = () => {
        gbState.shipsArr.push(createShip("carrier", 5));
        gbState.shipsArr.push(createShip("battleship", 4));
        gbState.shipsArr.push(createShip("destroyer", 3));
        gbState.shipsArr.push(createShip("submarine", 3));
        gbState.shipsArr.push(createShip("patrol boat", 2));
    };

    const setCoordinatesOf = (shipName, coordinatesArr) => {
        if (!shipNameExists(shipName)) {
            throw new Error("Ship name must exist in ships array.");
        }
        if (!validCoordsArrLength(shipName, coordinatesArr.length)) {
            throw new Error(
                "Length of coordinates array must be equal to length of ship.",
            );
        }
        if (!coordsInRange(coordinatesArr)) {
            throw new RangeError(
                "Coordinate must have one letter (A-J) and one number (1-10)",
            );
        }
        if (!coordsInLine(coordinatesArr)) {
            throw new Error("Coordinates must be in straight line.");
        }

        gbState.shipsArr
            .find((ship) => ship.getName() === shipName)
            .setCoordinates(coordinatesArr);
    };

    const shipNameExists = (shipName) => {
        return gbState.shipsArr.some((ship) => ship.getName() === shipName);
    };

    const validCoordsArrLength = (shipName, coordsLength) => {
        const ship = gbState.shipsArr.find(
            (ship) => ship.getName() === shipName,
        );
        return ship.getLength() === coordsLength;
    };

    const coordsInRange = (coordinatesArr) => {
        const splitCoordsArr = splitCoords(coordinatesArr);

        for (const coord of splitCoordsArr) {
            if (coord.letter.length !== 1) {
                return false;
            }
            if (
                coord.letter.charCodeAt(0) < 65 ||
                coord.letter.charCodeAt(0) > 74
            ) {
                return false;
            }
            if (Number.isNaN(coord.number)) {
                return false;
            }
            if (coord.number < 1 || coord.number > 10) {
                return false;
            }
        }
        return true;
    };

    const coordsInLine = (coordinatesArr) => {
        const splitCoordsArr = splitCoords(coordinatesArr);

        let direction;
        const letCode1 = splitCoordsArr[0].letter.charCodeAt(0);
        const letCode2 = splitCoordsArr[1].letter.charCodeAt(0);
        const num1 = splitCoordsArr[0].number;
        const num2 = splitCoordsArr[1].number;
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

        for (let i = 1; i < splitCoordsArr.length - 1; i++) {
            const letCodeCurr = splitCoordsArr[i].letter.charCodeAt(0);
            const letCodeNext = splitCoordsArr[i + 1].letter.charCodeAt(0);
            const numCurr = splitCoordsArr[i].number;
            const numNext = splitCoordsArr[i + 1].number;

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

    const splitCoords = (coordinatesArr) => {
        const splitCoords = [];
        const nonDigitChars = /\D/g;
        const digits = /\d/g;

        coordinatesArr.forEach((coord) => {
            const letter = coord.match(nonDigitChars).join("");
            const number = Number(coord.match(digits).join(""));

            splitCoords.push({ letter, number });
        });

        return splitCoords;
    };

    return { initShips, setCoordinatesOf };
}
