const carsRepository = require("../repositories/cars");
const {imageUpload} = require("../utils/image-kit");
const {
    NotFoundError, 
    InternalServerError,
} = require("../utils/request");

exports.getAllCars = async (plate, manufacture_id, model_id, rentPerDay, capacity, description, availableAt, transmission_id, available,type_id, year, options, specs, fuel_id) => {
    return carsRepository.getAllCars(plate, manufacture_id, model_id, rentPerDay, capacity, description, availableAt, transmission_id, available,type_id, year, options, specs, fuel_id);
}

exports.getCarById = (id) => {
    const cars = carsRepository.getCarbyId(id);
    if (!cars) {
        throw new NotFoundError("Car is Not Found!");
    }
    return cars;
};

exports.createCar = async (data, file) => {
    if(file?.image){
        data.image = await imageUpload(file.image)
    }     
    return carsRepository.createCar(data);
};

exports.updateCar = async (id, data) => {
    const existingCar = carsRepository.getCarbyId(id);
    if (!existingCar) {
        throw new NotFoundError("Cars is Not Found!");
    }

    data = {
        ...existingCar,
        ...data,
    };

    const updatedCar = carsRepository.updateCar(id, data);
    if (!updatedCar) {
        throw new InternalServerError(["Failed to update Car!"]);
    }

    return updatedCar;
};

exports.deleteCarbyId = (id) => {
    const existingCar = carsRepository.getCarbyId(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    const deletedCar = carsRepository.deleteCarbyId(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to delete Car!"]);
    }

    return deletedCar;
};