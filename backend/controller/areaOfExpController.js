import areaOfExpModel from "../models/areaOfExpModel.js";
import hireDeveloperFormModel from "../models/hireDeveloperFormModel.js";
import teamModel from "../models/teamModel.js";
import timeModel from "../models/timeModel.js";

/********************************  
|                               |
|  1. ADD EXPERTISE,ADD TEAM    |
|                               |
********************************/

export const addExpertiseController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const image = req.files.image;

    if (!image || !title) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }

    const exist = await areaOfExpModel.findOne({ title });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "This Expertise already Exists",
      });
    }

    const newExp = new areaOfExpModel({ title });
    if (image) {
      newExp.image.data = image.data;
      newExp.image.contentType = image.mimetype;
    }
    await newExp.save();
    res.status(200).send({
      success: true,
      message: "Expertise Added Successfully",
      newExp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In adding Expertise",
      error,
    });
  }
};

export const addTeamController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const image = req.files.image;

    if (!image || !title) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }

    const exist = await teamModel.findOne({ title });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "This No of team already Exists",
      });
    }

    const newteam = new teamModel({ title });
    if (image) {
      newteam.image.data = image.data;
      newteam.image.contentType = image.mimetype;
    }
    await newteam.save();
    res.status(200).send({
      success: true,
      message: "Team Added Successfully",
      newteam,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding team",
      error,
    });
  }
};

export const addTimeController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const image = req.files.image;

    if (!image || !title) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }

    const exist = await timeModel.findOne({ title });
    if (exist) {
      return res.status(400).send({
        success: false,
        message: "This Time already Exists",
      });
    }

    const newTime = new timeModel({ title });
    if (image) {
      newTime.image.data = image.data;
      newTime.image.contentType = image.mimetype;
    }
    await newTime.save();
    res.status(200).send({
      success: true,
      message: "Time Added Successfully",
      newTime,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in adding time",
      error,
    });
  }
};
/********************************  
|                               |
|  2. GET ALL EXPERTISE         |
|                               |
********************************/

export const getExpertiseController = async (req, res) => {
  try {
    const expertises = await areaOfExpModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "ALL Expertises",
      total: expertises.length,
      expertises,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting all Expertise",
    });
  }
};
export const getTeamController = async (req, res) => {
  try {
    const team = await teamModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "TEAMS",
      total: team.length,
      team,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting team",
    });
  }
};

export const getTimeController = async (req, res) => {
  try {
    const time = await timeModel.find({}).sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "TIME",
      total: time.length,
      time,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting time",
    });
  }
};

export const getSingleExpController = async (req, res) => {
  try {
    const exp = await areaOfExpModel.findById(req.params.eid);
    if (!exp) {
      return res.status(400).send({
        success: false,
        message: "Expertise Not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Expertise Fetched Successfully",
      exp,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Single Expertise",
      error,
    });
  }
};
/********************************  
|                               |
|  3. UPDATE ALL EXPERTISE      |
|                               |
********************************/

export const updateExpertiseController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const image = req.files.image;

    if (!image || !title) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }

    const updateData = { title };
    if (image) {
      updateData.image = {
        data: image.data,
        contentType: image.mimetype,
      };
    }

    const updateExp = await areaOfExpModel.findByIdAndUpdate(
      req.params.eid,
      updateData,
      { new: true }
    );

    if (!updateExp) {
      return res.status(404).send({ message: "Expertise not found" });
    }

    res.status(200).send({
      success: true,
      message: "Expertise updated successfully",
      updateExp,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating expertise",
      error,
    });
  }
};

export const updateTeamController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const image = req.files.image;

    if (!image || !title) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }

    const updateData = { title };
    if (image) {
      updateData.image = {
        data: image.data,
        contentType: image.mimetype,
      };
    }

    const updateTeam = await teamModel.findByIdAndUpdate(
      req.params.tid,
      updateData,
      { new: true }
    );

    if (!updateTeam) {
      return res.status(404).send({ message: "Team not found" });
    }

    res.status(200).send({
      success: true,
      message: "Team updated successfully",
      updateTeam,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating team",
      error,
    });
  }
};

export const updateTimeController = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send({ message: "No files were uploaded." });
    }

    const image = req.files.image;

    if (!image || !title) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }

    const updateData = { title };
    if (image) {
      updateData.image = {
        data: image.data,
        contentType: image.mimetype,
      };
    }

    const updateTime = await timeModel.findByIdAndUpdate(
      req.params.tid,
      updateData,
      { new: true }
    );

    if (!updateTime) {
      return res.status(404).send({ message: "Team not found" });
    }

    res.status(200).send({
      success: true,
      message: "Time updated successfully",
      updateTime,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Time",
      error,
    });
  }
};
/********************************  
|                               |
|  4. DELETE ALL EXPERTISE      |
|                               |
********************************/

export const deleteExpertiseController = async (req, res) => {
  try {
    await areaOfExpModel.findByIdAndDelete(req.params.eid);
    res.status(200).send({
      success: true,
      message: "Expertise deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting expertise",
      error,
    });
  }
};

export const deleteTeamController = async (req, res) => {
  try {
    await teamModel.findByIdAndDelete(req.params.tid);
    res.status(200).send({
      success: true,
      message: "team deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting team",
      error,
    });
  }
};

export const deleteTimeController = async (req, res) => {
  try {
    await timeModel.findByIdAndDelete(req.params.tid);
    res.status(200).send({
      success: true,
      message: "time deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting time",
      error,
    });
  }
};

/********************************  
|                               |
|  5. POST A FORM FOR HIRING    |
|                               |
********************************/

export const hireDeveloperController = async (req, res) => {
  try {
    const {
      name,
      email,
      companyWebsiteURL,
      reference,
      phone,
      area,
      team,
      time,
    } = req.body;
    if (
      !name ||
      !email ||
      !companyWebsiteURL ||
      !reference ||
      !phone ||
      !area ||
      !time ||
      !team
    ) {
      return res.status(400).send({ message: "Every field is mandatory" });
    }
    const alreadyApplied = await hireDeveloperFormModel.findOne({
      area,
      time,
      team,
    });

    if (alreadyApplied) {
      return res.status(400).send({
        success: false,
        message: "Already applied for this job",
      });
    }
    const newForm = new hireDeveloperFormModel({
      name,
      email,
      companyWebsiteURL,
      reference,
      phone,
      area,
      team,
      time,
    });
    await newForm.save();
    res.status(200).send({
      success: true,
      message: "Application Submitted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Sending Application",
      error,
    });
  }
};

export const getHireDeveloperApp = async (req, res) => {
  try {
    const hiringcan = await hireDeveloperFormModel
      .find()
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      message: "Hiring Candidates Fetched",
      total: hiringcan.length,
      hiringcan,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting Hiring Candidates",
      error,
    });
  }
};
