const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
    //encrypt password
    data.password = await bcrypt.hash(data.password,10);

    //create new user
    const newUser = await prisma.users.create({
        data,
    });

    // Convert BigInt fields to string for safe serialization
    const serializedUsers = JSONBigInt.stringify(newUser);
    return JSONBigInt.parse(serializedUsers);
};

exports.getUserByEmail = async (email) => {
    const user = await prisma.users.findFirst({
        where: {
            email,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedUsers = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedUsers);
};

exports.getUserById = async (id) => {
    const user = await prisma.users.findFirst({
        where: {
            id,
        },
    });

    // Convert BigInt fields to string for safe serialization
    const serializedUsers = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedUsers);
};