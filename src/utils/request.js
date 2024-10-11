class AppError extends Error {
    constructor(message, statusCode, errors = []) {
        super(message);
        this.status = statusCode;
        this.errors = errors;
    }
}

class BadRequestError extends AppError {
    constructor(errors) {
        super("Bad Request", 400, errors);
    }
}

class NotFoundError extends AppError {
    constructor(message) {
        super(message, 404);
    }
}

class InternalServerError extends AppError {
    constructor() {
        super("Internal Server Error", 500);
    }
}

module.exports = {
    BadRequestError,
    NotFoundError,
    InternalServerError,
};