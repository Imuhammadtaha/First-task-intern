import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import fs from "fs";

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Ensure directories exist
const ensureDirExists = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Cloudinary storage for video
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "job_applications",
    resource_type: "video",
    format: async () => "mp4",
    public_id: (req, file) => `${Date.now()}_${file.originalname}`,
  },
});

// Memory storage for PDFs
const pdfStorage = multer.memoryStorage();

// Combined multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = file.mimetype.startsWith("video/")
      ? "./uploads/videos"
      : "./uploads/pdfs";
    ensureDirExists(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype.startsWith("video/") ||
      file.mimetype === "application/pdf"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDFs and videos are allowed"));
    }
  },
}).fields([
  { name: "resume", maxCount: 1 },
  { name: "certification", maxCount: 1 },
  { name: "coverLetter", maxCount: 1 },
  { name: "video", maxCount: 1 },
]);

export { upload };
