const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ShopSchema = new Schema({
    name: String,
    location: String,
    state: String,
    district: String,
    locality: String,
    pincode: String,
    phone: String,
    address: String,
    isOpen: Boolean,
    items: [String],
    owner: { type: Schema.Types.ObjectId, ref: "User" },
})

module.exports = mongoose.model("Shop", ShopSchema);