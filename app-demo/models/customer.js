const Joi = require('joi');
const mongoose = require('mongoose');

const Customer = mongoose.model('Customer', customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength:3,
        maxlength: 25
    },

    isGold: {
        type: Boolean,
        default: false
    },

    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 11
    }
}));

function validateCustomer(customer){
    const schema = {
        name: Joi.string().min(5).max(25).required(),
        phone: Joi.string().min(5).max(11).required(),
        isGold: Joi.boolean()
    };
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;