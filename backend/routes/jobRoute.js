import express from "express";
import {
  deleteJob,
  getJob,
  getSingleJob,
  postJob,
  updateJob,
} from "../controller/jobController.js";
// import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

/********************************  
|                               |
|   Routing                     |
|                               |
********************************/

// ^ POST JOB
// router.post("/post-job", requireSignin, isAdmin, postJob);
router.post("/post-job", postJob);

// & UPDATE JOB

// router.put("/update-job/:jid", requireSignin, isAdmin, updateJob);
router.put("/update-job/:jid", updateJob);

// ! DELETE JOB
// router.delete("/delete-job/:jid", requireSignin, isAdmin, deleteJob);
router.delete("/delete-job/:jid", deleteJob);

// * GET JOBS
router.get("/get-jobs", getJob);

// & GET SINGLE JOB
router.get("/get-single-job/:jid", getSingleJob);
export default router;
