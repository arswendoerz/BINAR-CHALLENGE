const carsFuelService = require("../services/carsFuel");
const { successResponse } = require("../utils/response");

exports.getCarsFuel = async (req, res, next) => {
    const data = await carsFuelService.getCarsFuel(
        req.query?.type,
        req.query?.price,
        req.query?.octan_rating
    );
    successResponse(res, data);
}

exports.getCarsFuelbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsFuelService.getCarsFuelbyId(id);
    successResponse(res, data);
};

exports.createCarsFuel = async (req, res, next) => {
    const data = await carsFuelService.createCarsFuel(req.body);
    successResponse(res, data);
};

exports.updateCarsFuel = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsFuelService.updateCarsFuel(id, req.body);
    successResponse(res, data);
};

exports.deleteCarsFuelbyId = async (req, res, next) => {
    const { id } = req.params;
    const data = await carsFuelService.deleteCarsFuelbyId(id);
    successResponse(res, data);
};