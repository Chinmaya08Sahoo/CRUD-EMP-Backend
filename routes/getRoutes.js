const express = require('express');
const compose = require('compose-middleware').compose;

const router = express.Router();
const endPointConfig = require('../config/routeConfig.json');
const { successResponse, failureResponse } = require("../utils/services/response.service")
const validator = require('../utils/validator');

const jsonErrorHandler = async (err, req, res, next) => {
    failureResponse(err, req, res)
}

for (let i = 0; i < endPointConfig.length; i++) {
    const config = endPointConfig[i];
    const middlewareArray = config.middlewares;
    let arr = [];

    if (config.isAuth) {
        arr.push(authorization.run);
    }

    for (let j = 0; j < middlewareArray.length; j++) {
        const middleware = require(`../middlewares/${middlewareArray[j]}`);
        arr.push(middleware.run);
    }

    try {
        router[config.method](config.endPoint,
            (req, res, next) => {
                res.locals.config = config;
                res.locals.ref = {};
                next()
            },
            validator.run,
            compose(arr),
            successResponse
        )
    } catch (error) {
        throw error
    }
}

router.use(jsonErrorHandler)


module.exports = router