const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreatorSchema = new Schema({
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

const Creator = mongoose.model('creator', CreatorSchema);

console.log('werkt')

module.exports = Creator;