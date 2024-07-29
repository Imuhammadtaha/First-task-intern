import express from "express";
import {
  loginController,
  registerController,
} from "../controller/authController.js";
import { requireSignin, isAdmin } from "../middleware/authMiddleware.js";

//router object
const router = express.Router();

/********************************  
|                               |
|  ROUTING                      |
|                               |
********************************/

// & REGISTRATION
router.post("/register", registerController);

//* LOGIN
router.post("/login", loginController);

//protected admin auth route
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
