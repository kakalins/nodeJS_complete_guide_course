const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const Joi = require('joi');
const express = require('express');
const router = express.Router();
const { Customer, validate } = require('../models/customer.model');


router.get('/', async(req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.post('/', async(req, res) => {
    // const { error } = await validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });

    try {
        const result = await customer.save(); //A validação descrita no esquema é realizada no momento de salvar em vez de usar a validação do Joi
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

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    }, { new: true });
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.delete('/:id', async(req, res) => {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.get('/:id', async(req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('The customer with the given ID was not found.');

    res.send(customer);
});

router.post('/list', async(req, res) => {
    console.log("ENtrando na função", req.body);
    await req.body.forEach(async(id) => {


        console.log('Imprimindo ID: ', id);
        // let parameter = await repository.findById(id);
        // if (!parameter) {
        //     return res.status(HttpStatus.NOT_FOUND).json();
        // }
        // parameter.value = parameter.default;
        // return await repository.updateById(id, parameter);
    });
});

module.exports = router;