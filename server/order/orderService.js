const responseMessage = require('../../server/utils/responseMessage');
const Order = require('../order/orderModel');
const mongoose = require('mongoose');


// This would be a common function to return Paginated JobPosts
function getPaginatedOrders(query, options, callback) {
    let response;
    PROMISE.props({
        getOrders: Order.paginate(query, options)
    }).then(function (result) {
        if (result.getOrders !== null) {
            if (!result.getOrders.total) {
                console.log("INFO::: No orders found based on query: " + JSON.stringify(query));
                response = new responseMessage.ObjectDoesNotExistInDB();
                return callback(null, response, response.code);
            } else {
                console.log("INFO::: Orders returned for query: " + JSON.stringify(query));
                response = new responseMessage.GenericSuccessMessage();
                response.data = result.getOrders.docs;
                response.total = result.getOrders.total;
                response.limit = result.getOrders.limit;
                response.page = result.getOrders.page;
                response.pages = result.getOrders.pages;
                return callback(null, response, response.code);
            }
        }
    }).catch(function (err) {
        console.log("ERROR ::: In finding getOrders for query: " + JSON.stringify(query) + ". Error: " + JSON.stringify(err));
        console.log(`ERROR ::: ${err.message}, stack: ${err.stack}`);
        response = new responseMessage.GenericFailureMessage();
        return callback(null, response, response.code);
    });
}

module.exports = {

    addOrder: async (body,callback) => {
        if (!body.userId || !body.sub_total || !body.mobileNumber) {
            const response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }

        try {
            const addOrder = await Order.create({
                userId: body.userId,
                sub_total: body.sub_total,
                mobileNumber: body.mobileNumber,
            });

            const response = new responseMessage.GenericSuccessMessage();
            response.data = {
                orderId: addOrder._id,
                userId: addOrder.userId
            }
            return callback(null, response, response.code)
        } catch (err) {
            const response = new responseMessage.GenericFailureMessage();
            console.log(`ERROR :: ${err}`);
            return callback(null, response, 200);
        }
    },
    getOrder: async (req,callback) => {
        let query = {};
        let response;
        const userId = req.query.userId;
        if (!userId) {
            response = responseMessage.incorrectPayload;
            return callback(null, response, response.code);
        }
        if (userId) {
            query.userId = new mongoose.Types.ObjectId(userId);
        }
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort || 'title';
        const options = { page: page, limit: limit, sort: sort };
        getPaginatedOrders(query, options, callback);
    }
    
}