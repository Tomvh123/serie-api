const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CharacterSchema = require('./characters');
const Actor = require('./actors');

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
    characters: [CharacterSchema],
    creators: []

});


const Serie = mongoose.model('serie', SerieSchema);


Serie.count({}, function (err, count) {
    if(count < 1) {
        console.log('serie toevoegen...')

        const serie = new Serie({
            name: 'Arrow' + count,
            description:'Spoiled billionaire playboy Oliver Queen ' +
            'is missing and presumed dead when his yacht is lost at sea. ' +
            'He returns five years later a changed man,' +
            'determined to clean up the city as a hooded vigilante armed with a bow.',
            imagePath: 'https://d2kmm3vx031a1h.cloudfront.net/FOovdnm5RpayhDQrcMQk_p14238959_b_v8_ab.jpg',
            characters: [
                {
                    name: 'The Green Arrow',
                    description: 'Hes green and has a bow and arrow',
                    actors: []
                }
            ],

            creators: ['nothing1', 'nothing2'],

        });
        const serie2 = new Serie({
            name: 'The Flash' + count,
            description:'After being struck by lightning, Barry Allen wakes up from his coma to discover ' +
            'hes been given the power of super speed, ' +
            'becoming the Flash, fighting crime in Central City.',
            imagePath: 'https://www.bleedingcool.com/wp-content/uploads/2017/09/Flash.png',
            characters: [
                {
                    name: 'The Flash',
                    description: 'Hes the fastest man alive',
                    actors: []
                }
            ],

            creators: ['nothing1', 'nothing2'],

        });
        const actor = new Actor({

            name: 'Person ' + count,
            description: 'Actor',
            imagePath: 'image'
        });

        const actor2 = new Actor({

            name: 'Stephen Amell2- ' + count,
            description: 'Actor on Arrow',
            imagePath: 'image'
        });
        serie.characters[0].actors.push(actor);
        serie.characters[0].actors.push(actor2);
        serie2.characters[0].actors.push(actor);
        serie2.characters[0].actors.push(actor2);
        actor.save();
        actor2.save();
        serie.save();
        serie2.save();

    }
});
module.exports = Serie;