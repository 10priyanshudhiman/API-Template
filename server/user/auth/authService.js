const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const responseMessage = require('../../utils/responseMessage');
const User = require('../userModel');

const signToken = id => {
    return jwt.sign({ id }, jwtAppSecret, {
        expiresIn: jwtTokenExpiryDuration,
    });
};

module.exports = {

    signup: async (body, callback) => {
        if (!body.userName || !body.password || !body.mobileNumber) {
            const response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }

        try {
            const { mobileNumber} = body;
            if (await User.findOne({ mobileNumber })) {
                const response = new responseMessage.UpdateBadRequest();
                return callback(null, response, response.code);
            }

            const newUser = await User.create({
                userName: body.userName,
                password: body.password,
                mobileNumber: body.mobileNumber,
            });

            const response = new responseMessage.GenericSuccessMessage();
            response.data = {
                userId: newUser._id,
                userName: newUser.userName
            }
            return callback(null, response, response.code)
        } catch (err) {
            const response = new responseMessage.GenericFailureMessage();
            console.log(`ERROR :: ${err}`);
            return callback(null, response, 200);
        }
    },
    login: async (body, callback) => {

        console.log(`INFO ::: User signin ${JSON.stringify(body)}`)
        try {
            const {password, mobileNumber } = body;
            if ((!mobileNumber) || !password) {
                const response = responseMessage.incorrectPayload;
                return callback(null, response, response.code);
            }
            let user;
            if (mobileNumber)
                user = await User.findOne({ mobileNumber }).select('+password');
                
            if (!user || !(await user.validPassword(password, user.password))) {
                const response = new responseMessage.ObjectDoesNotExistInDB();
                response.data = {
                    message: 'Incorrect email or password'
                };
                return callback(null, response, response.code);
            }
            const response = new responseMessage.AuthenticationSuccess();
            response.data = {
                token: signToken(user._id),
                user
            }
            return callback(null, response, response.code)
        } catch (err) {
            const response = new responseMessage.GenericFailureMessage();
            console.log(`ERROR:: ${err}`);
            return callback(null, response, response.code);
        }
    }
}