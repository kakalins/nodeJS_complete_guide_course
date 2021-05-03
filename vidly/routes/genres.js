const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Genre, validate } = require('../models/genre.model');

router.get('/', async(req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', async(req, res) => {
    // const { error } = await validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({
        name: req.body.name
    });

    try {
        const result = await genre.save(); //A validação descrita no esquema é realizada no momento de salvar em vez de usar a validação do Joi
        if (!result) return res.status(400).send(error.details[0].message);
        res.send(result);
    } catch (ex) {
        for (field in ex.errors)
            console.log(ex.errors[field].message);
    }
});

router.put('/:id', async(req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.delete('/:id', async(req, res) => {
    const genre = await Genre.findByIdAndDelete(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

router.get('/:id', async(req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(404).send('The genre with the given ID was not found.');

    res.send(genre);
});

module.exports = router;