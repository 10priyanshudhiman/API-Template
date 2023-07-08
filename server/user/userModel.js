const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const validators = require('../utils/validators');
const bcrypt = require('bcryptjs');

// Given a password it returns hashed password
function toHashedPassword(stringPwd) {
    return bcrypt.hashSync(stringPwd, bcrypt.genSaltSync(8));
}

const userSchema = mongoose.Schema({
    userName:{
        type: String,
        required: true,
        validate: validators.nameValidator
    },
    mobileNumber:{
        type: String,
        required: [true, "mobileNumber is required"],
        unique: true
    },
    password:{
        type: String,
        set: toHashedPassword,
        required: [true, "password is required"],
        minlength: 6,
        select: false
    }
},{
    timestamps:true
});

// generating a hash of the password
userSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// checking if password is valid
userSchema.methods.validPassword = function (password, userPassword) {
    return bcrypt.compareSync(password, userPassword);
};

userSchema.plugin(mongoosePaginate)

module.exports = mongoose.mainConnection.model('User', userSchema, 'users');