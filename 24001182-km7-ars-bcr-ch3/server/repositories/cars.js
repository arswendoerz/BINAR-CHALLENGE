const fs = require("fs");
const cars = require("../../data/cars.json");

exports.getCars = (model, manufacture, year) => {
    const searchedCar = cars.filter((car) => {
        let result = true;
        if (model) {
            const isFoundModel = car.model.toLowerCase().includes(model.toLowerCase());
            result = result && isFoundModel;
        }
        if (manufacture) {
            const isFoundManufacture = car.manufacture.toLowerCase().includes(manufacture.toLowerCase());
            result = result && isFoundManufacture;
        }
        if (year) {
            const isFoundYear = car.year.toString() === year.toString();
            result = result && isFoundYear;
        }
        return result;
    });
    return searchedCar;
};

exports.getCarById = (id) => {
    const car = cars.find((car) => car.id === id);
    return car;
};

exports.createCar = (data) => {
    const newCar = {
        id: data.id, 
        ...data,
    };

    cars.push(newCar); 

    // Simpan data ke dalam JSON
    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return newCar;
};



exports.updateCar = (id, data) => {
    const car = cars.find((car) => car.id === id);
    if (!car) {
        throw new NotFoundError("Car is Not Found!");
    }

    // Update the data
    Object.assign(car, data);

    fs.writeFileSync(
        "./data/cars.json",
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return car;
};

exports.deleteCarById = (id) => {
    const carIndex = cars.findIndex((car) => car.id === id);

    if (carIndex < 0) {
        return null;
    }

    const deletedCar = cars.splice(carIndex, 1);

    // Update the json
    fs.writeFileSync(
        "./data/cars.json", 
        JSON.stringify(cars, null, 4),
        "utf-8"
    );

    return deletedCar;
};
