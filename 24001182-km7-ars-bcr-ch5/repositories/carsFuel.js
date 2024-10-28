const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const { NotFoundError } = require("../utils/request");

const prisma = new PrismaClient();

exports.getCarsFuel = async (type, price, octan_rating) => {
    const parsedPrice = price ? parseFloat(price) : undefined;
    const parsedOctanRating = octan_rating ? parseInt(octan_rating, 10) : undefined;

    const searchedCarsFuel = await prisma.Fuel.findMany({
        where: {
            ...(type && { type: { contains: type, mode: 'insensitive' } }),
            ...(parsedPrice && { price: parsedPrice }),
            ...(parsedOctanRating && { octan_rating: parsedOctanRating })
        }
    });

    const serializedCarsFuel = JSONBigInt.stringify(searchedCarsFuel);
    return JSONBigInt.parse(serializedCarsFuel);
};

exports.getCarsFuelbyId = async (id) => {
    const searchedCarsFuelbyId = await prisma.Fuel.findUnique({
        where: {
            id: id,
        }
    });

    const serializedCarsFuel = JSONBigInt.stringify(searchedCarsFuelbyId);
    return JSONBigInt.parse(serializedCarsFuel);
};

exports.createCarsFuel = async (data) => {
    const largestIdCarsFuel = await prisma.Fuel.findFirst({
        orderBy: {
            id: 'desc', 
        },
        select: {
            id: true,
        },
    });

    const newId = largestIdCarsFuel ? BigInt(largestIdCarsFuel.id) + BigInt(1) : BigInt(1);

    const price = parseFloat(data.price);
    if (isNaN(price)) {
        throw new BadRequestError("price must be a valid number");
    }

    // Convert octan_rating from string to integer
    const octanRating = parseInt(data.octan_rating, 10);
    if (isNaN(octanRating)) {
        throw new BadRequestError("octan_rating must be a valid integer");
    }

    const data_baru = {
        ...data,
        id: newId.toString(),
        price: price,          
        octan_rating: octanRating 
    };

    const newCarsFuel = await prisma.Fuel.create({
        data: data_baru,
    });

    const serializedCarsFuel = JSONBigInt.stringify(newCarsFuel);
    return JSONBigInt.parse(serializedCarsFuel);
};

exports.updateCarsFuel = async (id, data) => {
    const existingCarsFuel = await prisma.Fuel.findFirst({
        where: {
            id: id,
        },
    });

    if (!existingCarsFuel) {
        throw new NotFoundError("Cars Fuel is Not Found in the database!");
    }

    const price = parseFloat(data.price);
    if (isNaN(price)) {
        throw new BadRequestError("price must be a valid number");
    }

    // Convert octan_rating from string to integer
    const octanRating = parseInt(data.octan_rating, 10);
    if (isNaN(octanRating)) {
        throw new BadRequestError("octan_rating must be a valid integer");
    }

    const updatedData = {
        type: data.type,
        price: price,          
        octan_rating: octanRating 
    };

    const updatedCarsFuel = await prisma.Fuel.update({
        where: {
            id: id,
        },
        data: updatedData,
    });

    const serializedCarsFuel = JSONBigInt.stringify(updatedCarsFuel);
    return JSONBigInt.parse(serializedCarsFuel);
};

exports.deleteCarsFuelbyId = async (id) => {
    const existingCarsFuel = await prisma.Fuel.findFirst({
        where: {
            id: id,
        },
    });

    if (!existingCarsFuel) {
        throw new NotFoundError("Cars Fuel is Not Found!");
    }

    const deletedCarsFuel = await prisma.Fuel.delete({
        where: {
            id: id,
        },
    });

    const serializedCarsFuel = JSONBigInt.stringify(deletedCarsFuel);
    return JSONBigInt.parse(serializedCarsFuel);
};
