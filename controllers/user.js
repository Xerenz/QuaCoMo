const User = require('../models/user');
const passport = require("passport");
const bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function (app) {

    app.get("/login", function (req, res) {
        res.render("login");
    });

    // login logic: app.post("/login", middleware, callback)
    app.post("/login", urlencodedParser, (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) { return next(err); }
            if (!user) {
                req.flash("error", "Invalid username or password");
                return res.redirect('/login');
            }
            req.logIn(user, err => {
                if (err) { return next(err); }
                let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/questions';
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
        res.redirect("/");
    });


    app.get("/register", function (req, res) {
        res.render("register");
    });


    app.post("/register", urlencodedParser, (req, res) => {
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            school: req.body.school, 
        });

        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate email
                    req.flash("error", "That email has already been registered.");
                    return res.redirect("/register");
                }
                // Some other error
                req.flash("error", "Something went wrong...");
                return res.redirect("/register");
            }

            passport.authenticate("local")(req, res, () => {
                req.flash("success", "Welcome to Chatbot " + user.username);
                console.log("New user created: " + user.username);
                res.redirect("/questions");
            });
        });
    });

}