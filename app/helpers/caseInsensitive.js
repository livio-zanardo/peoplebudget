const caseInsensitive = (target, fields) => {
    for (const field of fields) {
        if (target.hasOwnProperty(field)) {
            target[field] = target[field].toLower();
        }
    }
    return target;
};

module.exports = caseInsensitive;
