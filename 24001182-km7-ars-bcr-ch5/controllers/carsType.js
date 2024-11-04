const carsTypeService = require("../services/carsType");
const { successResponse } = require("../utils/response");

exports.getCarsType = async (req, res, next) => {
    const data = await carsTypeService.getCarsType(
        req.query?.type,
        req.query?.description
    );
    successResponse(res, data);
}

exports.getCarsTypebyId  = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsTypeService.getCarsTypebyId(id);
    successResponse(res, data);
};

exports.createCarsType = async (req, res, next) => {
    const data = await carsTypeService.createCarsType(req.body);
    successResponse(res, data);
};

exports.updateCarsType = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsTypeService.updateCarsType(id, req.body);
    successResponse(res, data);
};

exports.deleteCarsTypebyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsTypeService.deleteCarsTypebyId(id);
    successResponse(res, data);
};