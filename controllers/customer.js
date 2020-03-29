const Shop = require("../models/shop");
const Report = require("../models/request");
const data = require("../utils/data");

const bodyParser = require("body-parser");

var urlencodedParser = bodyParser.urlencoded({extended : false});

module.exports = function(app) {

    app.get('/report',(req,res)=>{
        res.render('report', {
            items : data.commodities,
            localities : data.districtMap["Thiruvananthapuram"],
            message : false
        });
    });

    app.post("/report", urlencodedParser, (req, res) => {

        let report = new Report({
            name : req.body.name,
            phone : req.body.phone,
            district : "Thiruvananthapuram",
            locality : req.body.locality,
            state : "Kerala",
            items : req.body.items,
            description : req.body.description,
            ip_address : req.connection.remoteAddress,
            timestamp : Date()
        });

        report.save(err => {
            if (err)
                return console.log(err);
            console.log("request submited");

            return res.render('report', {
                    items : data.commodities,
                    localities : data.districtMap["Thiruvananthapuram"],
                    message : "Your report has been submitted. Thankyou"
                });
        });
    });
}