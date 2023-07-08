const jwt = require('jsonwebtoken');
const responseMessage = require('./responseMessage');

module.exports = {
    isUserJWTAuthenticatedAuthorized: (req, res, next) => {
        // STEP 1: check header or url parameters or post parameters for token
        const requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log("INFO ::: Inside JWT authentication/authorization process for: " + requestUrl);

        const token = req.body.token || req.query.token || req.headers['x-access-token'];

        // STEP 2: decode token
        if (token) {
            console.log("INFO::: Inside JWT authentication token decoding process for: " + requestUrl);
            try {
                jwt.verify(token, jwtAppSecret, function (err, decoded) {
                    if (err) {
                        console.log("ERROR ::: JWT authentication process failed for: " + requestUrl);
                        console.log("ERROR ::: " + JSON.stringify(err));
                        return res.status(401).send(responseMessage.missingOrBadAuthentication);
                    } else {
                        // if everything is good, save to request for use in other routes
                        // console.log(decoded)
                        req.decoded = decoded;
                        const xCallerId = req.headers['x-caller-id'] || req.body.xCallerId || req.query.xcid;
                        const decodedUserId = req.decoded.id;
                        // STEP 3:  Check authorization
                        if (xCallerId) {
                            console.log("INFO ::: Inside JWT authorization process for: " + requestUrl);
                            try {
                                if (xCallerId === decodedUserId) {
                                    // User is authorized to do the operation, so proceed
                                    next();
                                } else {
                                    console.log("ERROR ::: JWT authorization process failed for: " + requestUrl);
                                    console.log("ERROR ::: xCallerId is: " + xCallerId + " decoded user id in token is: " + decoded);
                                    return res.status(401).send(responseMessage.userNotAuthorized);
                                }
                            } catch (error) {
                                console.log("ERROR ::: JWT authorization process failed with error: " + JSON.stringify(error));
                                console.log("ERROR ::: xCallerId is: " + xCallerId + " decoded user id in token is: " + decoded);
                                return res.status(401).send(responseMessage.userNotAuthorized);
                            }
                        } else {
                            console.log("ERROR ::: Authorization Denied: xCallerId not found in the request: " + requestUrl);
                            return res.status(401).send(responseMessage.userNotAuthorized);
                        }
                    }
                });
            } catch (error) {
                console.log(("ERROR ::: JWT authentication token decoding process failed with error: " + JSON.stringify(error)));
                return res.status(401).send(responseMessage.missingOrBadAuthentication);
            }
        } else {
            console.log("ERROR ::: Access Denied. Token not found in the request: " + requestUrl);
            return res.status(401).send(responseMessage.missingOrBadAuthentication);
        }
    }
}