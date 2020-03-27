const flash = require("connect-flash");
const i18n = require('i18n');
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require('passport');
const LocalStrategy = require('passport-local');


const User = require("./models/user")
const middleware = require("./utils/middleware");
const userController = require("./controllers/user");
const adminController = require("./controllers/admin");
const shopController = require("./controllers/shop");

i18n.configure({
    locales:['en', 'ml'],
    directory: __dirname + '/locales',
    defaultLocale: 'ml',
    register: global,
});

mongoose.connect("mongodb://localhost/quacomo")
    .then(() => console.log("Connected to MongoDB."))
    .catch(err => console.error("Could not connect to MongoDB."));

const app = express();


app.set('view engine', 'ejs');
app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));
app.use('/en', express.static(__dirname + '/views'));
app.use('/ml', express.static(__dirname + '/views'));
app.use(i18n.init)
app.use(middleware.checkLang)

//passport configuration
app.use(session({
	secret: process.env.SESSIONSECRET || "node_app_quacomo_secret",
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
    var newLocale = i18n.getLocale() === 'en' ? 'ml' : 'en';
    i18n.setLocale(newLocale);
    res.send("This is working just fine");
});

userController(app);
adminController(app);
shopController(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("listening to port", PORT);
});