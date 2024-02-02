const router = require("express").Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");

module.exports = () => {
    router.post("/signup", require("./signup")());
    router.post("/signin", require("./signin")());
    router.post("/signout", isAuthenticated, require("./signout")());
    router.get("/users", isAuthenticated, require("./getUsers")());

    return router;
}