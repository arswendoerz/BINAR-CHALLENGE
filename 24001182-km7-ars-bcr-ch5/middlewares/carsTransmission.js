const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarsTransmission = (req, res, next) => {
    const validateQuery = z.object({
        type: z.string().optional(),
        number_of_gears: z.string().optional().transform((val) => {
            if (!val) return undefined; // Jika tidak ada nilai, biarkan undefined
            const parsed = parseInt(val, 10);
            if (isNaN(parsed)) {
                throw new Error('Number of Gears must be a valid integer');
            }
            return parsed;
        })
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
};


exports.validateGetCarsTransmissionbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });
    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    } 
    next();
};

exports.validateCreateCarsTransmission = (req, res, next) => {
    const validateBody = z.object({
        type: z.string(),
        number_of_gears: z.string().transform((val) => {
            const parsed = parseInt(val, 10);
            if (isNaN(parsed)) {
                throw new Error('Octan rating must be a valid integer');
            }
            return parsed;
        }),
    });

    const result = validateBody.safeParse(req.body);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    next();
};

exports.validateUpdateCarsTransmission = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
        number_of_gears: z.string().transform((val) => {
            const parsed = parseInt(val, 10);
            if (isNaN(parsed)) {
                throw new Error('Octan rating must be a valid integer');
            }
            return parsed;
        }),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }
    const validateBody = z.object({
        type: z.string(),
        number_of_gears: z.string().transform((val) => {
            const parsed = parseInt(val, 10);
            if (isNaN(parsed)) {
                throw new Error('Octan rating must be a valid integer');
            }
            return parsed;
        }),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        // If validation fails, return error messages
        throw new BadRequestError(resultValidateBody.error.errors);
    };

    next();
};

exports.validateDeleteCarsTransmissionbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    next();
};