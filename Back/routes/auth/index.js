const router = require("express").Router();

module.exports = () => {
    router.post("/signup", require("./signup")());
    router.post("/signin", require("./signin")());
    router.post("/signout", require("./signout")());

    return router;
}