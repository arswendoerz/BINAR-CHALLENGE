const authService = require("../services/auth");
const { successResponse } = require("../utils/response");

exports.register = async (req, res, next) => {
    const data = await authService.register(req.body, req.files);
    successResponse(res, data);
};

exports.login = async (req, res, next) =>{
    const data = await authService.login(req.body);
    successResponse(res, data);
}

exports.profile = async (req, res, next) =>{
    const authorizationHeader = req.headers["authorization"];
    const splittedAuthHeader = authorizationHeader.split(" ");
    const token = splittedAuthHeader[1];
    const data = await authService.profile(token);
    successResponse(res, data);
}