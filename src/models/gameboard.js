import { createShip } from "./ship.js";
import * as gameboardChecks from "../helpers/gameboardChecks.js";

export function createGameboard() {
    const gbState = {
        shipsArr: [],
        missedAtks: [],
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
        if (
            !gameboardChecks.validCoordinatesArrLength(
                shipName,
                coordinatesArr.length,
                gbState,
            )
        ) {
            throw new Error(
                "Length of coordinates array must be equal to length of ship.",
            );
        }
        if (!gameboardChecks.coordinatesInRange(coordinatesArr)) {
            throw new RangeError(
                "Coordinate must have one letter (A-J) and one number (1-10)",
            );
        }
        if (!gameboardChecks.coordinatesInLine(coordinatesArr)) {
            throw new Error("Coordinates must be in straight line.");
        }
        if (gameboardChecks.coordinatesOccupied(coordinatesArr, gbState)) {
            throw new Error("Coordinates are occupied by another ship.");
        }

        gbState.shipsArr
            .find((ship) => ship.getName() === shipName)
            .setCoordinates(coordinatesArr);
    };

    const receiveAttack = (coordinate) => {
        if (!gameboardChecks.coordinatesInRange([coordinate])) {
            throw new RangeError(
                "Coordinate must have one letter (A-J) and one number (1-10)",
            );
        }
        if (gameboardChecks.duplicateAttack(coordinate, gbState)) {
            throw new Error("Coordinate has already been attacked.");
        }

        for (const ship of gbState.shipsArr) {
            if (ship.getCoordinates().includes(coordinate)) {
                ship.hit(coordinate);
                return;
            }
        }
        gbState.missedAtks.push(coordinate);
    };

    const getHitCoordinates = () => {
        const hitCoordinates = [];
        gbState.shipsArr.forEach((ship) => {
            ship.getHits().forEach((coordinate) =>
                hitCoordinates.push(coordinate),
            );
        });
        return hitCoordinates;
    };

    const getMisses = () => {
        return gbState.missedAtks;
    };

    const allSunk = () => {
        return gbState.shipsArr.every((ship) => ship.isSunk());
    };

    return {
        initShips,
        setCoordinatesOf,
        receiveAttack,
        getHitCoordinates,
        getMisses,
        allSunk,
    };
}
