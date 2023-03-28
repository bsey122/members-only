const express = require("express");
const router = express.Router();

// Require controller modules
const signupController = require("../controllers/signupController");

// GET signup page
router.get("/", signupController.signup_get);

// Post request for creating User
router.post("/", signupController.signup_post);

module.exports = router;
