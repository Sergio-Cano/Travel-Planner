require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const routes = require("./routes");

app.use(express.json());
app.use(cookieParser());
app.use(routes());

app.use((_, __, next) => {
    next(errors[404]);
})

app.use(({ statusCode, error }, _, res, __) => {
    res.status(statusCode).json({
        success: false,
        message: error.message,
    })
})

app.listen(process.env.PORT, () => console.log(`Listening at ${process.env.PORT}`));