export function createShip(name, length) {
    const coordinates = [];

    const getName = () => name;

    const getLength = () => length;

    const getCoordinates = () => coordinates.map((coord) => coord.point);

    const getHits = () => {
        return coordinates
            .filter((coord) => coord.hit)
            .map((coord) => coord.point);
    };

    const setCoordinates = (newCoordinates) => {
        for (coord of newCoordinates) {
            coordinates.push({
                point: coord,
                hit: false,
            });
        }
    };

    const hit = (coordinate) => {
        for (coord of coordinates) {
            if (coord.point === coordinate) {
                coord.hit = true;
                return;
            }
        }
    };

    const isSunk = () => coordinates.every((coord) => coord.hit);

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
