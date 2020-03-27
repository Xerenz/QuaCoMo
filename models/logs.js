const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LogSchema = new Schema(
    {
        // general info
        commodity : String,
        ward : String,
        punchayath : String,
        district : String,
        state : String,

        // user info
        ip_address : String,
        timestamp : String
    }
);

module.exports = mongoose.model("Logs", LogSchema);