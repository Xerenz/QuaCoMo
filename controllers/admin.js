const Shop = require("../models/shop");
const User = require("../models/user");
const Report = require("../models/request");

const bodyParser = require("body-parser");
const middleware = require("../utils/middleware");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    app.get("/admin/",
    middleware.hasAdminPrivelages, 
     function (req, res) {
        User.find()
        .populate('shops')
        .exec(function(err, users) {

            Shop.find({}, (err, shops) => {
            console.log(users);
            console.log(shops);

            res.render("admin", {
                message : false, 
                userCount : users.length, 
                shopCount : shops.length});

            })
        });
    });

    app.get("/admin/data", middleware.hasAdminPrivelages, function (req, res) {
        
        User.find()
        .populate('shops')
        .exec(function(err, users) {

            Shop.find({}, (err, shops) => {
            console.log(users);
            console.log(shops);

            var shopCount = shops.length;
            var userCount = users.length;
            
            res.json({users: users, shops: shops, shopCount: shopCount, userCount: userCount});
            // res.render("users", {users: users, shops: shops, shopCount: shopCount, userCount: userCount})

            })
        });
    });

    app.get("/admin/users", 
   middleware.hasAdminPrivelages,
    (req, res) => {
        User.find({})
        .exec((err, users) => {
            if (err) {
                console.log(err);
                return res.redirect("/admin");
            }

            res.render("userReg", {data : users, message : false});
        });
    });

    app.get("/admin/shops", 
    middleware.hasAdminPrivelages,
    (req, res) => {
        Shop.find({}).populate("owner")
        .exec((err, shops) => {
            if (err) {
                console.log(err);
                return res.redirect("/admin");
            }

            res.render("shopReg", {data : shops, message : false});
        });
    });

    app.get("/admin/reports", 
    middleware.hasAdminPrivelages,
    (req, res) => {
        Report.find({}, (err, reports) => {
            if (err) {
                console.log(err);
                return res.redirect("/admin");
            }

            // res.render("showReg", {data : reports});
            res.render("reports", {data : reports});
        });
    });
}