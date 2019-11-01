const { expenseModel } = require('../models/index');

 async function getHome(req, res, next) {
    const user = req.user;
    const expenses = req.expenses;
        res.render('index', {user} , expenses);
    }

    module.exports = {
        getHome
    };