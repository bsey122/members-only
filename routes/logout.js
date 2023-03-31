const express = require("express");
const router = express.Router();

// Require controller module
const logoutController = require("../controllers/logoutController");

// Get request for logging out users
router.get("/", logoutController.logout);

module.exports = router;
