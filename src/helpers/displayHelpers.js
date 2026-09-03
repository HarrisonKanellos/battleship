const formatClassName = (string) => {
    return string.split(" ").join("-");
};

const capitalizeName = (string) => {
    return string.at(0).toUpperCase() + string.slice(1);
};

export { formatClassName, capitalizeName };
