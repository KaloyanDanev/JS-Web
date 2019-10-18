const homeHandler = require('./home');
const staticFilesController = require('./static-files');
const catHandler = require('./cat');

module.exports = [
    homeHandler,
    staticFilesController,
    catHandler
];