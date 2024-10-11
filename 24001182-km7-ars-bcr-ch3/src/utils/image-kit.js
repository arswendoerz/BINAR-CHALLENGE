const ImageKit = require("imagekit");

// Image kit init
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

const imageUpload = async (file) => {
    const result = await imagekit.upload({
        file: file.data, 
        fileName: file.name 
    });
    return result.url; 
};

module.exports = { imageUpload };