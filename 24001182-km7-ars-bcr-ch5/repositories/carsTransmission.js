const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCarsTransmission = async (type, number_of_gears) => {
    const parsedNumberOfGears = number_of_gears ? parseInt(number_of_gears, 10) : undefined;
    const searchedCarsTransmission = await prisma.Transmission.findMany({
        where: {
            type: type,
            ...(parsedNumberOfGears && {number_of_gears: parsedNumberOfGears})
        }
    });

    const serializedCarsTransmission = JSONBigInt.stringify(searchedCarsTransmission);
    return JSONBigInt.parse(serializedCarsTransmission);
}

exports.getCarsTransmissionbyId = async (id) => {
    const searchedCarsTransmissionbyId = await prisma.Transmission.findUnique({
        where: {
            id: id,
        }
    });
    const serializedCarsTransmission = JSONBigInt.stringify(searchedCarsTransmissionbyId);
    return JSONBigInt.parse(serializedCarsTransmission);
};

exports.createCarsTransmission = async (data) => {
    const largestIdCarsTransmission = await prisma.Transmission.findFirst({
        orderBy: {
            id: 'desc', 
        },
        select: {
            id: true,
        },
    });

    const newId = largestIdCarsTransmission ? BigInt(largestIdCarsTransmission.id) + BigInt(1) : BigInt(1);

    const numberOfGears = parseInt(data.number_of_gears, 10);
    if (isNaN(numberOfGears)) {
        throw new BadRequestError("number_of_gears must be a valid number");
    };

    const data_baru = {
        ...data,
        id: newId.toString(),
        number_of_gears: numberOfGears
    };

    const newCarsTransmission = await prisma.Transmission.create({
        data: data_baru,
    });

    const serializedCarsTransmission = JSONBigInt.stringify(newCarsTransmission);
    return JSONBigInt.parse(serializedCarsTransmission);
};

exports.updateCarsTransmission = async (id, data) => {
    const existingCarsTransmission = await prisma.Transmission.findFirst({
        where: {
            id: id,
        },
    });

    if (!existingCarsTransmission) {
        throw new NotFoundError("Cars Transmission is Not Found in the database!");
    }

    const numberOfGears = parseInt(data.number_of_gears, 10);
    if (isNaN(numberOfGears)) {
        throw new BadRequestError("number_of_gears must be a valid number");
    }

    const updatedData = {
        type: data.type,
        number_of_gears: numberOfGears, 
    };

    const updatedCarsTransmission = await prisma.Transmission.update({
        where: {
            id: id,
        },
        data: updatedData,
    });

    const serializedCarsTransmission = JSONBigInt.stringify(updatedCarsTransmission);
    return JSONBigInt.parse(serializedCarsTransmission);
};

exports.deleteCarsTransmissionbyId = async (id) => {
    const existingCarsTransmission = await prisma.Transmission.findFirst({
        where: {
            id: id,
        },
    });

    if (!existingCarsTransmission) {
        throw new NotFoundError("Cars Transmission is Not Found!");
    }

    const deletedCarsTransmission = await prisma.Transmission.delete({
        where: {
            id: id,
        },
    });

    const serializedCarsTransmission = JSONBigInt.stringify(deletedCarsTransmission);
    return JSONBigInt.parse(serializedCarsTransmission);
};
