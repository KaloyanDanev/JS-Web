const config = require('./config');
const mongoose = require('mongoose');
const dbName= 'softuni-wiki';

module.exports = () => {
  return mongoose.connect(config.dbURL + dbName, { useNewUrlParser: true, useUnifiedTopology: true },
      console.log('***Database is READY!***'));
};