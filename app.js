const express = require("express");
const cors = require("cors");
const router = require("./routes/expenses_route");
const app = express();

app.use(cors());

app.use(express.static("./frontend/build"));

app.get("/health", (req, res) => {
    res.send("OK");
});

app.use("/api/expenses", router);

module.exports = app;