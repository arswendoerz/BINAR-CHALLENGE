const carsTransmissionRepository = require("../repositories/carsTransmission");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarsTransmission = async (type, number_of_gears) => {
    return carsTransmissionRepository.getCarsTransmission(type, number_of_gears);
}

exports.getCarsTransmissionbyId = (id) => {
    const cars = carsTransmissionRepository.getCarsTransmissionbyId(id);
    if (!cars) {
        throw new NotFoundError("Cars Transmission is Not Found!");
    }
    return cars;
};

exports.createCarsTransmission = async (data) => {
    return carsTransmissionRepository.createCarsTransmission(data);
};

exports.updateCarsTransmission = async (id, data) => {
    const existingCarsTransmission = carsTransmissionRepository.getCarsTransmissionbyId(id);
    if (!existingCarsTransmission) {
        throw new NotFoundError("Cars Transmission is Not Found!");
    }

    data = {
        ...existingCarsTransmission,
        ...data,
    };

    const updatedCarsTransmission = carsTransmissionRepository.updateCarsTransmission(id, data);
    if (!updatedCarsTransmission) {
        throw new InternalServerError(["Failed to update Cars Transmission!"]);
    }

    return updatedCarsTransmission;
};

exports.deleteCarsTransmissionbyId = (id) => {
    const existingCarsTransmission = carsTransmissionRepository.getCarsTransmissionbyId(id);
    if (!existingCarsTransmission) {
        throw new NotFoundError("Cars Transmission is Not Found!");
    }

    const deletedCarsTransmission = carsTransmissionRepository.deleteCarsTransmissionbyId(id);
    if (!deletedCarsTransmission) {
        throw new InternalServerError(["Failed to delete Cars Transmission!"]);
    }

    return deletedCarsTransmission;
};
