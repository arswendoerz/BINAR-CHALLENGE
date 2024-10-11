const carRepository = require("../repositories/cars");
const { imageUpload } = require("../utils/image-kit");
const { v4: uuidv4 } = require("uuid");
const { NotFoundError, InternalServerError } = require("../utils/request");

exports.getCars = (model, manufacture, year) => {
    return carRepository.getCars(model, manufacture, year);
};

exports.getCarById = (id) => {
    const car = carRepository.getCarById(id);
    if (!car) {
        throw new NotFoundError("Car is Not Found!");
    }

    return car;
};

exports.createCar = async (data, file) => {
    try {
        const newCarId = uuidv4();
        data.id = newCarId; 


        if (file?.image) {
            data.image = await imageUpload(file.image);
        }

        return carRepository.createCar(data);

    } catch (error) {
        console.error("Error creating car:", error); 
        throw new InternalServerError(); 
    }
};

exports.updateCar = async (id, data, file) => {
    try {
        const existingCar = carRepository.getCarById(id);
        if (!existingCar) {
            throw new NotFoundError("Car is Not Found!");
        }

        data = {
            ...existingCar,
            ...data,
        };

        if (file?.image) { 
            data.image = await imageUpload(file.image);
        }

        const updatedCar = carRepository.updateCar(id, data);
        if (!updatedCar) {
            throw new InternalServerError(["Failed to update car!"]);
        }

        return updatedCar;
    } catch (error) {
        console.error("Error updating car:", error); 
        throw new InternalServerError(); 
    }
};

exports.deleteCarById = (id) => {
    const existingCar = carRepository.getCarById(id);
    if (!existingCar) {
        throw new NotFoundError("Car is Not Found!");
    }

    const deletedCar = carRepository.deleteCarById(id);
    if (!deletedCar) {
        throw new InternalServerError(["Failed to delete car!"]);
    }

    return deletedCar;
};