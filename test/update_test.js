const assert = require('assert');
const Serie = require('../model/serie');
const Actor = require('../model/actors');
const Character = require('../model/characters');

describe('Updating records', () => {
    let serie;

    beforeEach((done) => {
        serie = new Serie({ name: 'Test', start: '2015-05-05', description: 'description' });
        serie.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => Serie.find({}))
            .then((series) => {
                assert(series.length === 1);
                assert(series[0].name === 'Test1');
                done();
            });
    }
    
    it('A model class can find a record with an Id and update', (done) => {
        console.log();
        assertName(
            Serie.findByIdAndUpdate(serie._id, { name: 'Test1' }),
            done
        );
    });

});

describe('Updating records', () => {
    let character;

    beforeEach((done) => {
        character = new Character({ name: 'Test', start: '2015-05-05', description: 'description' });
        character.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => Character.find({}))
            .then((character) => {
                assert(character.length === 1);
                assert(character[0].name === 'Test1');
                done();
            });
    }

    it('A model class can find a record with an Id and update', (done) => {
        console.log();
        assertName(
            Character.findByIdAndUpdate(character._id, { name: 'Test1' }),
            done
        );
    });

});

describe('Updating records actors', () => {
    let actor;

    beforeEach((done) => {
        actor = new Actor({ name: 'Test', start: '2015-05-05', description: 'description' });
        actor.save()
            .then(() => done());
    });

    function assertName(operation, done) {
        operation
            .then(() => Actor.find({}))
            .then((actor) => {
                assert(actor.length === 1);
                assert(actor[0].name === 'Test1');
                done();
            });
    }

    it('A model class can find a record with an Id and update', (done) => {
        console.log();
        assertName(
            Actor.findByIdAndUpdate(actor._id, { name: 'Test1' }),
            done
        );
    });

});