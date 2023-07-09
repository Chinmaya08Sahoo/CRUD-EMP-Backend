const BaseError = require('./baseError')
class ValidationError extends BaseError {
    constructor(
        message,
        errObj = {},
        name = "ValidationError",
        displayMessage = "Request validation failed",
        statusCode = 400,
        description = 'VM-5001',
    ) {
        super(message, errObj, name, displayMessage, statusCode, description)

        if (this.message == "") {
            this.message = "Validation Failed"
        }
        this.errObj = errObj;
    }
}

class BadRequestError extends BaseError {
    constructor(
        message,
        errObj = {},
        name = "BadRequest",
        displayMessage = "400 Bad request",
        statusCode = 400,
        description = 'VM-5008',
    ) {
        super(message, errObj, name, displayMessage, statusCode, description)

        if (this.message == "") {
            this.message = "Bad Request"
        }
        this.errObj = errObj;
    }
}

class NoRecordsFoundError extends BaseError {
    constructor(
        message,
        errObj = {},
        name = "No Records Found...",
        displayMessage = "No user found....",
        statusCode = 400,
        description = 'VM-5003'
    ) {
        super(message, errObj, name, displayMessage, statusCode, description)

        if (this.message == "") {
            this.message = "No such user to be found..."
        }
        this.errObj = errObj;
    }
}


module.exports = { 
    ValidationError,
    BadRequestError,
    NoRecordsFoundError
}