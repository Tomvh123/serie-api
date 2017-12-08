const assert = require('assert');
const Serie = require('../model/serie');
const Character = require('../model/characters');
const Actor = require('../model/actors');

describe('Creating serie records', () => {
    it('saves a serie', (done) => {
        const serie = new Serie({ name: 'Test', start: '2015-05-05', description: 'description' });

        serie.save()
            .then(() => {

                assert(!serie.isNew);
                done();
            });
    });
});

describe('Creating character records', () => {
    it('saves a character', (done) => {
        const character = new Character({ name: 'Arrow', start: '2015-05-05', description: 'description' });
        character.save()
            .then(() => {

                assert(!character.isNew);
                done();
            });
    });
});

describe('Creating actor records', () => {
    it('saves a actor', (done) => {
        const actor = new Actor({ name: 'testActor', start: '2015-05-05', description: 'description' });
        actor.save()
            .then(() => {

                assert(!actor.isNew);
                done();
            });
    });
});