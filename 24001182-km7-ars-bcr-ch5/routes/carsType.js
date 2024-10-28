const express = require("express");
const {
    validateGetCarsType,
    validateCreateCarsType,
    validateGetCarsTypebyId,
    validateUpdateCarsType,
    validateDeleteCarsTypebyId,
} = require("../middlewares/carsType")
const {
    getCarsType,
    createCarsType,
    getCarsTypebyId,
    updateCarsType,
    deleteCarsTypebyId,
} = require("../controllers/carsType")

const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const router = express.Router();

router.get("/", authorization(adminRole, userRole), validateGetCarsType, getCarsType);
router.post("/", authorization(adminRole), validateCreateCarsType, createCarsType);
router.get('/:id', authorization(adminRole, userRole), validateGetCarsTypebyId, getCarsTypebyId);
router.put("/:id", authorization(adminRole), validateUpdateCarsType, updateCarsType);
router.delete("/:id", authorization(adminRole), validateDeleteCarsTypebyId, deleteCarsTypebyId);

module.exports = router;