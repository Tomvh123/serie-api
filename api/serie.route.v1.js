const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const series = require('../model/serie');
const mongoose = require('mongoose');
const Actor = require('../model/actors');
const driver = require('../config/neo');



routes.get('/seriesrel/:genre', function(req, res) {
    res.contentType('application/json');
    const genre = req.param('genre');
    console.log(genre)
    var session = driver.session();

    session
        .run("MATCH (n)-[:has_genre]->(:Genre {genre: {genreParam}}) return n", {genreParam: genre})
        .then(function(result) {
            var serieArr = [];
             console.log(result.records[0]._fields[0].properties.name);
            result.records.forEach(function (record) {
               serieArr.push({
                  _id : record._fields[0].properties.id,
                   name: record._fields[0].properties.name,
                   imagePath: record._fields[0].properties.imagePath
               });
            });
            res.status(200).send(serieArr);

            session.close();
        });

});

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
    //
    var session = driver.session();
    //

    series.create(seriesProps)
        .then((series) => {

            var name = series.name;
            var id = series._id.toString();
            var imagePath = series.imagePath;
            var genre = series.genre;
            session
                .run("MATCH (g:Genre {genre: {genreParam}})" +
                    " CREATE(n:Serie {name: {nameParam}, id: {idParam}, imagePath: {imagePathParam}})-[:has_genre]->(g)", {genreParam: genre, nameParam: name, idParam: id, imagePathParam: imagePath }).then(function () {
                console.log('done neo');
                session.close();

            }).catch((error) => console.log(error));
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
        .then((serie) => {
            var session = driver.session();
            var name = serie.name;
            var genre = serie.genre;
            console.log(name);
            console.log(genre);
            session
                .run("MATCH (n:Serie {name: {nameParam}})-[rel:has_genre]->(), (m:Genre {genre: {genreParam}}) DELETE rel CREATE (n)-[:has_genre]->(m)", {nameParam: name, genreParam: genre})
                .then(function () {
                    console.log('done neo');
                    session.close();
                }).catch((error) => console.log(error));
            res.send(serie)
        })
        .catch((error) => res.status(400).json(error))

});

routes.delete('/series/:id', function(req, res) {
    const id = req.param('id');
    var session = driver.session();
    session
        .run("MATCH (n:Serie {id: {idParam}}) DETACH DELETE n", {idParam:  id})
        .then(function () {
            session.close();
        });

    series.findByIdAndRemove(id)
        .then((status) => res.status(200).send(status))
        .catch((error) => res.status(400).json(error))
});


module.exports = routes;