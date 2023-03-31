const User = require("../models/user");

// Display member form on Get
exports.member_update_get = function (req, res, next) {
  res.render("layout", { title: "Become a Member", content: "member" });
};

// Handle User update on Post
exports.member_update_post = async (req, res, next) => {
  if (req.body.passcode !== process.env.PASSCODE) {
    res.render("layout", { title: "Become a Member", content: "member" });
    return;
  }
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { member: true });
    res.redirect("/");
  } catch (error) {
    return next(error);
  }
};

// Redirect to login page if User is not logged in
exports.redirect_to_login = function (req, res, next) {
  if (req.user === undefined) {
    res.redirect("/login");
  }
  next();
};
