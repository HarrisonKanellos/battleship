export function createShip(name, length) {
    const coordinates = [];
    const hits = [];

    const getName = () => name;

    const getLength = () => length;

    const getCoordinates = () => coordinates;

    const getHits = () => hits;

    const setCoordinates = (newCoordinates) => {
        for (let i = 0; i < newCoordinates.length; i++) {
            coordinates[i] = newCoordinates[i];
        }
    };

    const hit = (coordinate) => hits.push(coordinate);

    const isSunk = () => hits.length === length;

    return {
        getName,
        getLength,
        getCoordinates,
        setCoordinates,
        hit,
        getHits,
        isSunk,
    };
}
