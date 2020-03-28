const i18n = require('i18n');

module.exports = function (app) {

    app.get("/malayalam", function (req, res) {
        console.log(req.cookies.lang);
        res.cookie("lang", 'ml');
        let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/shops/new'; //TODO
        delete req.session.redirectTo;
        res.redirect(redirectTo);
    });

    app.get("/english", function (req, res) {
        console.log(req.cookies.lang);
        res.cookie("lang", 'en');
        let redirectTo = req.session.redirectTo ? req.session.redirectTo : '/shops/new'; //TODO
        delete req.session.redirectTo;
        res.redirect(redirectTo);
    });


    app.get("/changeLanguage", function (req, res) {
        var newLocale = i18n.getLocale() === 'en' ? 'ml' : 'en';
        i18n.setLocale(newLocale);
        res.send("This is working just fine");
    });
}