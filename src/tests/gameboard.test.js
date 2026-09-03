import { createGameboard } from "../models/gameboard.js";

let gameboard;

beforeEach(() => {
    gameboard = createGameboard();
    gameboard.initShips();
});

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

    test("prevents setting coordinates if another ship occupies them", () => {
        gameboard.setCoordinatesOf("patrol boat", ["A2", "A3"]);
        const battleship = {
            name: "battleship",
            coordinates: ["A3", "A4", "A5", "A6"],
        };
        const error = new Error("Coordinates are occupied by another ship.");

        expect(() => {
            gameboard.setCoordinatesOf(battleship.name, battleship.coordinates);
        }).toThrow(error);
    });

    test("prevents setting coordinates occupied by another ship", () => {
        gameboard.setCoordinatesOf("patrol boat", ["E8", "E9"]);
        const battleship = {
            name: "battleship",
            coordinates: ["D8", "E8", "F8", "G8"],
        };
        const error = new Error("Coordinates are occupied by another ship.");

        expect(() => {
            gameboard.setCoordinatesOf(battleship.name, battleship.coordinates);
        }).toThrow(error);
    });
});

describe("receiving invalid attacks", () => {
    test("doesn't accept coordinate with incorrect format", () => {
        expect(() => {
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
    beforeEach(() => {
        gameboard.setCoordinatesOf("destroyer", ["H6", "H7", "H8"]);
    });

    test("attacking a ship registers as hit", () => {
        gameboard.receiveAttack("H7");
        expect(gameboard.getHitCoordinates()).toContain("H7");
        expect(gameboard.getMisses()).not.toContain("H7");
    });

    test("missed attack doesn't register as hit", () => {
        gameboard.receiveAttack("B3");
        expect(gameboard.getHitCoordinates()).not.toContain("B3");
        expect(gameboard.getMisses()).toContain("B3");
    });
});

describe("checking all ships sunk", () => {
    beforeEach(() => {
        gameboard.setCoordinatesOf("carrier", ["B2", "B3", "B4", "B5", "B6"]);
        gameboard.setCoordinatesOf("battleship", ["E7", "F7", "G7", "H7"]);
        gameboard.setCoordinatesOf("destroyer", ["C4", "C5", "C6"]);
        gameboard.setCoordinatesOf("submarine", ["F8", "F9", "F10"]);
        gameboard.setCoordinatesOf("patrol boat", ["G9", "H9"]);
    });

    test("returns false when no ships sunk", () => {
        expect(gameboard.allSunk()).toBe(false);
    });

    test("returns false when some ships sunk", () => {
        const battleshipCoordinates = ["E7", "F7", "G7", "H7"];
        const submarineCoordinates = ["F8", "F9", "F10"];
        const otherCoordinates = ["G9", "A9", "C5", "B3", "B6"];

        battleshipCoordinates.forEach((coordinate) =>
            gameboard.receiveAttack(coordinate),
        );
        submarineCoordinates.forEach((coordinate) =>
            gameboard.receiveAttack(coordinate),
        );
        otherCoordinates.forEach((coordinate) =>
            gameboard.receiveAttack(coordinate),
        );

        expect(gameboard.allSunk()).toBe(false);
    });

    test("returns true when all ships sunk", () => {
        const allShipCoordinates = [
            "B2",
            "B3",
            "B4",
            "B5",
            "B6",
            "E7",
            "F7",
            "G7",
            "H7",
            "C4",
            "C5",
            "C6",
            "F8",
            "F9",
            "F10",
            "G9",
            "H9",
        ];
        allShipCoordinates.forEach((coordinate) =>
            gameboard.receiveAttack(coordinate),
        );

        expect(gameboard.allSunk()).toBe(true);
    });
});
