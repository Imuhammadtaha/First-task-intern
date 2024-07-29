import express from "express";
import { isAdmin, requireSignin } from "../middleware/authMiddleware.js";
import {
  addExpertiseController,
  addTeamController,
  addTimeController,
  deleteExpertiseController,
  deleteTeamController,
  deleteTimeController,
  getExpertiseController,
  getHireDeveloperApp,
  getSingleExpController,
  getTeamController,
  getTimeController,
  hireDeveloperController,
  updateExpertiseController,
  updateTeamController,
  updateTimeController,
} from "../controller/areaOfExpController.js";

const router = express.Router();

/*********--------------
 *
 * & ALL POSTING ROUTES
 *
 * ------------------ */

// * ROUTE FOR ADDING EXPERTISE
// router.post("/add-exp", requireSignin, isAdmin, addExpertiseController);
router.post("/add-exp", addExpertiseController);
// * ROUTE FOR ADDING TEAM SCENARIOS
router.post("/add-team", requireSignin, isAdmin, addTeamController);
// * ROUTE FOR ADDING TEAM SCENARIOS
router.post("/add-time", requireSignin, isAdmin, addTimeController);

/*********--------------
 *
 * & ALL UPDATING ROUTES
 *
 * ------------------ */

// * ROUTE FOR UPDATE EXPERTISE
// router.put(
//   "/update-exp/:eid",
//   requireSignin,
//   isAdmin,
//   updateExpertiseController
// );

router.put("/update-exp/:eid", updateExpertiseController);
// * ROUTE FOR UPDATE TEAM
router.put("/update-team/:tid", requireSignin, isAdmin, updateTeamController);

// * ROUTE FOR UPDATE TIME
router.put("/update-time/:tid", requireSignin, isAdmin, updateTimeController);

/*********--------------
 *
 * & ALL GETTING ROUTES
 *
 * ------------------ */

// * ROUTE FOR GETTING ALL EXPERTISE
router.get("/get-all-exp", getExpertiseController);
// * ROUTE FOR GETTING ALL TEAM
router.get("/get-team", getTeamController);
// * ROUTE FOR GETTING TIME
router.get("/get-time", getTimeController);

// *  ROUTE FOR GETTING SINGLE EXP
router.get("/get-single-exp/:eid", getSingleExpController);
/*********--------------
 *
 * & ALL DELETING ROUTES
 *
 * ------------------ */

// ! ROUTE FOR DELETING EXPERTISE
// router.delete(
//   "/delete-exp/:eid",
//   requireSignin,
//   isAdmin,
//   deleteExpertiseController
// );
router.delete("/delete-exp/:eid", deleteExpertiseController);

// ! ROUTE FOR DELETING TEAM
router.delete(
  "/delete-team/:tid",
  requireSignin,
  isAdmin,
  deleteTeamController
);

// ! ROUTE FOR DELETING TIME

router.delete(
  "/delete-time/:tid",
  requireSignin,
  isAdmin,
  deleteTimeController
);

// * ROUTE FOR POSTING FORM
router.post("/hire-a-developer", hireDeveloperController);
router.get("/get-all-hire-app", getHireDeveloperApp);

export default router;
