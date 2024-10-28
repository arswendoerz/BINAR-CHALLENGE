const express = require("express");
const {
    validateGetCarsModel,
    validateCreateCarModel,
    validateGetCarModelbyId,
    validateUpdateCarModel,
    validateDeleteCarModelbyId,
} = require("../middlewares/carsModel");
const {
    getCarsModel,
    createCarModel,
    getCarModelbyId,
    updateCarModel,
    deleteCarModelbyId, 
} = require("../controllers/carsModel");

const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const router = express.Router();

router.get("/", authorization(adminRole, userRole), validateGetCarsModel, getCarsModel);
router.post("/", authorization(adminRole), validateCreateCarModel, createCarModel);
router.get('/:id', authorization(adminRole, userRole), validateGetCarModelbyId, getCarModelbyId);
router.put("/:id", authorization(adminRole), validateUpdateCarModel, updateCarModel);
router.delete("/:id", authorization(adminRole), validateDeleteCarModelbyId, deleteCarModelbyId);

module.exports = router;
