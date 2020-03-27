const User = require("../models/user.model");

// all middleware goes here
const middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.redirectTo = req.originalUrl;
  req.flash("error", "You need to be logged in first"); // add a one-time message before redirect
  res.redirect("/login");
};

module.exports = middlewareObj;