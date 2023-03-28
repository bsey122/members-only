const passport = require("passport");
const User = require("../models/user");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");

// Display login form on Get
exports.login_get = (req, res) => {
  res.render("layout", { title: "Login", content: "login" });
};

// Handle user login
exports.login_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

// Find user in database and check that password is correct
passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          // passwords match! log user in
          return done(null, user);
        } else {
          // passwords do not match!
          return done(null, false, { message: "Incorrect password" });
        }
      });
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});
