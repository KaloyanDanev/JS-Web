const { homeController, userController, expenseController } = require('../controllers/index');
const { auth } = require('../utils/index');


module.exports = (app) => {
    // Users
    app.get('/register', userController.getRegister);
    app.post('/register', userController.register);
    app.get('/login', userController.getLogin);
    app.post('/login', userController.login);
    app.get('/info',auth(), userController.getInfo);
    app.get('/logout', auth(), userController.logout);

    // Expenses
    app.get('/expense/create', auth(), expenseController.getCreate);
    app.post('/expense/create', auth(), expenseController.createExpense);
    app.get('/expense/report', auth(), expenseController.getReport);


    app.get('/', auth(false), homeController.getHome);
    app.get('/home', auth(false), homeController.getHome);


    app.all('*', auth(false), (req, res) => res.render('errors/404', { user: req.user }));
};