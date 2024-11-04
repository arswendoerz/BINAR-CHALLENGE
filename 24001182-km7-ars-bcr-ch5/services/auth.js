const jwt = require("jsonwebtoken");
const userRepository = require("../repositories/users");
const { imageUpload } = require("../utils/image-kit");
const {
    Unauthorized,
} = require("../utils/request");

exports.register = async (data, file) => {
    // if there are any file (profile picture)
    if (file.profile_picture) {
        data.profile_picture = await imageUpload(file.profile_picture);
    }

    // create user
    const user = await userRepository.createUser(data);

    // generate token with jwt
    const payload = {
        user_id: user.id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "72h", // expired in 3 days
    });

    // don't forget to remove the password object, if not removed it will be displayed in response
    delete user.password;

    // return the user info and the token
    return {
        user,
        token,
    };
};

exports.login = async (data) => {
    const users = await userRepository.searchUser(data.email);
    if(users){
        const checkPass = await userRepository.comparePassword(data.password, users.password);
        if(checkPass){
            const payload = {
                user_id: users.id,
            };
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "72h",
            });

            delete users.password;
        
            return {
                users,
                token,
            };
        }else{
            throw new Unauthorized("Password is False!");    
        }
    }else{
        throw new Unauthorized("User is Not Found!");
    }

}

exports.profile = async (token) =>{
    const extractedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userRepository.getUserById(extractedToken.user_id);
    return user;
}