const Message = require("../models/message");
const { body, validationResult } = require("express-validator");

// Display Message create form on Get
exports.message_create_get = (req, res) => {
  res.render("layout", { title: "New Message", content: "new-message" });
};

// Handle Message create on Post
exports.message_create_post = [
  // Validate and sanitize fields
  body("title", "Title must be specified").trim().isLength({ min: 1 }).escape(),
  body("message", "Message must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  // Process request after validation and sanitization
  async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors
      res.render("layout", {
        title: "New Message",
        messageTitle: req.body.title,
        message: req.body.message,
        errors: errors.array(),
        content: "new-message",
      });
    }
    // Data from form is valid
    try {
      // Create a Message object with escaped and trimmed data
      const message = new Message({
        title: req.body.title,
        text: req.body.message,
        user: req.user._id,
      });
      await message.save();
      // Successful - redirect to home page
      res.redirect("/");
    } catch (error) {
      return next(error);
    }
  },
];
