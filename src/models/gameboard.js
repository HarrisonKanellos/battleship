import { createShip } from "./ship.js";
import * as gameboardChecks from "../helpers/gameboardChecks.js";

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
        if (!gameboardChecks.shipNameExists(shipName, gbState)) {
            throw new Error("Ship name must exist in ships array.");
        }
        if (!gameboardChecks.validCoordsArrLength(shipName, coordinatesArr.length, gbState)) {
            throw new Error(
                "Length of coordinates array must be equal to length of ship.",
            );
        }
        if (!gameboardChecks.coordsInRange(coordinatesArr)) {
            throw new RangeError(
                "Coordinate must have one letter (A-J) and one number (1-10)",
            );
        }
        if (!gameboardChecks.coordsInLine(coordinatesArr)) {
            throw new Error("Coordinates must be in straight line.");
        }

        gbState.shipsArr
            .find((ship) => ship.getName() === shipName)
            .setCoordinates(coordinatesArr);
    };

        }

    };

    return { initShips, setCoordinatesOf };
}
