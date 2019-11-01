const { expenseModel, userModel } = require('../models/index');
const { handleError } = require('../utils/index');

function getCreate(req, res, next) {
    const user = req.user;

    res.render('expense/create', { user });
}

async function createExpense(req, res, next) {
    const user = req.user;
    const { merchant, total, category, description, report } = req.body;

    const newExpense = {
        merchant,
        total,
        category,
        description,
        report
    };

    try {
        const expense = await expenseModel.create(newExpense);
        await userModel.updateOne({ _id: user._id }, { $push: { createExpense: expense._id } });

        res.redirect('/');
    } catch (e) {
        e.code === 11000 ? handleError(res, 'merchant', 'merchant is already taken!') : handleError(res, e);

        const isChecked = report === 'on';
        res.render('expense/create', { merchant, total, category, description, report: isChecked.convertToTrue});
    }
}

async function refill(req, res, next){
    const user = req.user;
    const {amount} = req.body;
}

async function getReport(req,res,next){
    res.render('expense/report');
}

module.exports = {
    getCreate,
    createExpense,
    getReport
};