const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const Genre = mongoose.model('Genre',  genreSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 25
    }
}));

router.get('/', async (req, res) =>{
    const genres = await Genre.find().sort('type')
    res.send(genres);
});


router.post('/', async (req, res) => {
    const { error } = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({ type: req.body.type });
    genre = await genre.save()
    res.send(genre);
  
});

router.put('/:id',  async (req, res) => {
    const { error } = validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { type: req.body.type }, {
        new: true
    } )
   
    if(!genre) return res.status(404).send(error.details[0].message);

    res.send(genre);
});

router.delete('/:id', async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id );
    if(!genre) return res.status(400).send(error.details[0].message);
    res.send(genre);

});
router.get('/:id',async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(404).send('The genre with ID was not found.');
    res.send(genre);
});


function validateGenres(genre){
    const schema = {
        type: Joi.string().min(3).required()
    };
    return Joi.validate(genre, schema);
}


module.exports = router; 