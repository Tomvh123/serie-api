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
//console.log(CharacterSchema);

const Serie = mongoose.model('serie', SerieSchema);








Serie.count({}, function (err, count) {
    if(count < 10) {
        console.log('serie toevoegen...')

        const serie = new Serie({
            name: 'Arrow',
            description:'Spoiled billionaire playboy Oliver Queen ' +
            'is missing and presumed dead when his yacht is lost at sea. ' +
            'He returns five years later a changed man,' +
            'determined to clean up the city as a hooded vigilante armed with a bow.',
            imagePath: 'http://www.imdb.com/title/tt2193021/mediaviewer/rm1906844672',
            characters: [
                {
                    name: 'The Green Arrow',
                    description: 'Hes green and has a bow and arrow',
                    actor: []
                }
            ],

            creators: ['nothing1', 'nothing2'],

        });



        const actor = new Actor({

            name: 'Stephen Amell',
            description: 'Actor on Arrow',
            imagePath: 'http.dsjfakdjf.png'
        });

        const actor2 = new Actor({

            name: 'Stephen Amell2',
            description: 'Actor on Arrow',
            imagePath: 'http.dsjfakdjf.png'
        });






        serie.characters[0].actor.push(actor);
        serie.characters[0].actor.push(actor);
        serie.characters[0].actor.push(actor2);
        console.log(serie);


        actor.save();
        actor2.save();
        serie.save();

    }
});


module.exports = Serie;