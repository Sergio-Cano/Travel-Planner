const { deserializeToken } = require("../misc/authUtils");
const errors = require("../misc/errors");

module.exports = (req, res, next) => {
    const payload = deserializeToken(req);

    const { email, name } = payload

    if(!payload) return next(errors[401]);

    res.locals = {
        email,
        name
    };

    next();
}