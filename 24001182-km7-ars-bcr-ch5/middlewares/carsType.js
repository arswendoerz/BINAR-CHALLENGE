const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarsType = (req, res, next) => {
    const validateQuery = z.object({
        type: z.string().optional().nullable(),
        description: z.string().optional().nullable(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
}

exports.validateGetCarsTypebyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });
    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    } 
    next();
};

exports.validateCreateCarsType = (req, res, next) => {
    const validateBody = z.object({
        type : z.string(),
        description : z.string(),
    });

    // Validate
    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        // If validation fails, return error messages
        throw new BadRequestError(result.error.errors);
    };

    next();
};

exports.validateUpdateCarsType = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }
    const validateBody = z.object({
        type : z.string(),
        description : z.string(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    };

    next();
};

exports.validateDeleteCarsTypebyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    next();
};