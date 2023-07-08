const responseHelper = require('../../server/utils/responseHelper');
const orderService = require('./orderService');

module.exports = {
    addOrder: (req, res) => {
        orderService.addOrder(req.body, (err, authorityRes, statusCode) =>
            responseHelper(err, res, authorityRes, statusCode));
    },

    getOrder: (req, res) => {
        orderService.getOrder(req, (err, authorityRes, statusCode) => {
            responseHelper(err, res, authorityRes, statusCode);
        })

    }
}