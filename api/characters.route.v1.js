const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const characters = require('../model/characters');
const mongoose = require('mongoose');


routes.get('/characters', function(req, res) {
    res.contentType('application/json');
    characters.find({})
        .then((characters) => {
            res.status(200).send(characters);
        })
        .catch((error) => res.status(400).json(error));
});

routes.get('/characters/:id', function(req, res) {
    res.contentType('application/json');
    const id = req.param('id');

    characters.findById({_id: id})
        .then((characters) => {
            res.status(200).send(characters);
        })
        .catch((error) => res.status(400).json(error));
});

routes.post('/characters', function(req, res) {
    const actorsProps = req.body;

    characters.create(actorsProps)
        .then((characters) => {
            res.status(200).send(characters)
        })
        .catch((error) => res.status(400).json(error))
});


routes.put('/characters/:id', function(req, res) {
    res.contentType('application/json');
    const characterId = req.params.id;
    const characterProps = req.body;
    console.log(characterProps)

    characters.findByIdAndUpdate({_id: characterId}, characterProps)
        .then(()=> characters.findById({_id: characterId}))
        .then(characters => res.send(characters))
        .catch((error) => res.status(400).json(error))

});

module.exports = routes;