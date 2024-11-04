// Standarize response
exports.successResponse = (res, data) => {
    res.status(200).json({
        success: true,
        data,
    });
};