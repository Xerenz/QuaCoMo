const User = require("../models/user");
var i18n = require('i18n');

// all middleware goes here
const middlewareObj = {};

middlewareObj.isLoggedIn = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  req.session.redirectTo = req.headers.referer || req.originalUrl || req.url
  req.flash("error", "You need to be logged in first"); // add a one-time message before redirect
  res.redirect("/login");
};

middlewareObj.hasAdminPrivelages = function (req, res, next) {
  if (req.isAuthenticated()) {    
    if (req.user.isAdmin){
      return next()
    }
  }
  req.session.redirectTo = req.headers.referer || req.originalUrl || req.url
  req.flash("error", "You need admin privelages."); // add a one-time message before redirect
  res.redirect("/login");
};

middlewareObj.checkLang = function (req, res, next) {
  var lang = 'ml';
  if(req.cookies.lang) { lang = req.cookies.lang };
  res.setLocale(lang);
  next();
};



module.exports = middlewareObj;