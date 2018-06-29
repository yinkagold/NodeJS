const Joi = require('joi');
const mongoose = require('mongoose');

const Genre = mongoose.model('Genre',  genreSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25
    }
}));


function validateGenre(genre){
    const schema = {
        type: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}

exports.Genre = Genre;
exports.validate = validateGenre;