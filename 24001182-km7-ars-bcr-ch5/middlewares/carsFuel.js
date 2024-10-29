const { z } = require("zod");
const { BadRequestError } = require("../utils/request");

exports.validateGetCarsFuel = (req, res, next) => {
    const validateQuery = z.object({
        type: z.string().optional().nullable(),
        price: z.string().optional().transform((val) => {
            if (!val) return undefined; // Jika tidak ada nilai, biarkan undefined
            const parsed = parseFloat(val);
            if (isNaN(parsed)) {
                throw new Error('Price must be a valid float');
            }
            return parsed;
        }),
        octan_rating: z.string().optional().transform((val) => {
            if (!val) return undefined; // Jika tidak ada nilai, biarkan undefined
            const parsed = parseInt(val, 10);
            if (isNaN(parsed)) {
                throw new Error('Octan rating must be a valid integer');
            }
            return parsed;
        })
    });

    const resultValidateQuery = validateQuery.safeParse(req.query);
    if (!resultValidateQuery.success) {
        throw new BadRequestError(resultValidateQuery.error.errors);
    }

    next();
}

exports.validateGetCarsFuelbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });
    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    } 
    next();
};

exports.validateCreateCarsFuel = (req, res, next) => {
    const validateBody = z.object({
        type: z.string(),
        price: z.string().transform((val) => {
            const parsed = parseFloat(val);
            if (isNaN(parsed)) {
                throw new Error('Price must be a valid number');
            }
            return parsed;
        }),
        octan_rating: z.string().transform((val) => {
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
    }

    next();
};

exports.validateUpdateCarsFuel = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const resultValidateParams = validateParams.safeParse(req.params);
    if (!resultValidateParams.success) {
        throw new BadRequestError(resultValidateParams.error.errors);
    }
    const validateBody = z.object({
        type: z.string(),
        price: z.string().transform((val) => {
            const parsed = parseFloat(val);
            if (isNaN(parsed)) {
                throw new Error('Price must be a valid number');
            }
            return parsed;
        }),
        octan_rating: z.string().transform((val) => {
            const parsed = parseInt(val, 10);
            if (isNaN(parsed)) {
                throw new Error('Octan rating must be a valid integer');
            }
            return parsed;
        }),
    });

    const resultValidateBody = validateBody.safeParse(req.body);
    if (!resultValidateBody.success) {
        throw new BadRequestError(resultValidateBody.error.errors);
    };

    next();
};

exports.validateDeleteCarsFuelbyId = (req, res, next) => {
    const validateParams = z.object({
        id: z.string(),
    });

    const result = validateParams.safeParse(req.params);
    if (!result.success) {
        throw new BadRequestError(result.error.errors);
    };

    next();
};
