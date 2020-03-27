const Shop = require("../models/shop.js");
const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function(app) {

    app.get("/shops", function(req, res) {
        res.render("shopOwner");
    });

    app.get("/shops/new", function(req, res) {
        res.render("addShop");
    });

    app.post("/shops/new", function(req, res) {
        res.sendStatus(200);
    });

    function isLoggedIn(req, res, next) {
        if (!req.isAuthenticated())
            return res.redirect("/login");

        next();
    }
}