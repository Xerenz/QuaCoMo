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
        res.render("home", {items: items});
    })

    app.get("/shops", isLoggedIn, function (req, res) {
        User.findById(req.user.id).populate('shops').exec((err,user) => {
            res.render("shopOwner", { user: user });
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

    app.get("/shops/:id/status",
        isLoggedIn,
        urlencodedParser,
        function (req, res) {
            // toggle isOpen
            Shop.findById(req.params.id, (err, shop) => {
                if (err)
                    return console.log(err);
                
                if (shop.isOpen) 
                    shop.isOpen = false;
                else 
                    shop.isOpen = true;

                shop.save(err => {
                    if (err)
                        return console.log(err)
                    console.log("update made");
                    
                    return res.redirect("/shops");
                });
            });
    }); 
    
    app.get("/shops/:id/edit", 
    isLoggedIn, 
    urlencodedParser,
    (req, res) => {
        Shop.findById(req.params.id, (err, shop) => {
            if (err)
                return console.log(err);
            res.render("editShop", {shop : shop});
        });
    });

    app.post("/shops/:id/edit", 
    isLoggedIn,
    urlencodedParser,
    (req, res) => {
        Shop.findByIdAndUpdate(req.params.id, 
            {$set : {
                name : req.body.name,
                phone : req.body.phone,
                items : req.body.items
            }},
            (err, shop) => {
                if (err)
                    return console.log(err);
                console.log("shop updated");

                return res.redirect("/shops");
            })
    });

    app.get("/shops/:id/delete", 
    isLoggedIn,
    (req, res) => {
        Shop.findByIdAndDelete(req.params.id, (err) => {
            if (err)
                return console.log(err);
            return res.redirect("/shops");
        });
    });
}