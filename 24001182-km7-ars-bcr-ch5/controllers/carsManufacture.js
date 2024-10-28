const carsManufactureService = require("../services/carsManufacture");
const { successResponse } = require("../utils/response");

exports.getCarsManufacture = async (req, res, next) => {
    const data = await carsManufactureService.getCarsManufacture(
        req.query?.manufacture,
        req.query?.address
    );
    successResponse(res, data);
}

exports.getCarsManufacturebyId  = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsManufactureService.getCarsManufacturebyId(id);
    successResponse(res, data);
};

exports.createCarsManufacture = async (req, res, next) => {
    const data = await carsManufactureService.createCarsManufacture(req.body);
    successResponse(res, data);
};

exports.updateCarsManufacture = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsManufactureService.updateCarsManufacture(id, req.body);
    successResponse(res, data);
};

exports.deleteCarsManufacturebyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsManufactureService.deleteCarsManufacturebyId(id);
    successResponse(res, data);
};