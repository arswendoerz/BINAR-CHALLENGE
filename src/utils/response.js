exports.successResponse = (res, data) => {
    res.status(200).json({
        success: true,
        data,
        message: "Request successful",
        errors: [],
    });
};
