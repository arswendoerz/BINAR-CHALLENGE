const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCarsModel = async (type, year) => {
    const searchedCarsModel = await prisma.Model.findMany({
        where: {
            type: type,
            year: year
        }
    });

    const serializedCarsModel = JSONBigInt.stringify(searchedCarsModel);
    return JSONBigInt.parse(serializedCarsModel);
}

exports.getCarModelbyId = async (id) => {
    const searchedCarModelbyId = await prisma.Model.findUnique({
        where :{
            id : id,
        }
    });

    const serializedCarsModel = JSONBigInt.stringify(searchedCarModelbyId);
    return JSONBigInt.parse(serializedCarsModel);
};

exports.createCarModel = async (data) => {
    const largestIdCarsModel = await prisma.Model.findFirst({
        orderBy: {
            id: 'desc',
        },
        select: {
            id: true,
        },
    });
    
    const newId = largestIdCarsModel ? BigInt(largestIdCarsModel.id) + BigInt(1) : BigInt(1);

     
    const new_car = {
        ...data, 
        id: newId.toString(),
    };
 
    const newCarModel = await prisma.Model.create({
        data: new_car,
    });

    const serializedCarsModel = JSONBigInt.stringify(newCarModel);
    return JSONBigInt.parse(serializedCarsModel);
};

exports.updateCarModel = async(id, data) => {
    const existingCarModel = await prisma.Model.findFirst({
        where: { 
            id: id,
        },
    });

    if (!existingCarModel) {
        throw new NotFoundError("Car Model is Not Found in the database!");
    }

    const updatedData = {
        type : data.type || existingCarModel.type,
        year : data.year || existingCarModel.year,
    };

    const updatedCarModel = await prisma.Model.update({
        where: { 
            id: id, 
        },
        data: updatedData,
    });

    const serializedCarsModel = JSONBigInt.stringify(updatedCarModel);
    return JSONBigInt.parse(serializedCarsModel);
};

exports.deleteCarModelbyId = async (id) => {
    const existingCarModel = await prisma.Model.findFirst({
        where: { 
            id: id, 
        },
    });

    if (!existingCarModel) {
        throw new NotFoundError("Cars Model is Not Found in the database!");
    }

    const deletedCarModel = await prisma.Model.delete({
        where: { 
            id: id, 
        },
    });

    const serializedCarsModel = JSONBigInt.stringify(deletedCarModel);
    return JSONBigInt.parse(serializedCarsModel);
};