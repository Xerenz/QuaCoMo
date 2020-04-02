const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
    {
        // general info
        items : [String],
        description : String,
        locality : String,
        panchayath : String,
        district : String,
        state : String,
        pincode : String,

        // user info
        ip_address : String,
        name : String,
        phone : String,
        timestamp : String
    }
);

module.exports = mongoose.model("Requests", RequestSchema);