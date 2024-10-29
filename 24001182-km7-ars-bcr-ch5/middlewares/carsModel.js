const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarsModel = (req, res, next) => {
    const validateQuery = z.object({
        type: z.string().optional().nullable(),
        year: z.string().optional().nullable(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
}

exports.validateGetCarModelbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });
    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    } 
    next();
};

exports.validateCreateCarModel = (req, res, next) => {
    req.body = {
        ...req.body,
        year : parseInt(req.body.year),
    };
    const validateBody = z.object({
        type: z.string(),
        year: z.number(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    next();
};

exports.validateUpdateCarModel = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }
    req.body = {
        ...req.body,
        year : parseInt(req.body.year),
    };
    const validateBody = z.object({
        type: z.string(),
        year: z.number(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    };

    next();
};

exports.validateDeleteCarModelbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    next();
};