const validate = require('mongoose-validator');
const { mobileNumberNotFound } = require('./responseMessage');
const mongoose = require('mongoose');

const nameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 50],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
    })
];

const objectIdValidator = [
    validate({
            validator: function (value) {
              return mongoose.Types.ObjectId.isValid(value);
            },
            message: 'Invalid userId'     
    })
]

module.exports = {
    nameValidator,
    objectIdValidator
};
