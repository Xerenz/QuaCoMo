const Shop = require("../models/shop");
const User = require("../models/user");
const bodyParser = require("body-parser");
const middleware = require("../utils/middleware");

var urlencodedParser = bodyParser.urlencoded({ extended: false });
var isLoggedIn = middleware.isLoggedIn;

module.exports = function(app) {

    app.get("/shops", isLoggedIn, function(req, res) {
        User.findById(req.user.id, user => {
            res.render("shopOwner", {user : user});
        });
    });

    app.get("/shops/new", isLoggedIn, function(req, res) {
        res.render("addShop");
    });

    app.post("/shops/new", 
        urlencodedParser, 
        isLoggedIn,
        function(req, res) {
        let shop = new Shop({
            name : req.body.name,
            state : req.body.state,
            district : req.body.district,
            locality : req.body.locality,
            phone : req.body.phone,
            landmark : req.body.landmark,
            isOpen : true,
            items : req.body.items,
            owner : req.user.id  
        });

        shop.save(err => {
            if (err)
                return console.log(err); 
            console.log("Shop added to db");

            return res.redirect("/shop");
        });
    });

    app.post("/shop/:id/update",
    urlencodedParser, 
    function(req, res) {
        // add items to the array
        // delete items to the array
        // toggle isOpen

        if (req.body.toggle == "true")
            var toggle = true;
        else
            var toggle = false;

        console.log(item);

        Shop.findByIdAndUpdate(req.params.id, {
            $set : {isOpen : toggle, items : items}
        }, shop => {
            console.log("items updated");

            return res.redirect("/shop");
        });
    });
}