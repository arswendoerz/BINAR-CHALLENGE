const express = require("express");
const carsRouter = require("./cars");

const router = express.Router();

router.use("/", carsRouter);

module.exports = router;
