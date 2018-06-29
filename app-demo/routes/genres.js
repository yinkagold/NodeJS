const {Genre, validate } = require('../models/genre');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) =>{
    const genres = await Genre.find().sort('type')
    res.send(genres);
});


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let genre = new Genre({ type: req.body.type });
    genre = await genre.save()
    res.send(genre);
  
});

router.put('/:id',  async (req, res) => {
    const { error } = validate(req.body);
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

module.exports = router; 