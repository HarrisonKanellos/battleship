import { createGameboard } from "../models/gameboard.js";

const gameboard = createGameboard();
gameboard.initShips();

describe("set coordinates of ship rejects invalid arguments", () => {
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

describe("receiving invalid attacks", () => {
    test("doesn't accept coordinate with incorrect format", () => {
        excpect(() => {
            gameboard.receiveAttack("PB7");
        }).toThrow(RangeError);
    });

    test("doesn't accept coordinate not in range (letter)", () => {
        expect(() => {
            gameboard.receiveAttack("X4");
        }).toThrow(RangeError);
    });

    test("doesn't accept coordinate not in range (number)", () => {
        expect(() => {
            gameboard.receiveAttack("H21");
        }).toThrow(RangeError);
    });

    test("duplicate attack throws an error", () => {
        const error = new Error("Coordinate has already been attacked.");

        gameboard.receiveAttack("D9");
        expect(() => {
            gameboard.receiveAttack("D9");
        }).toThrow(error);
    });
});

describe("receiving valid attacks", () => {
    gameboard.setCoordinatesOf("destroyer", ["H6", "H7", "H8"]);

    test("attacking a ship registers as hit", () => {
        gameboard.receiveAttack("H7");
        expect(gameboard.getHits()).toContain("H7");
        expect(gameboard.getMisses()).not.toContain("H7");
    });

    test("missed attack doesn't register as hit", () => {
        gameboard.receiveAttack("B3");
        expect(gameboard.getHits()).not.toContain("B3");
        expect(gameboard.getMisses()).toContain("B3");
    });
});
