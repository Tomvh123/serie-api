const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActorSchema = new Schema({
    name: {
        type: String,
        required: true
    } ,
    description: {
        type: String,
        required: true
    },
    imagePath: String,
});

const Actor = mongoose.model('actors', ActorSchema);

module.exports = Actor;