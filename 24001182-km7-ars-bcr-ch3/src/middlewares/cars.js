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
        image: z.string().optional(),
        rentPerDay: z.string(),
        capacity: z.number(),
        description: z.string(),
        availableAt: z.string(),
        transmission: z.string(),
        available: z.boolean(),
        type: z.string(),
        year: z.number(),
        options: z.array(z.string()).optional(),
        specs: z.array(z.string()).optional(),
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

    req.body ={
        ...req.body,
        capacity : parseInt(req.body.capacity),
        available : req.body.available === 'true',
        year : parseInt(req.body.year),
    }

    const validateBody = z.object({
        plate: z.string(),
        manufacture: z.string(),
        model: z.string(),
        image: z.string().optional(),
        rentPerDay: z.string(),
        capacity: z.number(),
        description: z.string(),
        availableAt: z.string(),
        transmission: z.string(),
        available: z.boolean(),
        type: z.string(),
        year: z.number(),
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
