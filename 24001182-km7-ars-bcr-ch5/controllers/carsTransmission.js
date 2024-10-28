const carsTransmissionService = require("../services/carsTransmission");
const { successResponse } = require("../utils/response");

exports.getCarsTransmission = async (req, res, next) => {
    const data = await carsTransmissionService.getCarsTransmission(
        req.query?.type,
        req.query?.number_of_gears
    );
    successResponse(res, data);
}

exports.getCarsTransmissionbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsTransmissionService.getCarsTransmissionbyId(id);
    successResponse(res, data);
};

exports.createCarsTransmission = async (req, res, next) => {
    const data = await carsTransmissionService.createCarsTransmission(req.body);
    successResponse(res, data);
};

exports.updateCarsTransmission = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsTransmissionService.updateCarsTransmission(id, req.body);
    successResponse(res, data);
};

exports.deleteCarsTransmissionbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsTransmissionService.deleteCarsTransmissionbyId(id);
    successResponse(res, data);
};