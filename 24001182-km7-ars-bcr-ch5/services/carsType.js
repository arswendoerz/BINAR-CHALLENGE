const carsTypeRepository = require("../repositories/carsType");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarsType = async (type, description) => {
    return carsTypeRepository.getCarsType(type, description);
}

exports.getCarsTypebyId = (id) => {
    const cars = carsTypeRepository.getCarsTypebyId(id);
    if (!cars) {
        throw new NotFoundError("Cars is Not Found!");
    }
    return cars;
};

exports.createCarsType = async (data) => {
    return carsTypeRepository.createCarsType(data);
};

exports.updateCarsType = async (id, data) => {
    const existingCarsType = carsTypeRepository.getCarsTypebyId(id);
    if (!existingCarsType) {
        throw new NotFoundError("Cars is Not Found!");
    }

    data = {
        ...existingCarsType,
        ...data,
    };

    const updatedCarsType = carsTypeRepository.updateCarsType(id, data);
    if (!updatedCarsType) {
        throw new InternalServerError(["Failed to update Cars!"]);
    }

    return updatedCarsType;
};

exports.deleteCarsTypebyId = (id) => {
    const existingCarsType = carsTypeRepository.getCarsTypebyId(id);
    if (!existingCarsType) {
        throw new NotFoundError("Cars is Not Found!");
    }

    const deletedCarsType = carsTypeRepository.deleteCarsTypebyId(id);
    if (!deletedCarsType) {
        throw new InternalServerError(["Failed to delete Cars!"]);
    }

    return deletedCarsType;
};