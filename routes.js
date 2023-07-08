
const healthCheck = require('./server/utils/healthcheck');

// All routes here
const userRouter = require('./server/user/userRoute').loginUserRouter;
const orderRouter = require('./server/order/orderRoute').orderRouter;
// All middlewares here
const isUserJWTAuthenticatedAuthorizedMW = require("./server/utils/middlewares").isUserJWTAuthenticatedAuthorized;



module.exports = function (app) {
    app.use('/healthcheck', healthCheck);

    // user Routes here
    app.use('/user',[isUserJWTAuthenticatedAuthorizedMW],userRouter);

    // order Routes here
    app.use('/order',[isUserJWTAuthenticatedAuthorizedMW], orderRouter);
}