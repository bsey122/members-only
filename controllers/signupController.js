const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Display User sign-up form on Get
exports.signup_get = (req, res) => {
  res.render("layout", { title: "Sign Up", content: "signup" });
};

// Handle User create on Post
exports.signup_post = [
  // Validate and sanitize fields
  body("first-name", "First name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last-name", "Last name must be specified")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "Username must be at least 3 characters")
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body("password", "Password must be at least 6 characters")
    .trim()
    .isLength({ min: 6 })
    .escape(),
  body("confirm-password").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
  // Process request after validation and sanitization
  async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors
      res.render("layout", {
        title: "Sign Up",
        firstName: req.body["first-name"],
        lastName: req.body["last-name"],
        username: req.body.username,
        errors: errors.array(),
        content: "signup",
      });
      return;
    }
    // Data from form is valid
    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          return next(err);
        }
        // Create a User object with escaped and trimmed data
        const user = new User({
          firstName: req.body["first-name"],
          lastName: req.body["last-name"],
          username: req.body.username,
          password: hashedPassword,
        });
        user.save((err) => {
          if (err) {
            return next(err);
          }
          // Successful - redirect to login
          res.redirect("/login");
        });
      });
    } catch (error) {
      return next(error);
    }
  },
];
