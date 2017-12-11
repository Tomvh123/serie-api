const express = require('express');
const routes = express.Router();
const mongodb = require('../config/dbMongo');
const series = require('../model/serie');
const mongoose = require('mongoose');
const Actor = require('../model/actors');
const driver = require('../config/neo');

//neo example
/*var session = driver.session();
const personName = 'Hans';
const resultPromise = session.run(
    'CREATE (a:Person {name: $name}) RETURN a',
    {name: personName}
);

resultPromise.then(result => {
    session.close();

    const singleRecord = result.records[0];
    const node = singleRecord.get(0);

    console.log(node.properties.name);

    // on application exit:
    driver.close();
});*/
/*
routes.post('/seriesneo', function(req, res) {
    res.contentType('application/json');
    var session = driver.session();
    var name = req.body.name;
    var id = req.body._id;
    var imagePath = req.body.imagePath;
    var genre = req.body.genre;

    session
        .run("MATCH (g:Genre {genre: {genreParam}})" +
            " CREATE(n:Serie{name: {nameParam}, id: {idParam}, imagePath:{imagePathParam}})-[:has_genre]->(g)", {genreParam: genre, nameParam: name, idParam: id, imagePathParam: imagePath })
        .then(function (result) {
            res.status(200).send(result)
            session.close();
        })
        .catch(function (error) {
            console.log(error)
        });


});*/

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
                console.log('done neo')
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