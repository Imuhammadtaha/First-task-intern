import express from "express";
import {
  applyForJob,
  getAllJobApplicantController,
} from "../controller/jobApplicantController.js";

const router = express.Router();

router.post("/apply-job", applyForJob);
router.get("/get-all-jobs-applicant", getAllJobApplicantController);

export default router;
