const express = require('express');
const routes = express.Router();
const driver = require('../config/neo');


routes.get('/seriesrel/', function(req, res) {
    res.contentType('application/json');
    const genre = req.param('genre');
    console.log(genre)
    var session = driver.session();

    session
        .run("MATCH (n) return n")
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

routes.post('/seriesrel', function (req, res) {
    const seriesProps = req.body;
    //
    var session = driver.session();
    //

    var name = series.name;
    var id = series._id.toString();
    var imagePath = series.imagePath;
    var genre = series.genre;
    session
        .run("MATCH (g:Genre {genre: {genreParam}})" +
            " CREATE(n:Serie {name: {nameParam}, id: {idParam}, imagePath: {imagePathParam}})-[:has_genre]->(g)", {
            genreParam: genre,
            nameParam: name,
            idParam: id,
            imagePathParam: imagePath
        }).then(function () {
        console.log('done neo');
        session.close();

    }).catch((error) => console.log(error));
    res.status(200).send(series)

});
