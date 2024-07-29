import jobsModel from "../models/jobsModel.js";

/********************************  
|                               |
|   1. POST JOB                 |
|                               |
********************************/
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      contract,
      duration,
      skillRequired,
      preferredQualification,
      jobPostedDate,
      deadline,
    } = req.body;

    // Validations
    if (
      !title ||
      !description ||
      !contract ||
      !duration ||
      !skillRequired ||
      !preferredQualification ||
      !deadline
    ) {
      return res.status(400).send({ message: "All credentials are required" });
    }

    // Check for existing job with same title, description, and duration
    const existingJob = await jobsModel.findOne({
      title,
      description,
      duration,
    });
    if (existingJob) {
      return res.status(400).send({
        message:
          "Job with the same title, description, and duration already exists.",
      });
    }

    // Create new job
    const newJob = new jobsModel({
      title,
      description,
      contract,
      duration,
      skillRequired,
      preferredQualification,
      jobPostedDate,
      deadline,
    });

    // Save job to the database
    await newJob.save();

    res.status(201).send({
      success: true,
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in posting job",
      error: error.message,
    });
  }
};

/********************************  
|                               |
|  2. UPDATE JOB                |
|                               |
********************************/
export const updateJob = async (req, res) => {
  try {
    const {
      title,
      description,
      contract,
      duration,
      skillRequired,
      preferredQualification,
      jobPostedDate,
      deadline,
    } = req.body;

    // Validations
    if (!title) {
      return res.status(400).send({ message: "Title is required" });
    }
    if (!description) {
      return res.status(400).send({ message: "Description is required" });
    }
    if (!contract) {
      return res.status(400).send({ message: "Contract type is required" });
    }
    if (!duration) {
      return res.status(400).send({ message: "Duration is required" });
    }
    if (!skillRequired) {
      return res.status(400).send({ message: "Skills required are mandatory" });
    }
    if (!preferredQualification) {
      return res
        .status(400)
        .send({ message: "Preferred qualification is required" });
    }
    if (!jobPostedDate) {
      return res.status(400).send({ message: "Job posted date is required" });
    }
    if (!deadline) {
      return res.status(400).send({ message: "Deadline is required" });
    }

    const job = await jobsModel.findByIdAndUpdate(
      req.params.jid,
      {
        ...req.body,
      },
      { new: true }
    );

    if (!job) {
      return res.status(404).send({ message: "Job not found" });
    }
    await job.save();

    res.status(200).send({
      success: true,
      message: "Job updated successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating job",
      error: error.message,
    });
  }
};

/********************************  
|                               |
|   3. DELETE JOB               |
|                               |
********************************/

export const deleteJob = async (req, res) => {
  try {
    await jobsModel.findByIdAndDelete(req.params.jid);
    res.status(200).send({
      success: true,
      message: "Job deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(404).send({
      success: false,
      error,
      message: "Error in deleting job",
    });
  }
};

/********************************  
|                               |
|  4. GET JOBS                  |
|                               |
********************************/

export const getJob = async (req, res) => {
  try {
    const jobs = await jobsModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "ALL JOBS",
      total: jobs.length,
      jobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all jobs",
      error: error.message,
    });
  }
};

/********************************  
|                               |
|  5. SINGLE JOB                |
|                               |
********************************/

export const getSingleJob = async (req, res) => {
  try {
    const job = await jobsModel.findById(req.params.jid);
    if (!job) {
      return res.status(404).send({
        success: false,
        message: "Job not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Job retrieved successfully",
      job,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting job",
      error: error.message,
    });
  }
};
