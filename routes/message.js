const express = require("express");
const router = express.Router();

// Require controller modules
const messageController = require("../controllers/messageController");

// Get request for creating Message
router.get("/new-message", messageController.message_create_get);

// Post request for creating Message
router.post("/new-message", messageController.message_create_post);

// Post request for deleting Message
router.post("/delete-message/:id", messageController.message_delete_post);

module.exports = router;
