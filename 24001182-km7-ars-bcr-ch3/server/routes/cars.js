const express = require("express");
const multer = require("multer");
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

const storage = multer.memoryStorage(); // Menyimpan file dalam memori
const upload = multer({ storage });

router.get("/cars", validateGetCars, getCars);
router.post("/cars", upload.single("image"), validateCreateCar, createCar);
router.get("/cars/:id", validateGetCarById, getCarById);
router.put("/cars/:id", upload.single("image"), validateUpdateCar, updateCar);
router.delete("/cars/:id", validateDeleteCarById, deleteCarById);

module.exports = router;
