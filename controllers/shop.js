const Shop = require("../models/shop");
const User = require("../models/user");
const bodyParser = require("body-parser");
const middleware = require("../utils/middleware");
const data = require("../utils/data");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var isLoggedIn = middleware.isLoggedIn;

var items = [];
data.commodities.forEach(function(item) {
    items.push([item.split(' - ')[0], item])
})

module.exports = function (app) {


    app.get('/home',(req,res)=>{
        console.log(items)
        res.render("home", {items: items});
    })

    app.get("/shops", isLoggedIn, function (req, res) {
        User.findById(req.user.id).populate('shops').exec((err,user) => {
            res.render("shopOwner", { user: user });
            console.log(user)
            
        });
    });

    app.get("/shops/new", isLoggedIn, function (req, res) {
        res.render("addShop", {items: items});
    });

    app.post("/shops/new",
        urlencodedParser,
        isLoggedIn,
        function (req, res) {
            let shop = new Shop({
                name: req.body.name,
                state: "Kerala",
                district: "Thiruvananthapuram",
                locality: req.body.locality,
                phone: req.body.phone,
                pincode: req.body.pincode,
                location: req.body.location,
                address: req.body.address,
                isOpen: true,
                items: req.body.items,
                owner: req.user.id
            });

            User.findByIdAndUpdate(
                req.user.id,
                { $push: { "shops": shop._id } },
                { safe: true, upsert: true },
                function (err, user) {
                    if (err)
                        console.log(err);
                }
            )

            shop.save(err => {
                if (err)
                    return console.log(err);
                console.log("Shop added to db");

                return res.redirect("/shops");
            });
        });

    app.post("/shop/:id/update",
        urlencodedParser,
        function (req, res) {
            // add items to the array
            // delete items to the array
            // toggle isOpen

            if (req.body.toggle == "true")
                var toggle = true;
            else
                var toggle = false;

            console.log(item);

            Shop.findByIdAndUpdate(req.params.id, {
                $set: { isOpen: toggle, items: items }
            }, shop => {
                console.log("items updated");

                return res.redirect("/shop");
            });
        });
}