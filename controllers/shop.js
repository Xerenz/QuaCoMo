const Shop = require("../models/shop");
const User = require("../models/user");
const bodyParser = require("body-parser");
const middleware = require("../utils/middleware");
const data = require("../utils/data");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var isLoggedIn = middleware.isLoggedIn;

var error = false;

module.exports = function (app) {


    app.get('/home', (req, res) => {
        res.render("home", { items: data.commodities , error: error});
    })

    app.post('/home', urlencodedParser, (req, res) => {
        var pincodes = data.pincode[req.body.pincode];
        if (!pincodes) {
            error = 'Entered pincode is not in the district selected. Please contact us that is not the case.';
            return res.redirect('/home');
        }

        // let query = [];
        // pincodes.forEach(pin => {
        // 	query.push({ pincode: pin })
        // });

        console.log(req.body)

        var queryText = {};
        if (typeof req.body.items !== 'undefined' && req.body.items.length > 0) {
            queryText = { "items": { $elemMatch: { "$in": req.body.items, "$exists": true } } };
        }
        console.log(queryText)
        Shop
            .find(queryText)
            .where("isOpen").equals(true)
            .where("pincode").in(pincodes)
            .exec((err, shops) => {
                console.log(err);
                if(err){
                    console.log(err);
                    error = err.message;
                    return res.redirect('/home');
                }
                // console.log(shops);
                if(shops.length == 0){
                    error = "There are no shops that match your query.";
                    return res.redirect('/home');
                }

                var coordinates = [];
                shops.forEach(shop => {
                    coordinates.push(shop.location+" ");
                });
                console.log(req.body.pincode, coordinates);
                res.render("result", {shops: shops, pincode: req.body.pincode, coordinates: coordinates})
            })
    })

    app.get("/shops", isLoggedIn, function (req, res) {
        User.findById(req.user.id).populate('shops').exec((err, user) => {
            res.render("shopOwner", { user: user });
        });
    });

    app.get("/shops/new", isLoggedIn, function (req, res) {
        res.render("addShop", { items: data.commodities });
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

            shop.save(err => {
                if (err)
                    return console.log(err);
                console.log("Shop added to db");

            });

            User.findByIdAndUpdate(
                req.user.id,
                { $push: { "shops": shop._id } },
                { safe: true, upsert: true },
                function (err, user) {
                    if (err)
                        console.log(err);

                    return res.redirect("/shops");

                }
            )

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
                res.render("editShop", { shop: shop, items: data.commodities });
            });
        });

    app.post("/shops/:id/edit",
        isLoggedIn,
        urlencodedParser,
        (req, res) => {
            Shop.findByIdAndUpdate(req.params.id,
                {
                    $set: {
                        name: req.body.name,
                        phone: req.body.phone,
                        items: req.body.items
                    }
                },
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