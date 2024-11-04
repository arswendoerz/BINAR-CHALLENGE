const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCarsManufacture = async (manufacture, address) => {
    const searchedCarsManufacture = await prisma.Manufacture.findMany({
        where: {
            manufacture: manufacture,
            address: address
        }
    });

    const serializedCarsManufacture = JSONBigInt.stringify(searchedCarsManufacture);
    return JSONBigInt.parse(serializedCarsManufacture);
}

exports.getCarsManufacturebyId = async (id) => {
    const searchedCarsManufacturebyId = await prisma.Manufacture.findUnique({
        where :{
            id : id,
        }
    });

    const serializedCarsManufacture = JSONBigInt.stringify(searchedCarsManufacturebyId);
    return JSONBigInt.parse(serializedCarsManufacture);
};

exports.createCarsManufacture = async (data) => {
    const largestIdCarsManufacture = await prisma.Manufacture.findFirst({
        orderBy: {
            id: 'desc',  // Mengurutkan ID dari yang terbesar
        },
        select: {
            id: true,  // Hanya ambil field ID
        },
    });
    
    const newId = largestIdCarsManufacture ? BigInt(largestIdCarsManufacture.id) + BigInt(1) : BigInt(1);

     
    const data_baru = {
        ...data, 
        id: newId.toString(),
    };
 
    const newCarsManufacture = await prisma.Manufacture.create({
        data: data_baru,
    });

    const serializedCarsManufacture = JSONBigInt.stringify(newCarsManufacture);
    return JSONBigInt.parse(serializedCarsManufacture);
};

exports.updateCarsManufacture = async(id, data) => {
    const existingCarsManufacture = await prisma.Manufacture.findFirst({
        where: { 
            id: id,
        },
    });

    if (!existingCarsManufacture) {
        throw new NotFoundError("Cars Manufacture is Not Found in the database!");
    }

    const updatedData = {
        manufacture : data.manufacture || existingCarsManufacture.manufacture,
        description : data.description || existingCarsManufacture.description,
    };

    const updatedCarsManufacture = await prisma.Manufacture.update({
        where: { 
            id: id, 
        },
        data: updatedData,
    });

    const serializedCarsManufacture = JSONBigInt.stringify(updatedCarsManufacture);
    return JSONBigInt.parse(serializedCarsManufacture);
};

exports.deleteCarsManufacturebyId = async (id) => {
    const existingCarsManufacture = await prisma.Manufacture.findFirst({
        where: { 
            id: id, 
        },
    });

    if (!existingCarsManufacture) {
        throw new NotFoundError("Cars Manufacture is Not Found in the database!");
    }

    const deletedCarsManufacture = await prisma.Manufacture.delete({
        where: { 
            id: id, 
        },
    });

    const serializedCarsManufacture = JSONBigInt.stringify(deletedCarsManufacture);
    return JSONBigInt.parse(serializedCarsManufacture);
};