const carsService = require("../services/cars");
const { successResponse } = require("../utils/response");

exports.getCarbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsService.getCarById(id);
    successResponse(res, data);
};

exports.getAllCars = async (req, res, next) => {
    const data = await carsService.getAllCars(
        req.query?.plate,
        req.query?.manufacture_id,
        req.query?.model_id,
        req.query?.rentPerDay,
        req.query?.capacity,
        req.query?.description,
        req.query?.availableAt,
        req.query?.transmission_id,
        req.query?.available,
        req.query?.type_id,
        req.query?.year,
        req.query?.options,
        req.query?.specs,
        req.query?.fuel_id
    );
    successResponse(res, data);
};

exports.createCar = async (req, res, next) => {
    const data = await carsService.createCar(req.body, req.files);
    successResponse(res, data);
};

exports.updateCar = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsService.updateCar(id, req.body, req.files);
    successResponse(res, data);
};

exports.deleteCarbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsService.deleteCarbyId(id);
    successResponse(res, data);
};
