const express = require('express');
const authController = require('./auth/authController');

const loginUserRouter = express.Router();

// signup for user
loginUserRouter.post('/add_user',(req,res,next) => {
    authController.signup(req,res);
})

// login for user

loginUserRouter.post('/login_user',(req,res,next) => {
    authController.login(req,res);
})

module.exports = {
    loginUserRouter: loginUserRouter
};
