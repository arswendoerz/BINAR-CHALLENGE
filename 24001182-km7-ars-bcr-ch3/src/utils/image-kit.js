const ImageKit = require("imagekit");

// Image kit init
const imagekit = new ImageKit({
    publicKey: "public_pHgQxba9uoNPiyGk2QPA1UdHR/w=",
    privateKey: "private_zH7cbr3jy9zptTDgxJDe78ZiGC8=",
    urlEndpoint: "https://ik.imagekit.io/arswendoerza"
});

const imageUpload = async (file) => {
    const result = await imagekit.upload({
        file: file.data, 
        fileName: file.name 
    });
    return result.url; 
};

module.exports = { imageUpload };
