const models = require('../models');
const config = require('../config/config');
const { validationResult } = require('express-validator');

module.exports = {
    get: {
        create: (req, res, next) => {

            const hbsObject = {
                pageTitle: 'Home Page',
                isLoggedIn: req.cookies[config.cookie] !== undefined,
                username: req.user.username
            };
            res.render('createArticlePage.hbs', hbsObject);
        },

        details: (req, res, next) => {

            const { articleId } = req.params;

            models.Article.findById(articleId).then((article) => {

                const hbsObject = {
                    article,
                    pageTitle: 'Article Details',
                    isCreator: req.user.id.toString() === article.creator.toString(),
                    isLoggedIn: req.cookies[config.cookie] !== undefined
                };
                res.render('articlePage.hbs', hbsObject);
            }).catch(console.log);
        },

        edit: (req, res, next) => {
            const { articleId } = req.params;

            models.Article.findById(articleId).then((article) => {
                const hbsObject = {
                    article,
                    isLoggedIn: req.cookies[config.cookie] !== undefined
                };

                res.render('editArticlePage.hbs', hbsObject);
            })
        },

        delete: (req, res, next) => {
            const { articleId } = req.params;

            models.Article.findByIdAndRemove(articleId).then((removedArticle) => {
                res.redirect('/home/');
            });
        }
    },

    post: {
        create: (req, res, next) => {
            console.log(req.user);

            const { title, description } = req.body;
            const createdAt = new Date();

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render('createArticlePage.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body
                })
            }

            models.Article.create({ title, description, createdAt, creator: req.user.id }).then((createdArticle) => {
                res.redirect('/home/');
            })
        },

        edit: (req, res, next) => {

            const { articleId } = req.params;
            const { title, description } = req.body;

            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.render('createArticlePage.hbs', {
                    message: errors.array()[0].msg,
                    oldInput: req.body
                })
            }

            models.Article.findByIdAndUpdate(articleId, { title, description }).then((updatedArticle) => {
                res.redirect(`/article/details/${articleId}`);
            });
        }
    }
};