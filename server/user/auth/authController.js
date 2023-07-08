const responseHelper = require('../../utils/responseHelper');
const authService = require('./authService');

module.exports = {
    signup: (req, res) => {
        authService.signup(req.body, (err, authorityRes, statusCode) =>
            responseHelper(err, res, authorityRes, statusCode));
    },

    login: (req, res) => {
        authService.login(req.body, (err, authorityRes, statusCode) => {
            responseHelper(err, res, authorityRes, statusCode);
        })

    }
}