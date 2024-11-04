const express = require("express");
const { 
    validateRegister,
    validateLogin,
    validateProfile,
} = require("../middlewares/auth");
const { 
    register, 
    login,
    profile, 
} = require("../controllers/auth");

const router = express.Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
router.get("/profile", validateProfile, profile);

module.exports = router;