const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CharacterSchema = new Schema({
    name:{
        type: String,
        require: true
    },
    description: String,
    actor: []
});



module.exports = CharacterSchema;
