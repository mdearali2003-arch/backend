"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRequest = void 0;
const validateRequest = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        }
        catch (err) {
            return res.status(400).json({
                success: false,
                message: err.errors ? err.errors[0].message : "Validation error",
            });
        }
    };
};
exports.validateRequest = validateRequest;
