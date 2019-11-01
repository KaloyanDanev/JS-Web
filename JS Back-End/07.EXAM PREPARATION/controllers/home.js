const config = require('../config/config');
const models = require('../models');

module.exports = {
    get: {
        home: (req, res, next) => {

            models.Article.find().then((articles) => {

                const hbsObject = {
                    pageTitle: 'Home Page',
                    isLoggedIn: req.cookies[config.cookie] !== undefined,
                    articles
                };

                res.render('homePage.hbs', hbsObject);
            })

        }
    },
};