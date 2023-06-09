var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
require("dotenv").config();

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const signupRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const logoutRouter = require("./routes/logout");
const messageRouter = require("./routes/message");

const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");
var app = express();

// set up mongoose connection
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up authentication
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Set up rate limiter: maximum of twenty requests per minute
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
});

app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); // Compress all routes
app.use(helmet()); // Use helmet
app.use(limiter); // Apply rate limiter to all requests
app.use(express.static(path.join(__dirname, "public")));

// get user variables for views
app.use(function (req, res, next) {
  // set locals
  res.locals.currentUser = req.user;
  res.locals.member = req.user?.member;
  res.locals.admin = req.user?.admin;
  next();
});

app.use("/", indexRouter);
app.use("/sign-up", signupRouter);
app.use("/login", loginRouter);
app.use("/log-out", logoutRouter);
// Redirect to login page if User is not logged in
app.use(function (req, res, next) {
  if (req.user === undefined) {
    return res.redirect("/login");
  }
  next();
});
app.use("/", usersRouter);
app.use("/", messageRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
