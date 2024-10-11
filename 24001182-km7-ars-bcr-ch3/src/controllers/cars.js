const carService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCars = (req, res, next) => {
    const data = carService.getCars(
        req.query?.model,
        req.query?.manufacture,
        req.query?.year
    );
    successResponse(res, data);
};

exports.getCarById = (req, res, next) => {
    const { id } = req.params;

    const data = carService.getCarById(id);
    
    if (!data) {
        return res.status(404).json({
            success: false,
            data: null,
            message: "Car is Not Found!",
            errors: []
        });
    }

    successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
    try {
        const data = await carService.createCar(req.body, req.files); // Ambil file dari req.file
        successResponse(res, data);
    } catch (error) {
        next(error);
    }
};

exports.updateCar = async (req, res, next) => {
    const { id } = req.params;
    try {
        const data = await carService.updateCar(id, req.body, req.files); // Ambil file dari req.file
        successResponse(res, data);
    } catch (error) {
        next(error); 
    }
};

exports.deleteCarById = (req, res, next) => {
    const { id } = req.params;
    const data = carService.deleteCarById(id);
    successResponse(res, data);
};