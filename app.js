const flash = require("connect-flash");
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require("./models/user")
const userController = require("./controllers/user");
const adminController = require("./controllers/admin");
const shopController = require("./controllers/shop");


mongoose.connect("mongodb://localhost/quacomo")
    .then(() => console.log("Connected to MongoDB."))
    .catch(err => console.error("Could not connect to MongoDB."));

const app = express();


app.set('view engine', 'ejs');
app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));


//passport configuration
app.use(session({
	secret: process.env.SESSIONSECRET || "node_app_chatbot_secret",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass currentUser to all routes
app.use((req, res, next) => {
	res.locals.currentUser = req.user; // req.user is an authenticated user
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});



app.get("/", function (req, res) {
    res.send("This is working just fine");
});

userController(app);
adminController(app);
shopController(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("listening to port", PORT);
});