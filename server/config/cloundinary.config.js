const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png", "gif"],
  params: {
    folder: "Ecommer_TVT",
    resource_type: "auto",
    timestamp: () => Math.round(new Date().getTime() / 1000),
    transformation: [{ width: 1000, height: 1000, crop: "limit" }],
  },
});

const uploadCloud = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = uploadCloud;
