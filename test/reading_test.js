const assert = require('assert');
const Serie = require('../model/serie');
const Character = require('../model/characters');
const Actor = require('../model/actors');

describe('Reading series out of the database', () => {
    let serie;

    beforeEach((done) => {
        serie = new Serie({ name: 'Test', start: '2015-05-05', description: 'description' });
        serie.save()
            .then(() => done());

    });

    it('finds all series with a name of Arrow', (done) => {
        console.log(serie);
        Serie.find({ name: 'Test' })
            .then((series) => {console.log(series),
                assert(series[0]._id.toString() === serie._id.toString());
                done();
            });
    });

    it('find a serie with a particular id', (done) => {
        Serie.findOne({ _id: serie._id })
            .then((serie) => {
                assert(serie.name === 'Test');
                done();
            });
    });
});

describe('Reading characters out of the database', () => {
    let character;

    beforeEach((done) => {
        character = new Character({ name: 'Arrow', start: '2015-05-05', description: 'description' });
        character.save()
            .then(() => done());
    });

    it('finds all series with a name of Arrow', (done) => {
        Character.find({ name: 'Arrow' })
            .then((characters) => {
                assert(characters[0]._id.toString() === character._id.toString());
                done();
            });
    });

    it('find a serie with a particular id', (done) => {
        Character.findOne({ _id: character._id })
            .then((characters) => {
                assert(characters.name === 'Arrow');
                done();
            });
    });
});

describe('Reading characters out of the database', () => {
    let character;

    beforeEach((done) => {
        character = new Character({ name: 'Arrow', start: '2015-05-05', description: 'description' });
        character.save()
            .then(() => done());
    });

    it('finds all characers with a name of Arrow', (done) => {
        Character.find({ name: 'Arrow' })
            .then((characters) => {
                assert(characters[0]._id.toString() === character._id.toString());
                done();
            });
    });

    it('find a character with a particular id', (done) => {
        Character.findOne({ _id: character._id })
            .then((characters) => {
                assert(characters.name === 'Arrow');
                done();
            });
    });
});

describe('Reading actors out of the database', () => {
    let actor;

    beforeEach((done) => {
        actor = new Actor({ name: 'Arrow', start: '2015-05-05', description: 'description' });
        actor.save()
            .then(() => done());
    });

    it('finds all series with a name of Arrow', (done) => {
        Actor.find({ name: 'Arrow' })
            .then((actors) => {
                assert(actors[0]._id.toString() === actor._id.toString());
                done();
            });
    });

    it('find a serie with a particular id', (done) => {
        Actor.findOne({ _id: actor._id })
            .then((actors) => {
                assert(actors.name === 'Arrow');
                done();
            });
    });
});
