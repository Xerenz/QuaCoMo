const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");


const userController = require("./controllers/user");
const shopController = require("./controllers/shop");


mongoose.connect("mongodb://localhost/quacomo")
    .then(() => console.log("Connected to MongoDB."))
    .catch(err => console.error("Could not connect to MongoDB."));

const app = express();


app.set('view engine', 'ejs');
app.use("/assets/css", express.static(__dirname + "/assets/css"));
app.use("/assets/img", express.static(__dirname + "/assets/img"));
app.use("/assets/js", express.static(__dirname + "/assets/js"));



app.get("/", function (req, res) {
    res.send("This is working just fine");
});

userController(app);
shopController(app);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
    console.log("listening to port", PORT);
});