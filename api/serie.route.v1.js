const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const series = require('../model/serie');
const mongoose = require('mongoose');
const Actor = require('../model/actors');



routes.get('/series', function(req, res) {
    res.contentType('application/json');
    series.find({})
        .populate({
            path: 'characters',
            populate: {
                path: 'actors',
                model: 'actor'}
        })
        .populate('creators')
        .then((series) => {
        console.log(series[0].characters[0]);
            res.status(200).send(series);
        })
        .catch((error) => res.status(400).json(error));
});

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

routes.post('/series', function(req, res) {
    const seriesProps = req.body;
    
    series.create(seriesProps)
        .then((series) => {
            res.status(200).send(series)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/series/:id', function(req, res) {
    res.contentType('application/json');
    const serieId = req.params.id;
    const serieProps = req.body;
    series.findByIdAndUpdate({_id: serieId}, serieProps)
        .then(()=> series.findById({_id: serieId}))
        .then(serie => res.send(serie))
        .catch((error) => res.status(400).json(error))

});

routes.delete('/series/:id', function(req, res) {
    const id = req.param('id');
    series.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
        .catch((error) => res.status(400).json(error))
});


module.exports = routes;