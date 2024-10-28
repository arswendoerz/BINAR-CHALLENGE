const express = require("express");
const {
    validateGetCarsFuel,
    validateCreateCarsFuel,
    validateGetCarsFuelbyId,
    validateUpdateCarsFuel,
    validateDeleteCarsFuelbyId,
} = require("../middlewares/carsFuel");
const {
    getCarsFuel,
    createCarsFuel,
    getCarsFuelbyId,
    updateCarsFuel,
    deleteCarsFuelbyId,
} = require("../controllers/carsFuel");

const { authorization } = require("../middlewares/auth");
const { adminRole, userRole } = require("../constants/auth");
const router = express.Router();

router.get("/", authorization(adminRole, userRole), validateGetCarsFuel, getCarsFuel);
router.post("/", authorization(adminRole), validateCreateCarsFuel, createCarsFuel);
router.get('/:id', authorization(adminRole, userRole), validateGetCarsFuelbyId, getCarsFuelbyId);
router.put("/:id", authorization(adminRole), validateUpdateCarsFuel, updateCarsFuel);
router.delete("/:id", authorization(adminRole), validateDeleteCarsFuelbyId, deleteCarsFuelbyId);

module.exports = router;
