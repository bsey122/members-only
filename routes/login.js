const express = require("express");
const router = express.Router();

// Require controller modules
const loginController = require("../controllers/loginController");

// Get login page
router.get("/", loginController.login_get);

// Post request for logging in users
router.post("/", loginController.login_post);

module.exports = router;
