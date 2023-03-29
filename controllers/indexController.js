const Message = require("../models/message");

// Display list of all messages
exports.index = async (req, res, next) => {
  const messageList = await Message.find().sort({ date: -1 }).populate("user");
  // Successful, so render
  res.render("layout", {
    title: "Members Only",
    user: req.user,
    messageList,
    content: "index",
  });
};
