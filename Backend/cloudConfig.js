import cloudinary from "./utils/cloudinary.js"; // correct path
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

export const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "BlogImages",        // Cloudinary folder
    allowedFormats: ["jpeg", "png", "jpg"],
    public_id: (req, file) => {
      const name = file.originalname.split(".")[0];
      const timestamp = Date.now();
      return `${name}-${timestamp}`;
    },
  },
});


export const upload = multer({ storage });
