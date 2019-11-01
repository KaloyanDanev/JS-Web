const routers = require('../routers');

module.exports = (app) => {
    app.use('/home', routers.home);

    app.use('/user', routers.user);

    app.use('/course', routers.course);

    app.use('*', (req,res,next) => {
        res.send('<title>Invalid Page</title><h1>Invalid Page</h1>')
    })
};