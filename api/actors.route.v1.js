const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const actors = require('../model/actors');
const mongoose = require('mongoose');

routes.get('/actors', function(req, res) {
    res.contentType('application/json');
    actors.find({})
        .then((actors) => {
            res.status(200).send(actors);
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/actors/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');
    console.log(id);
    actors.find({_id: id})
        .then((actors) => {
            res.status(200).send(actors);
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/actors', function(req, res) {
    const actorsProps = req.body;

    series.create(actorsProps)
        .then((actors) => {
            res.status(200).send(actors)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/actors/:id', function(req, res) {
    res.contentType('application/json');
    const actorId = req.params.id;
    const actorProps = req.body;

    actors.findByIdAndUpdate({_id: actorId}, actorProps)
        .then(()=> actors.findById({_id: actorId}))
        .then(actors => res.send(actors))
        .catch((error) => res.status(400).json(error))

});

routes.delete('/actors/:id', function(req, res) {
    const id = req.param('id');
    actors.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
        .catch((error) => res.status(400).json(error))
});


module.exports = routes;