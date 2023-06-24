const express = require("express");
const { loginController, registerController } = require("../controllers/userController");
const { authenticateJWT, generateToken } = require("../middelware/auth");

const router = express.Router();

// routes
// method - get
router.post("/login", authenticateJWT, loginController);

// method-post
router. post("/register", generateToken, registerController);

module.exports = router