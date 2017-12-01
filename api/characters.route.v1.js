const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const characters = require('../model/characters');

routes.get('/characters', function (req, res) {
    res.contentType('application/json');
    res.status(200).json({
        character: 'test'
    })

});

module.exports = routes;