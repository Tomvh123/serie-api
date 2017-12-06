const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const CharacterSchema = require('./characters');
const Actor = require('./actors');
const Creator = require('./creators');
const Character = require('./characters');

const SerieSchema = new Schema({
   name: {
       type: String,
       required: true
   } ,
    description: {
        type: String,
        required: true
    },
    imagePath: String,
    characters: [{
       type: Schema.Types.ObjectId,
        ref: 'character'
    }

    ],
    creators: [{
       type: Schema.Types.ObjectId,
        ref: 'creator'}],
    genre: [],
    start: {
       type: Date,
        required: true
    },
    seasons: Number,
    episodes: Number,
    language: String,




});


const Serie = mongoose.model('serie', SerieSchema);


Serie.count({}, function (err, count) {
    if(count < 1) {
        console.log('serie toevoegen...')

        const serie = new Serie({
            name: 'Arrow',
            description:'Spoiled billionaire playboy Oliver Queen ' +
            'is missing and presumed dead when his yacht is lost at sea. ' +
            'He returns five years later a changed man,' +
            'determined to clean up the city as a hooded vigilante armed with a bow.',
            imagePath: 'https://d2kmm3vx031a1h.cloudfront.net/FOovdnm5RpayhDQrcMQk_p14238959_b_v8_ab.jpg',
            characters: [],

            creators: [],
            genre: ['action', 'drama' ],
            start: '2010-05-03',
            seasons: 6,
            episodes: 102,
            language: 'English'



        });
        const serie2 = new Serie({
            name: 'The Flash',
            description:'After being struck by lightning, Barry Allen wakes up from his coma to discover ' +
            'hes been given the power of super speed, ' +
            'becoming the Flash, fighting crime in Central City.',
            imagePath: 'https://www.bleedingcool.com/wp-content/uploads/2017/09/Flash.png',
            characters: [],

            creators: [],
            genre: ['action', 'drama' ],
            start: '2010-05-03',
            seasons: 4,
            episodes: 54,
            language: 'English'

        });

        const creator = new Creator({
            name: 'Greg Berlanti' ,
            description: 'Some guy fdasssssssssssssssssssssssssssssssssfeafeasssssssssssssfdsafsdfsdfsdf',
            imagePath: 'https://nl.wikipedia.org/wiki/Greg_Berlanti#/media/File:Greg_Berlanti_cropped.jpg',
            birthDate: '1950-06-04'
        });
        const actor = new Actor({

            name: 'Stephen Amell ' ,
            description: 'Actor of Arrow',
            imagePath: 'https://i0.wp.com/www.uselessdaily.com/wp-content/uploads/2016/03/stephen-amell.jpg?resize=1000%2C1000&ssl=1',
            birthDate: '1950-06-04'
        });

        const actor2 = new Actor({

            name: 'Grant Gustin',
            description: 'Actor of The Flash',
            imagePath: 'https://pbs.twimg.com/profile_images/620809351284953088/C3njH0Gs.png',
            birthDate: '1950-06-04'
        });

        const character = new Character({
            name: 'The Green Arrow',
            description: 'Hes green and has a bow and arrow',
            imagePath: 'http://assets1.ignimgs.com/2015/09/02/arrow1280jpg-9f7a32_1280w.jpg',
            actors: [],
            birthDate: '1950-06-04'
        });

        const character2 = new Character({
            name: 'The Flash',
            description: 'Hes the fastest man alive',
            imagePath: 'http://s2.thingpic.com/images/Aq/hhqykKkb7A3W9Lsa1Sb6rmJv.png',
            actors: [],
            birthDate: '1950-06-04'
        });
       /* serie.characters[0].actors.push(actor);
        serie.characters[1].actors.push(actor2);

        serie2.characters[0].actors.push(actor2);
        serie2.characters[1].actors.push(actor);
        serie.creators.push(creator);
        serie2.creators.push(creator);*/

        character.actors.push(actor);
        character.actors.push(actor2);
        character2.actors.push(actor2);
        character2.actors.push(actor);

        serie.characters.push(character);
        serie.characters.push(character2);
        serie2.characters.push(character2);
        serie2.characters.push(character);
        serie.creators.push(creator);
        serie2.creators.push(creator);

        character.save();
        character2.save();
        creator.save();
        actor.save();
        actor2.save();
        serie.save();
        serie2.save();

    }
});
module.exports = Serie;