const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_gLaTy3zgu/SPdRBfzjL1a8oAtjI=",
    privateKey : "private_Wsk6XbfJduJmuRYoZJlAPNq905c=",
    urlEndpoint : "https://ik.imagekit.io/JF24/",
});

exports.imageUpload = async (file) => {
    const uploadFile = await imagekit.upload({
        file : file.data,
        fileName : file.name,
    });
    return uploadFile?.url;
}