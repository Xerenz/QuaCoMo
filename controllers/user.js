const User = require('../models/user');
const Report = require("../models/request");

const passport = require("passport");
const bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const async = require("async");
const crypto = require("crypto");

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var error = false;

module.exports = function (app) {

    app.get("/login", function (req, res) {
        res.render("login", {error: error});
        error = false;
    });

    // login logic: app.post("/login", middleware, callback)
    app.post("/login", urlencodedParser, (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("error", "Invalid username or password");
                error = "Invalid username or password";
                return res.redirect('/login');
            }
            req.logIn(user, err => {
                if (err) { return next(err); }
                let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/shops/'; //TODO
                delete req.session.redirectTo;
                req.flash("success", "Good to see you again, " + user.username);
                res.redirect(redirectTo);
            });
        })(req, res, next);
    });

    // logout route
    app.get("/logout", (req, res) => {
        req.logout();
        req.flash("success", "Logged out seccessfully. Look forward to seeing you again!");
        res.redirect("/login");
    });


    app.get("/register", function (req, res) {
        // i18n.setLocale('en')
        console.log(res.__('name'));
        res.render("register", {error: error});
        error = false;
    });


    app.post("/register", urlencodedParser, (req, res, next) => {
        console.log('in the route')
        console.log(req.body);

        let newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email : req.body.email,
            aadhar: req.body.aadhar,
            isAdmin: false,
        });

        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                if (err.name === 'UserExistsError') {
                    // Duplicate email
                    console.log("error", "That phone has already been registered.");
                    error = "A user with that Phone number already exists."
                    return res.redirect("/register");
                }
                // Some other error
                req.flash("error", "Something went wrong...");
                console.log("error", err);
                error = err.message;
                return res.redirect("/register");
            }
            console.log('status: ', req.isAuthenticated());
            passport.authenticate("local", function (err, user, info) {
                console.log(err, user, info);
                if (err) {
                    console.log(err);
                    return next(err);
                }
                if (!user) return res.redirect('/login');

                req.logIn(user, function (err) {
                    if (err) return next(err);
                    return res.redirect("/shops/");
                });

            })(req, res, next);
        });
    });

    app.get("/forgot", function(req, res) {
        res.render("forgot", {message: false});
    })
    
    app.post('/forgot', 
    urlencodedParser,
    function(req, res, next) {
        async.waterfall([
          function(done) {
              console.log("first func");
            crypto.randomBytes(20, function(err, buf) {
                if (err)
                    console.log(err);
                console.log(buf);
              var token = buf.toString('hex');
              console.log(token);
              done(err, token);
            });
          },
          function(token, done) {
            console.log("second function fired");
            User.findOne({ email: req.body.email }, function(err, user) {
                if (err) console.log("second was the error");
              if (!user) {
                return res.render('forgot', { message : 'No account with that email address exists.'});
                // return res.redirect('/forgot');
              }
              console.log(token);
              user.resetPasswordToken = token;
              user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      
              user.save(function(err) {
                done(err, token, user);
              });
            });
          },
          function(token, user, done) {
            var smtpTransport = nodemailer.createTransport({
              service: 'Gmail', 
              auth: {
                user: 'quacomo.mail@gmail.com',
                pass: 'QuarantineCommodityModule'
              }
            });
            var mailOptions = {
              to: user.email,
              from: '<Sahayahastham> quacomo.mail@gmail.com',
              subject: 'Password Reset',
              text: 'You are receiving this because you have requested the reset of the password for your account.\n\n' +
                'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                'http://' + req.headers.host + '/reset/' + token + '\n\n' +
                'If you did not request this, please ignore this email and your password will remain unchanged.\n\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
              console.log('mail sent');
              res.render("forgot",{message:"A Password reset link has been sent to your email"});
              done(err, 'done');
            });
          }
        ], function(err) {
            console.log("No idea why");
          if (err) {        
            console.log(err);
            return next(err);
          }
          res.render('forgot', {message : "A password reset link has been sent. Please check your mail"});
        });
    });
      
    app.get('/reset/:token', function(req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
          if (err) {
            return console.log(err);
          }
            if (!user) {
                console.log('error', 'Password reset link is invalid or has expired.');
                res.render('reset', {token : req.params.token ,message : 'Password reset link is invalid or has expired.'});
            }
            else {
              console.log("clean chit");
                res.render('reset', {token: req.params.token, message : false});
            }
        });
    });
    
    app.post('/reset/:token', 
    urlencodedParser, 
    function(req, res) {
        async.waterfall([
          function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
              if (!user) {
                res.render('forgot', {message : 'Password reset link is invalid or has expired.' });                
              }
              if(req.body.password === req.body.confirm) {
                console.log("password confirmed!");
                user.setPassword(req.body.password, function(err) {
                  user.resetPasswordToken = undefined;
                  user.resetPasswordExpires = undefined;
      
                  user.save(function(err) {
                    req.logIn(user, function(err) {
                      done(err, user);
                    });
                  });
                })
              } else {
                  res.render("reset", {token : req.params.token, message : "Passwords do not match."});
              }
            });
          },
          function(user, done) {
            var smtpTransport = nodemailer.createTransport({
              service: 'Gmail', 
              auth: {
                user: 'quacomo.mail@gmail.com',
                pass: 'QuarantineCommodityModule'
              }
            });
            var mailOptions = {
              to: user.username,
              from: '<Sahayahastham> quacomo.mail@mail.com',
              subject: 'Your password has been changed',
              text: 'Hello,\n\n' +
                'This is a confirmation that the password for your account ' + user.username + ' has just been changed.\n'
            };
            smtpTransport.sendMail(mailOptions, function(err) {
              req.flash('success', 'Success! Your password has been changed.');
              done(err);
            });
          }
        ], function(err) {
          res.redirect('/login');
        });
    });
        

}