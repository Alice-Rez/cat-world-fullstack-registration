require("dotenv").config();
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
let mongoose = require("mongoose");
let expressValidator = require("express-validator");
let expressSession = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

let url = process.env.MONGODB_URI;

mongoose.connect(url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
let db = mongoose.connection;
db.on("error", () => {
  console.log("error in connection");
});

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(cors());
// morgan package for logging HTTP requests
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// middleware for validating of the data from request
app.use(expressValidator());
// middleware for using express session (to store if somebody is logged or not)
app.use(
  expressSession({ secret: "max", saveUninitialized: false, resave: false })
);
// to display React page as a static (when deployed, we have once again just 1 server, not 2, so express is serving also React)
app.use(express.static(path.join(__dirname, "client", "build")));

// to display image when the address is called
app.use("/uploads", express.static("uploads"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

// if we add different path, we will get the React page
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// sometimes can cause problem - make it more impossible for debugging!!!!!

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500).send("somethingBroken");
// });

module.exports = app;
