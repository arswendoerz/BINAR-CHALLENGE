const express = require("express");
const carsRouter = require("./cars");
const carsModelRouter =  require("./carsModel");
const carsTypeRouter = require("./carsType");
const carsManufactureRouter = require("./carsManufacture");
const carsFuelRouter = require("./carsFuel");
const carsTransmissionRouter = require("./carsTransmission");
const authRouter = require("./auth");

const router = express.Router();

router.use("/auth", authRouter);
router.use("/cars", carsRouter);
router.use("/carsModel", carsModelRouter);
router.use("/carsType", carsTypeRouter);
router.use("/carsManufacture", carsManufactureRouter);
router.use("/carsFuel", carsFuelRouter);
router.use("/carsTransmission", carsTransmissionRouter);

module.exports = router;