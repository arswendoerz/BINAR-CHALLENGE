const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCarsType = async (type, description) => {
    const searchedCarsType = await prisma.Type.findMany({
        where: {
            type: type,
            description: description
        }
    });

    const serializedCarsType = JSONBigInt.stringify(searchedCarsType);
    return JSONBigInt.parse(serializedCarsType);
}

exports.getCarsTypebyId = async (id) => {
    const searchedCarsTypebyId = await prisma.Type.findUnique({
        where :{
            id : id,
        }
    });

    // Convert BigInt fields to string for safe serialization
    const serializedCarsType = JSONBigInt.stringify(searchedCarsTypebyId);
    return JSONBigInt.parse(serializedCarsType);
};

exports.createCarsType = async (data) => {
    const largestIdCarsType = await prisma.Type.findFirst({
        orderBy: {
            id: 'desc',  // Mengurutkan ID dari yang terbesar
        },
        select: {
            id: true,  // Hanya ambil field ID
        },
    });
    
    const newId = largestIdCarsType ? BigInt(largestIdCarsType.id) + BigInt(1) : BigInt(1);

     
    const data_baru = {
        ...data, 
        id: newId.toString(),
    };
 
    const newCarsType = await prisma.Type.create({
        data: data_baru,
    });

    const serializedCarsType = JSONBigInt.stringify(newCarsType);
    return JSONBigInt.parse(serializedCarsType);
};

exports.updateCarsType = async(id, data) => {
    const existingCarsType = await prisma.Type.findFirst({
        where: { 
            id: id,
        },
    });

    if (!existingCarsType) {
        throw new NotFoundError("Cars Type is Not Found in the database!");
    }

    const updatedData = {
        type : data.type || existingCarsType.type,
        description : data.description || existingCarsType.description,
    };

    const updatedCarsType = await prisma.Type.update({
        where: { 
            id: id, 
        },
        data: updatedData,
    });

    const serializedCarsType = JSONBigInt.stringify(updatedCarsType);
    return JSONBigInt.parse(serializedCarsType);
};

exports.deleteCarsTypebyId = async (id) => {
    const existingCarsType = await prisma.Type.findFirst({
        where: { 
            id: id, 
        },
    });

    if (!existingCarsType) {
        throw new NotFoundError("Cars Type is Not Found in the database!");
    }

    const deletedCarsType = await prisma.Type.delete({
        where: { 
            id: id, 
        },
    });

    const serializedCarsType = JSONBigInt.stringify(deletedCarsType);
    return JSONBigInt.parse(serializedCarsType);
};