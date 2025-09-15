// controllers/upload.js
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { Readable } from "stream";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

export const uploadToCloudinary = (fileBuffer, _filename, folder) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        use_filename: true, // use original filename (without path)
        unique_filename: true, // add a unique suffix (prevents collisions)
        overwrite: false,
      },
      (error, result) => (error ? reject(error) : resolve(result))
    );

    const readable = new Readable();
    readable._read = () => {};
    readable.push(fileBuffer);
    readable.push(null);
    readable.pipe(stream);
  });
