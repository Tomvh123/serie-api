/**
 * Created by tom on 30-11-2017.
 */
const mongoose = require('mongoose');
const config = require('./env/env');

mongoose.Promise = global.Promise;

mongoose.connect(config.dbURL);
var connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.dbURL))
    .on('error', (error) => {
        console.warn('Warning', error.toString());
    });

module.exports = connection;
