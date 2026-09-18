import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

cloudinary.config({
  cloud_name: ENV.cloudinary_cloud_name,
  api_key: ENV.cloudinary_api_key,
  api_secret: ENV.cloudinary_api_secret,
});

export { cloudinary };
