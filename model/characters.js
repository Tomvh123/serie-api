const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description: String,
    imagePath: String,
    actors: [{
        type: Schema.Types.ObjectId,
        ref: 'actor'
    }],
    birthDate: Date
});

const Character = mongoose.model('character', CharacterSchema)


module.exports = Character;
