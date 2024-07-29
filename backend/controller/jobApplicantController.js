import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import jobApplicantModel from "../models/jobApplicantModel.js";
import { upload } from "../middleware/uploadMiddleware.js";
import { v2 as cloudinary } from "cloudinary";

// Get __filename and __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to clean up files in case of errors or retries
const cleanupFiles = (files) => {
  if (files) {
    Object.values(files).forEach((fileArray) => {
      fileArray.forEach((file) => {
        const filePath = path.resolve(__dirname, "../", file.path);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    });
  }
};

const applyForJob = async (req, res) => {
  console.log("Starting upload process...");
  upload(req, res, async (err) => {
    if (err) {
      console.error("File upload error:", err);
      cleanupFiles(req.files);
      return res.status(400).send({ message: "File upload error" });
    }

    try {
      const {
        name,
        email,
        address,
        phone,
        qualification,
        institution,
        cgpa,
        Workexperience,
        designation,
        onlinePortfolio,
        references,
        additionalComments,
        qa,
      } = req.body;

      const resume = req.files.resume ? req.files.resume[0] : null;
      const certification = req.files.certification
        ? req.files.certification[0]
        : null;
      const coverLetter = req.files.coverLetter
        ? req.files.coverLetter[0]
        : null;
      const video = req.files.video ? req.files.video[0] : null;

      if (
        !name ||
        !email ||
        !address ||
        !phone ||
        !qualification ||
        !institution ||
        !cgpa ||
        !designation ||
        !Workexperience ||
        !onlinePortfolio ||
        !video ||
        !resume
      ) {
        cleanupFiles(req.files);
        return res.status(400).send({ message: "Every field is mandatory" });
      }

      const alreadyApplied = await jobApplicantModel.findOne({
        email,
        designation,
      });
      if (alreadyApplied) {
        cleanupFiles(req.files);
        return res.status(400).send({
          success: false,
          message: "Already applied for this job",
        });
      }

      const newApplication = new jobApplicantModel({
        name,
        email,
        address,
        phone,
        qualification,
        institution,
        cgpa,
        Workexperience,
        designation,
        onlinePortfolio,
        references,
        additionalComments,
        qa,
      });

      if (resume) {
        const resumePath = path.resolve(__dirname, "../", resume.path);
        newApplication.resume = {
          data: fs.readFileSync(resumePath),
          contentType: resume.mimetype,
        };
      }

      if (certification) {
        const certificationPath = path.resolve(
          __dirname,
          "../",
          certification.path
        );
        newApplication.certification = {
          data: fs.readFileSync(certificationPath),
          contentType: certification.mimetype,
        };
      }

      if (coverLetter) {
        const coverLetterPath = path.resolve(
          __dirname,
          "../",
          coverLetter.path
        );
        newApplication.coverLetter = {
          data: fs.readFileSync(coverLetterPath),
          contentType: coverLetter.mimetype,
        };
      }

      if (video) {
        const videoPath = path.resolve(__dirname, "../", video.path);
        const videoBuffer = fs.readFileSync(videoPath);

        if (!videoBuffer || videoBuffer.length === 0) {
          console.error("Video buffer is empty");
          cleanupFiles(req.files);
          return res.status(400).send({ message: "Video buffer is empty" });
        }

        // Upload video to Cloudinary
        const videoUploadResult = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { resource_type: "video", folder: "job_applications" },
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
          uploadStream.end(videoBuffer); // Ensure the video buffer is sent correctly
        });

        newApplication.videoURL = videoUploadResult.secure_url;

        // Delete the video file from the local storage after upload
        fs.unlinkSync(videoPath);
      }

      await newApplication.save();
      res.status(200).send({
        success: true,
        message: "Application Submitted Successfully",
      });
    } catch (error) {
      console.error("Application submission error:", error);
      cleanupFiles(req.files);
      res.status(500).send({
        success: false,
        message: "Error in applying job",
        error: error.message,
      });
    }
  });
};
const getAllJobApplicantController = async (req, res) => {
  try {
    const jobApp = await jobApplicantModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Job Applicant Fetched Sucessfully",
      total: jobApp.length,
      jobApp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all jobs Applicant",
    });
  }
};
export { applyForJob, getAllJobApplicantController };
