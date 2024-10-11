const express = require("express");

const {
    validateGetCars,
    validateGetCarById,
    validateDeleteCarById,
    validateCreateCar,
    validateUpdateCar,
} = require("../middlewares/cars");
const {
    getCars,
    getCarById,
    deleteCarById,
    createCar,
    updateCar,
} = require("../controllers/cars");

const router = express.Router();

router.get("/cars", validateGetCars, getCars);
router.post("/cars", validateCreateCar, createCar);
router.get("/cars/:id", validateGetCarById, getCarById);
router.put("/cars/:id", validateUpdateCar, updateCar);
router.delete("/cars/:id", validateDeleteCarById, deleteCarById);

module.exports = router;
