const Shop = require("../models/shop");
const User = require("../models/user");
const bodyParser = require("body-parser");
const middleware = require("../utils/middleware");

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

    app.get("/admin/", middleware.hasAdminPrivelages, function (req, res) {
        res.render("addShop");
    });

    app.get("/admin/users", middleware.hasAdminPrivelages, function (req, res) {
        
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


}