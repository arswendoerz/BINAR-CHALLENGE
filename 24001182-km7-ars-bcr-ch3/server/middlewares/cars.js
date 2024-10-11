const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCars = (req, res, next) => {
    const validateQuery = z.object({
        model: z.string().optional(),
        manufacture: z.string().optional(),
        year: z.string().optional(),
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};

exports.validateGetCarById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateCreateCar = (req, res, next) => {
    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        model: z.string(),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    next();
};

exports.validateUpdateCar = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }

    const validateBody = z.object({
        plate: z.string().optional(),
        manufacture: z.string().optional(),
        model: z.string().optional(),
        image: z.string().optional(),
        rentPerDay: z.number().optional(),
        capacity: z.number().optional(),
        description: z.string().optional(),
        availableAt: z.string().optional(),
        transmission: z.string().optional(),
        available: z.boolean().optional(),
        type: z.string().optional(),
        year: z.number().optional(),
        options: z.array(z.string()).optional(),
        specs: z.array(z.string()).optional(),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    }

    next();
};

exports.validateDeleteCarById = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    }

    next();
};
