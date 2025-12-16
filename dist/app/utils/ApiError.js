"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError extends Error {
    constructor(statusCode = 500, message = "Something went wrong") {
        super(message);
        this.statusCode = statusCode;
    }
}
exports.default = ApiError;
