const getRandomCoordinate = () => {
    const charCodeA = "A".charCodeAt(0);

    const randomColumnCharCode = charCodeA + Math.floor(Math.random() * 10);
    const randomColumnChar = String.fromCharCode(randomColumnCharCode);
    const randomRowNum = Math.ceil(Math.random() * 10);

    const randomCoordinate = randomColumnChar.concat(randomRowNum);

    return randomCoordinate;
};

export { getRandomCoordinate };