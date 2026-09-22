import {
    getRandomCoordinate,
    getRandomPlacement,
    getDirectionFromCoordinates,
} from "../models/computerActions";

const isValidColumnChar = (columnChar) => {
    const columnCharCode = columnChar.charCodeAt(0);
    return columnCharCode >= 65 && columnCharCode <= 74;
};
const isValidRowNum = (rowNumStr) => {
    const rowNum = Number(rowNumStr);
    return rowNum >= 1 && rowNum <= 10;
};

describe("getRandomCoordinate return coordinate", () => {
    test("is valid coordinate", () => {
        for (let i = 0; i < 10; i++) {
            const randomCoordinate = getRandomCoordinate();
            const columnChar = randomCoordinate.at(0);
            const rowNum = randomCoordinate.slice(1);

            expect(isValidColumnChar(columnChar)).toBe(true);
            expect(isValidRowNum(rowNum)).toBe(true);
        }
    });
});

describe("getRandomPlacement return coordinates array", () => {
    const isValidLength = (randomPlacement, length) =>
        randomPlacement.length === length;
    const isValidCoordinateRanges = (randomPlacement) => {
        return randomPlacement.every((coordinate) => {
            const columnChar = coordinate.at(0);
            const rowNum = coordinate.slice(1);

            return isValidColumnChar(columnChar) && isValidRowNum(rowNum);
        });
    };

    test("is valid coordinates array - length 3", () => {
        const length = 3;
        const randomPlacement = getRandomPlacement(length);

        expect(isValidLength(randomPlacement, length)).toBe(true);
        expect(isValidCoordinateRanges(randomPlacement)).toBe(true);
    });

    test("is valid coordinates array - length 5", () => {
        const length = 5;
        const randomPlacement = getRandomPlacement(length);

        expect(isValidLength(randomPlacement, length)).toBe(true);
        expect(isValidCoordinateRanges(randomPlacement)).toBe(true);
    });
});

describe("getDirectionFromCoordinate returns correct direction", () => {
    test("returns up", () => {
        expect(getDirectionFromCoordinates("B3", "B4")).toBe("up");
    });

    test("returns right", () => {
        expect(getDirectionFromCoordinates("G7", "H7")).toBe("right");
    });

    test("returns down", () => {
        expect(getDirectionFromCoordinates("F5", "F4")).toBe("down");
    });

    test("returns left", () => {
        expect(getDirectionFromCoordinates("B2", "A2")).toBe("left");
    });
});
