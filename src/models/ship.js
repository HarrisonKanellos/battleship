export function createShip(name, length) {

    let hits = 0;

    const getName = () => name;

    const hit = () => hits++;

    const isSunk = () => hits === length;

    return { getName, hit, isSunk };
}