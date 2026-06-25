const { validationResult } = require("express-validator");

/**
 * Middleware to check validation results from express-validator chains.
 * Must be placed AFTER the validator array in a route.
 */
function validate(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation failed",
            errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
        });
    }
    next();
}

module.exports = validate;
