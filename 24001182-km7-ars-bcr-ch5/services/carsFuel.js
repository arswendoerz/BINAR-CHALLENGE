const carsFuelRepository = require("../repositories/carsFuel");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getCarsFuel = async (type, price, octan_rating) => {
    return carsFuelRepository.getCarsFuel(type, price, octan_rating);
}

exports.getCarsFuelbyId = (id) => {
    const cars = carsFuelRepository.getCarsFuelbyId(id);
    if (!cars) {
        throw new NotFoundError("Cars Fuel is Not Found!");
    }
    return cars;
};

exports.createCarsFuel = async (data) => {
    return carsFuelRepository.createCarsFuel(data);
};

exports.updateCarsFuel = async (id, data) => {
    const existingCarsFuel = carsFuelRepository.getCarsFuelbyId(id);
    if (!existingCarsFuel) {
        throw new NotFoundError("Cars Fuel is Not Found!");
    }

    data = {
        ...existingCarsFuel,
        ...data,
    };

    const updatedCarsFuel = carsFuelRepository.updateCarsFuel(id, data);
    if (!updatedCarsFuel) {
        throw new InternalServerError(["Failed to update Cars Fuel!"]);
    }

    return updatedCarsFuel;
};

exports.deleteCarsFuelbyId = (id) => {
    const existingCarsFuel = carsFuelRepository.getCarsFuelbyId(id);
    if (!existingCarsFuel) {
        throw new NotFoundError("Cars Fuel is Not Found!");
    }

    const deletedCarsFuel = carsFuelRepository.deleteCarsFuelbyId(id);
    if (!deletedCarsFuel) {
        throw new InternalServerError(["Failed to delete Cars Fuel!"]);
    }

    return deletedCarsFuel;
};