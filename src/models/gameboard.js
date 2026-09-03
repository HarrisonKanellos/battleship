import { createShip } from "./ship.js";
import {
    shipNameExists,
    validCoordinatesArrLength,
    coordinatesInRange,
    coordinatesInLine,
    coordinatesOccupied,
    duplicateAttack,
} from "../helpers/gameboardChecks.js";

export function createGameboard() {
    const gbState = {
        ships: [],
        missedAttacks: [],
    };

    const initShips = () => {
        gbState.ships.push(createShip("carrier", 5));
        gbState.ships.push(createShip("battleship", 4));
        gbState.ships.push(createShip("destroyer", 3));
        gbState.ships.push(createShip("submarine", 3));
        gbState.ships.push(createShip("patrol boat", 2));
    };

    const setCoordinatesOf = (shipName, coordinatesArr) => {
        if (!shipNameExists(shipName, gbState)) {
            throw new Error("Ship name must exist in ships array.");
        }
        if (
            !validCoordinatesArrLength(shipName, coordinatesArr.length, gbState)
        ) {
            throw new Error(
                "Length of coordinates array must be equal to length of ship.",
            );
        }
        if (!coordinatesInRange(coordinatesArr)) {
            throw new RangeError(
                "Coordinate must have one letter (A-J) and one number (1-10)",
            );
        }
        if (!coordinatesInLine(coordinatesArr)) {
            throw new Error("Coordinates must be in straight line.");
        }
        if (coordinatesOccupied(coordinatesArr, gbState)) {
            throw new Error("Coordinates are occupied by another ship.");
        }

        gbState.ships
            .find((ship) => ship.getName() === shipName)
            .setCoordinates(coordinatesArr);
    };

    const receiveAttack = (coordinate) => {
        if (!coordinatesInRange([coordinate])) {
            throw new RangeError(
                "Coordinate must have one letter (A-J) and one number (1-10)",
            );
        }
        if (duplicateAttack(coordinate, gbState)) {
            throw new Error("Coordinate has already been attacked.");
        }

        for (const ship of gbState.ships) {
            if (ship.getCoordinates().includes(coordinate)) {
                ship.hit(coordinate);
                return;
            }
        }
        gbState.missedAttacks.push(coordinate);
    };

    const getHitCoordinates = () => {
        const hitCoordinates = [];
        gbState.ships.forEach((ship) => {
            ship.getHits().forEach((coordinate) =>
                hitCoordinates.push(coordinate),
            );
        });
        return hitCoordinates;
    };

    const getMisses = () => {
        return gbState.missedAttacks;
    };

    const allSunk = () => {
        return gbState.ships.every((ship) => ship.isSunk());
    };

    const getShipPositions = () => {
        const positions = {};
        for (const ship of gbState.ships) {
            const coordinates = ship.getCoordinates();
            const orientation = ship.getOrientation();

            positions[ship.getName()] = { coordinates, orientation };
        }
        return positions;
    };

    return {
        initShips,
        setCoordinatesOf,
        receiveAttack,
        getHitCoordinates,
        getMisses,
        allSunk,
        getShipPositions,
    };
}
