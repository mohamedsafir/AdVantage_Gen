const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const uploadImage = async (imageBuffer) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "advantage_gen" }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
        }).end(imageBuffer);
    });
};

module.exports = { uploadImage };