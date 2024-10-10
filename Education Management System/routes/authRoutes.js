const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

// Route for user registration
router.post("/signup", authController.signup);

// Route for user authentication
router.post("/login", authController.login);

module.exports = router;
