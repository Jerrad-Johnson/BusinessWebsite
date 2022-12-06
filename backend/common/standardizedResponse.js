exports.standardizedResponse = ((message = {}, data = {}) => {
    return {message, ...data};
});