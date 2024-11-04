const carsManufactureRepository = require("../repositories/carsManufacture");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarsManufacture = async (manufacture, address) => {
    return carsManufactureRepository.getCarsManufacture(manufacture, address);
}

exports.getCarsManufacturebyId = (id) => {
    const cars = carsManufactureRepository.getCarsManufacturebyId(id);
    if (!cars) {
        throw new NotFoundError("Cars Manufacture is Not Found!");
    }
    return cars;
};

exports.createCarsManufacture = async (data) => {
    return carsManufactureRepository.createCarsManufacture(data);
};

exports.updateCarsManufacture = async (id, data) => {
    const existingCarsManufacture = carsManufactureRepository.getCarsManufacturebyId(id);
    if (!existingCarsManufacture) {
        throw new NotFoundError("Cars Manufacture is Not Found!");
    }

    data = {
        ...existingCarsManufacture,
        ...data,
    };

    const updatedCarsManufacture = carsManufactureRepository.updateCarsManufacture(id, data);
    if (!updatedCarsManufacture) {
        throw new InternalServerError(["Failed to update Cars Manufacture!"]);
    }

    return updatedCarsManufacture;
};

exports.deleteCarsManufacturebyId = (id) => {
    const existingCarsManufacture = carsManufactureRepository.getCarsManufacturebyId(id);
    if (!existingCarsManufacture) {
        throw new NotFoundError("Cars Manufacture is Not Found!");
    }

    const deletedCarsManufacture = carsManufactureRepository.deleteCarsManufacturebyId(id);
    if (!deletedCarsManufacture) {
        throw new InternalServerError(["Failed to delete Cars Manufacture!"]);
    }

    return deletedCarsManufacture;
};