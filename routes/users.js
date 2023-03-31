var express = require("express");
var router = express.Router();

// Require controller module
const userRouter = require("../controllers/userController");
// Get request to update User to member
router.get(
  "/member",
  userRouter.redirect_to_login,
  userRouter.member_update_get
);

// Post request to update User
router.post("/member", userRouter.member_update_post);

module.exports = router;
