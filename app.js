const express = require("express");
const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/quacomo");

const app = express();

app.get("/", function(req, res) {
    res.send("This is working just fine");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, function() {
    console.log("listening to port", PORT);
});