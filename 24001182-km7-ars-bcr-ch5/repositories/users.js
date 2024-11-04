const { PrismaClient } = require("@prisma/client");
const JSONBigInt = require("json-bigint");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

exports.createUser = async (data) => {
    const saltRounds = 10;
    data.password = await bcrypt.hash(data.password, saltRounds);

    // create the new user
    const newUser = await prisma.users.create({
        data,
    });

    const serializedStudents = JSONBigInt.stringify(newUser);
    return JSONBigInt.parse(serializedStudents);
};

exports.searchUser = async (email) =>{
    const users = await prisma.users.findFirst({
        where: {
            email: email,
        },
    });

    const serializedUsers = JSONBigInt.stringify(users);
    return JSONBigInt.parse(serializedUsers);
}

exports.comparePassword = async (inputpassword, dbpassword) =>{
    const checkPass = await bcrypt.compare(inputpassword, dbpassword);
    return checkPass;
}

exports.getUserById = async (id) => {
    const user = await prisma.users.findFirst({
        where: {
            id,
        },
    });

    const serializedStudents = JSONBigInt.stringify(user);
    return JSONBigInt.parse(serializedStudents);
};