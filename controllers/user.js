const User = require('../models/user');
const Report = require("../models/request");

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
                let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/shops/new'; //TODO
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


    app.post("/register", urlencodedParser, (req, res, next) => {
        console.log('in the route')
        console.log(req.body);

        let newUser = new User({
            name: req.body.name,
            username: req.body.username,
            aadhar: req.body.aadhar,
            isAdmin: false,
        });

        User.register(newUser, req.body.password, (err, user) => {
            if (err) {
                if (err.name === 'MongoError' && err.code === 11000) {
                    // Duplicate email
                    console.log("error", "That email has already been registered.");
                    return res.redirect("/register");
                }
                // Some other error
                req.flash("error", "Something went wrong...");
                console.log("error", err);
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
                    return res.redirect("/shops/new");
                });

            })(req, res, next);
        });
    });

    app.get('/home',(req,res)=>{
        res.render("home")
    })

    app.get('/report',(req,res)=>{
        res.render('report')
    })

    app.post("/report", urlencodedParser, (req, res) => {

        let report = new Report({
            name : req.body.name,
            phone : req.body.phone,
            district : req.body.district,
            panchayath : req.body.panchayath,
            locality : req.body.locality,
            state : "Kerala",
            items : req.body.items,
            description : req.body.description,
            ip_address : req.connection.remoteAddress,
            timestamp : Date()
        });

        report.save(err => {
            if (err)
                return console.log(err);
            console.log("request submited");

            return res.redirect("/home");
        });
    });

}