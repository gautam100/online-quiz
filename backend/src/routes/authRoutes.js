const express = require("express");
const router = express.Router();

// importing authController.js
const { login } = require("../controllers/authController");

router.post("/login", login);

module.exports = router;
