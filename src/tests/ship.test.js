import { createShip } from "../models/ship.js";

describe("check if ship is sunk", () => {
    const ship = createShip("patrol boat", 2);
    ship.setCoordinates(["B6", "B7"]);

    test("is not sunk after no hits", () => {
        expect(ship.isSunk()).toBe(false);
    });
    test("is not sunk when hits is less than length", () => {
        ship.hit("B6");

        expect(ship.isSunk()).toBe(false);
    });
    test("is sunk when hits is equal to length", () => {
        ship.hit("B6");
        ship.hit("B7");

        expect(ship.isSunk()).toBe(true);
    });
});
