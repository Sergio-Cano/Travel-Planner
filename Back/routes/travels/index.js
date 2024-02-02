const router = require("express").Router();
const isAuthenticated = require("../../middlewares/isAuthenticated");

module.exports = () => {
    router.get("/", require("./allTravels")());
    router.get("/user", isAuthenticated, require("./getTravelsByUser")());
    router.get("/:id", require("./getTravelById")());
    router.post("/create", isAuthenticated, require("./createTravel")());
    router.put("/edit/:id", require("./editTravel")());
    router.delete("/delete/:id", require("./deleteTravel")());

    return router;
}