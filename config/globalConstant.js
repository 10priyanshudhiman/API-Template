const developmentConfig = require('../environment/development.json');
const promise = require("bluebird");


let mongoMainHost, mongoMainDB, mongoMainUser, mongoMainPass,PORT;

    jwtAppSecret = developmentConfig.jwtAppSecret;
    jwtTokenExpiryDuration = developmentConfig.jwtTokenExpiryDuration;
    mongoMainHost = developmentConfig.dbCredentials.mongo.host;
    mongoMainDB = developmentConfig.dbCredentials.mongo.mongo_db;
    mongoMainUser = developmentConfig.dbCredentials.mongo.username;
    mongoMainPass = developmentConfig.dbCredentials.mongo.password;
    PORT = developmentConfig.PORT;
    

global.mongoMainHost = mongoMainHost;
global.mongoMainDB = mongoMainDB;
global.mongoMainUser = mongoMainUser;
global.mongoMainPass = mongoMainPass;
global.jwtAppSecret = jwtAppSecret;
global.jwtTokenExpiryDuration = jwtTokenExpiryDuration;
global.PROMISE = promise;
global.PORT = PORT;
