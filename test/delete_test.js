const assert = require('assert');
const Serie = require('../model/serie');
const Character = require('../model/characters');
const Actor = require('../model/actors');

describe('Deleting a serie', () => {
    let serie;

    beforeEach((done) => {
        serie = new Serie({ name: 'Test', start: '2015-05-05', description: 'description' });
        serie.save()
            .then(() => done());
    });

    it('Serie findByIdAndRemove', (done) => {
        Serie.findByIdAndRemove(serie._id)
            .then(() => Serie.findOne({ name: 'Test' }))
            .then((serie) => {
                assert(serie === null);
                done();
            });
    });
});

describe('Deleting a character', () => {
    let character;

    beforeEach((done) => {
        character = new Character({ name: 'Test', start: '2015-05-05', description: 'description' });
        character.save()
            .then(() => done());
    });

    it('Serie findByIdAndRemove', (done) => {
        Character.findByIdAndRemove(character._id)
            .then(() => Character.findOne({ name: 'Test' }))
            .then((character) => {
                assert(character === null);
                done();
            });
    });
});

describe('Deleting a actor', () => {
    let actor;

    beforeEach((done) => {
        actor = new Actor({ name: 'Test', start: '2015-05-05', description: 'description' });
        actor.save()
            .then(() => done());
    });

    it('Serie findByIdAndRemove', (done) => {
        Actor.findByIdAndRemove(actor._id)
            .then(() => Actor.findOne({ name: 'Test' }))
            .then((actor) => {
                assert(actor === null);
                done();
            });
    });
});