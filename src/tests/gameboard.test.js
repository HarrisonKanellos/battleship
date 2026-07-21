import { createGameboard } from "../models/gameboard.js";

const gameboard = createGameboard();
gameboard.initShips();

describe("set coordinates of ship", () => {
    test("doesn't accept unknown ship name", () => {
        const ship = {
            name: "unknown ship",
            coordinates: ["B3", "C3", "D4"],
        };
        const error = new Error("Ship name must exist in ships array.");

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(error);
    });

    test("doesn't accept invalid number of coordinates", () => {
        const ship = {
            name: "destroyer",
            coordinates: ["A3", "A4", "A5", "A6"],
        };
        const error = new Error(
            "Length of coordinates array must be equal to length of ship.",
        );

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(error);
    });

    test("doesn't accept coordinates not in range (letter)", () => {
        const ship = {
            name: "battleship",
            coordinates: ["L3", "A4", "A5", "A6"],
        };

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(RangeError);
    });

    test("doesn't accept coordinates not in range (number)", () => {
        const ship = {
            name: "battleship",
            coordinates: ["A3", "A11", "A5", "A6"],
        };

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(RangeError);
    });

    test("doesn't accept coordinates not in range (large number)", () => {
        const ship = {
            name: "battleship",
            coordinates: ["A3", "A4", "A117", "A6"],
        };

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(RangeError);
    });

    test("doesn't accept coordinates not in straight line (letter)", () => {
        const ship = {
            name: "battleship",
            coordinates: ["A3", "A4", "A5", "B6"],
        };
        const error = new Error("Coordinates must be in straight line.");

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(error);
    });

    test("doesn't accept coordinates not in straight line (number)", () => {
        const ship = {
            name: "battleship",
            coordinates: ["A3", "A4", "A6", "A5"],
        };
        const error = new Error("Coordinates must be in straight line.");

        expect(() => {
            gameboard.setCoordinatesOf(ship.name, ship.coordinates);
        }).toThrow(error);
    });
});
