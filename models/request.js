const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema(
    {
        // general info
        commodity : String,
        description : String,
        ward : String,
        punchayath : String,
        district : String,
        state : String,

        // user info
        ip_address : String,
        name : String,
        phone : String,
        timestamp : String
    }
);

module.exports = mongoose.model("Requests", RequestSchema);