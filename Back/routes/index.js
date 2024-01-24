const router = require("express").Router();

module.exports = () => {
    router.use("/auth", require("./auth")());
    //router.use("/planning", require("./planning"));

    return router;
}