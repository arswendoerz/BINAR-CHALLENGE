const carsModelRepository = require("../repositories/carsModel");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarsModel = async (type, year) => {
    return carsModelRepository.getCarsModel(type, year);
}

exports.getCarModelbyId = (id) => {
    const cars = carsModelRepository.getCarModelbyId(id);
    if (!cars) {
        throw new NotFoundError("Cars Model is Not Found!");
    }
    return cars;
};

exports.createCarModel = async (data) => {
    return carsModelRepository.createCarModel(data);
};

exports.updateCarModel = async (id, data) => {
    const existingCarsModel = carsModelRepository.getCarModelbyId(id);
    if (!existingCarsModel) {
        throw new NotFoundError("Cars Model is Not Found!");
    }

    data = {
        ...existingCarsModel,
        ...data,
    };

    const updatedCarModel = carsModelRepository.updateCarModel(id, data);
    if (!updatedCarModel) {
        throw new InternalServerError(["Failed to update Cars Model!"]);
    }

    return updatedCarModel;
};

exports.deleteCarModelbyId = (id) => {
    const existingCarsModel = carsModelRepository.getCarModelbyId(id);
    if (!existingCarsModel) {
        throw new NotFoundError("Cars Model is Not Found!");
    }

    const deletedCarModel = carsModelRepository.deleteCarModelbyId(id);
    if (!deletedCarModel) {
        throw new InternalServerError(["Failed to delete Cars Model!"]);
    }

    return deletedCarModel;
};