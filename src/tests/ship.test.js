import { createShip } from "../models/ship.js";

describe("check if ship is sunk", () => {
    test("is not sunk after no hits", () => {
        const ship = createShip(2);

        expect(ship.isSunk()).toBe(false);
    });
    test("is not sunk when hits is less than length", () => {
        const ship = createShip(2);
        ship.hit();

        expect(ship.isSunk()).toBe(false);
    });
    test("is sunk when hits is equal to length", () => {
        const ship = createShip(2);
        ship.hit();
        ship.hit();

        expect(ship.isSunk()).toBe(true);
    });
});