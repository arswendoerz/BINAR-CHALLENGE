const express = require("express");
const { authorization } = require("../middlewares/auth");
const {
    validateGetCarsManufacture,
    validateCreateCarsManufacture,
    validateGetCarsManufacturebyId,
    validateUpdateCarsManufacture,
    validateDeleteCarsManufacturebyId,
} = require("../middlewares/carsManufacture")
const {
    getCarsManufacture,
    createCarsManufacture,
    getCarsManufacturebyId,
    updateCarsManufacture,
    deleteCarsManufacturebyId,
} = require("../controllers/carsManufacture")

const { adminRole, userRole } = require("../constants/auth");
const router = express.Router();

router.get("/", authorization(adminRole, userRole), validateGetCarsManufacture, getCarsManufacture)
router.post("/", authorization(adminRole), validateCreateCarsManufacture, createCarsManufacture);
router.get('/:id', authorization(adminRole, userRole), validateGetCarsManufacturebyId, getCarsManufacturebyId);
router.put("/:id", authorization(adminRole), validateUpdateCarsManufacture, updateCarsManufacture);
router.delete("/:id", authorization(adminRole), validateDeleteCarsManufacturebyId, deleteCarsManufacturebyId);

module.exports = router;