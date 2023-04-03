const User = require("../models/user");
const { body, validationResult } = require("express-validator");

// Display member form on Get
exports.member_update_get = function (req, res, next) {
  res.render("layout", { title: "Become a Member", content: "member" });
};

// Handle User update on Post
exports.member_update_post = [
  // Validate fields
  body("passcode").custom((value) => {
    if (value !== process.env.MEMBER_PASSCODE) {
      throw new Error("The passcode is incorrect");
    }
    return true;
  }),
  // Process request after validation
  async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again
      res.render("layout", {
        title: "Become a Member",
        content: "member",
        errors: errors.array(),
      });
      return;
    }
    try {
      // Data from form is valid. Update the record
      const user = await User.findByIdAndUpdate(req.user._id, { member: true });
      res.redirect("/");
    } catch (error) {
      return next(error);
    }
  },
];

// Display admin form on Get
exports.admin_update_get = function (req, res, next) {
  res.render("layout", { title: "Admin", content: "admin" });
};

// Handle User update to admin on Post
exports.admin_update_post = [
  // Validate fields
  body("passcode").custom((value) => {
    if (value !== process.env.ADMIN_PASSCODE) {
      throw new Error("The passcode is incorrect");
    }
    return true;
  }),
  // Process request after validation
  async (req, res, next) => {
    // Extract the validation errors from a request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // There are errors. Render form again
      res.render("layout", {
        title: "Admin",
        content: "admin",
        errors: errors.array(),
      });
      return;
    }
    try {
      // Data from form is valid. Update the record
      const user = await User.findByIdAndUpdate(req.user._id, { admin: true });
      res.redirect("/");
    } catch (error) {
      return next(error);
    }
  },
];
