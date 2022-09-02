const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const wordSchema = new mongoose.Schema({
    word: {
        type: String,
        required: true
    },
    partOfSpeech: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    
})

module.exports = mongoose.model('Word', wordSchema)