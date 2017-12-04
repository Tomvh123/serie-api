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
    birthDate: Date
});

const Actor = mongoose.model('actor', ActorSchema);

module.exports = Actor;