const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly')
        .then(() => winston.log('Connected to MongoDB...'));   
}