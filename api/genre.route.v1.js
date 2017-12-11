const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const series = require('../model/serie');
const mongoose = require('mongoose');
const Actor = require('../model/actors');
const driver = require('../config/neo');

routes.get('/series/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    series.findOne({_id: id})
        .populate({
            path: 'characters',
            populate: {
                path: 'actors',
                model: 'actor'}
        })
        .populate('creators')
        .then((series) => {
            res.status(200).send(series);
        })
        .catch((error) => res.status(400).json(error));
});