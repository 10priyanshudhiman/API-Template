const express = require('express');
const orderController = require('./orderController');
const orderRouter = express.Router();

// signup for user
orderRouter.post('/add_order',(req,res,next) => {
    orderController.addOrder(req,res);
})

// login for user
orderRouter.get('/get_order',(req,res,next) => {
    orderController.getOrder(req,res);
})

module.exports = {
    orderRouter: orderRouter
};
