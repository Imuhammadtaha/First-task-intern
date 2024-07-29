import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import jobRoute from "./routes/jobRoute.js";
import authRoute from "./routes/authRoute.js";
import jobApplicantRoute from "./routes/jobApplicantRoute.js";
import hireDeveloperRoute from "./routes/hireDeveloperRoute.js";
// import fileUpload from "express-fileupload";

// Configure Env
dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT;

// Middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(fileUpload());

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/apply", jobApplicantRoute);
app.use("/api/v1/hiring", hireDeveloperRoute);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT} at http://localhost:${PORT}`);
});
