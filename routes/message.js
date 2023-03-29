const express = require("express");
const router = express.Router();

// Require controller modules
const messageController = require("../controllers/messageController");

// Get request for creating Message
router.get("/", messageController.message_create_get);

// Post request for creating Message
router.post("/", messageController.message_create_post);

module.exports = router;
