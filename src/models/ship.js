export function createShip(name, length) {
    let hits = 0;
    const coordinates = [];

    const getName = () => name;

    const getLength = () => length;

    const getCoordinates = () => coordinates;

    const setCoordinates = (newCoordinates) => {
        for (let i = 0; i < newCoordinates.length; i++) {
            coordinates[i] = newCoordinates[i];
        }
    };

    const hit = () => hits++;

    const isSunk = () => hits === length;

    return { getName, getLength, getCoordinates, setCoordinates, hit, isSunk };
}
