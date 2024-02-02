const router = require("express").Router();

module.exports = () => {
    router.use("/auth", require("./auth")());
    router.use("/travels", require("./travels")());
    
    return router;
}