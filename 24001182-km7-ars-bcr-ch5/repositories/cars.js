const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

exports.getAllCars = async (plate, manufacture_id, model_id, rentPerDay, capacity, description, availableAt, transmission_id, available,type_id, year, options, specs, fuel_id) => {
    let query = {
        include: {
            Manufacture: true,
            Model: true,
            Transmission: true,
            Type: true,
            Fuel: true,
        },
    };

    let orQuery = [];
    if (manufacture_id) {
        orQuery.push({
            manufacture: { contains: manufacture_id, mode: "insensitive" },
        });
    }
    if (model_id) {
        orQuery.push({
            model: { contains: model_id, mode: "insensitive" },
        });
    }
    if (transmission_id) {
        orQuery.push({
            transmission: { contains: transmission_id, mode: "insensitive" },
        });
    }
    if (type_id) {
        orQuery.push({
            type: { contains: type_id, mode: "insensitive" },
        });
    }
    if (fuel_id) {
        orQuery.push({
            fuel: { contains: fuel_id, mode: "insensitive" },
        });
    }

    if (orQuery.length > 0) {
        query.where = {
            ...query.where,
            OR: orQuery,
        };
    }
    const searchedCars = await prisma.cars.findMany(query);

    const serializedCars = JSONBigInt.stringify(searchedCars);
    return JSONBigInt.parse(serializedCars);
}

exports.getCarbyId = async (id) => {
    const searchedCarbyId = await prisma.cars.findFirst({
        where: {
            id: id,
        },
        include: {
            Manufacture: true,
            Model: true,
            Transmission: true,
            Type: true,
            Fuel: true,
        },
    });

    if (!searchedCarbyId) {
        throw new NotFoundError("Car not found in the database!");
    }

    const serializedCar = JSONBigInt.stringify(searchedCarbyId);
    return JSONBigInt.parse(serializedCar);
};

exports.createCar = async (data) => {
    const newCarData = {
        id: uuidv4(),
        ...data,
    };

    const newCar = await prisma.cars.create({
        data: newCarData,
        include: {
            Manufacture: true,
            Model: true,
            Transmission: true,
            Type: true,
            Fuel: true,
        },
    });

    const serializedCar = JSONBigInt.stringify(newCar);
    return JSONBigInt.parse(serializedCar);
};

exports.updateCar = async (id, data) => {
    const existingCar = await prisma.cars.findFirst({
        where: { 
            id: id,
        },
    });

    if (!existingCar) {
        throw new NotFoundError("Car not found in the database!");
    }

    const updatedData = {
        plate: data.plate || existingCar.plate,
        manufacture_id: data.manufacture_id || existingCar.manufacture_id,
        model_id: data.model_id || existingCar.model_id,
        image: data.image || existingCar.image,
        rentPerDay: data.rentPerDay || existingCar.rentPerDay,
        capacity: data.capacity || existingCar.capacity,
        description: data.description || existingCar.description,
        availableAt: data.availableAt || existingCar.availableAt,
        transmission_id: data.transmission_id || existingCar.transmission_id,
        available: data.available !== undefined ? data.available : existingCar.available,
        type_id: data.type_id || existingCar.type_id,
        year: data.year || existingCar.year,
        options: data.options || existingCar.options,
        specs: data.specs || existingCar.specs,
        fuel_id: data.fuel_id || existingCar.fuel_id,
    };

    const updatedCar = await prisma.cars.update({
        where: { 
            id: id,
        },
        include: {
            Manufacture: true,
            Model: true,
            Transmission: true,
            Type: true,
            Fuel: true,
        },
        data: updatedData,
    });

    const serializedCar = JSONBigInt.stringify(updatedCar);
    return JSONBigInt.parse(serializedCar);
};

exports.deleteCarbyId = async (id) => {
    const existingCar = await prisma.cars.findFirst({
        where: { 
            id: id, 
        },
    });

    if (!existingCar) {
        throw new NotFoundError("Car not found in the database!");
    }

    const deletedCar = await prisma.cars.delete({
        where: { 
            id: id, 
        },
        include: {
            Manufacture: true,
            Model: true,
            Transmission: true,
            Type: true,
            Fuel: true,
        },
    });

    const serializedCar = JSONBigInt.stringify(deletedCar);
    return JSONBigInt.parse(serializedCar);
};