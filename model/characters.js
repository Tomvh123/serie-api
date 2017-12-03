const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description: String,
    actors: [{
        type: Schema.Types.ObjectId,
        ref: 'actor'
    }]
});


module.exports = CharacterSchema;
