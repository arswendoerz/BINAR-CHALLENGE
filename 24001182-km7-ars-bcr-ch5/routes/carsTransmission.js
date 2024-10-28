const express = require("express");
const {
    validateGetCarsTransmission,
    validateCreateCarsTransmission,
    validateGetCarsTransmissionbyId,
    validateUpdateCarsTransmission,
    validateDeleteCarsTransmissionbyId,
} = require("../middlewares/carsTransmission");
const {
    getCarsTransmission,
    createCarsTransmission,
    getCarsTransmissionbyId,
    updateCarsTransmission,
    deleteCarsTransmissionbyId,
} = require("../controllers/carsTransmission");

const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const router = express.Router();

router.get("/", authorization(adminRole, userRole), validateGetCarsTransmission, getCarsTransmission);
router.post("/", authorization(adminRole), validateCreateCarsTransmission, createCarsTransmission);
router.get('/:id', authorization(adminRole, userRole), validateGetCarsTransmissionbyId, getCarsTransmissionbyId);
router.put("/:id", authorization(adminRole), validateUpdateCarsTransmission, updateCarsTransmission);
router.delete("/:id", authorization(adminRole), validateDeleteCarsTransmissionbyId, deleteCarsTransmissionbyId);

module.exports = router;
