import "./App.css";
import { Routes, Route } from "react-router-dom";

import CareerPage from "./pages/CareerPage";
// import AdminRoute from "./components/Routes/AdminRoutes";
// import Login from "./pages/Auth/Login";
// import Jobs from "./pages/Admin/Jobs";
import HireDeveloper from "./pages/HireDeveloper";
import HireDeveloper1 from "./pages/HireDeveloper1";
import HireDeveloper2 from "./pages/HireDeveloper2";
import HireDeveloperForm from "./pages/HireDeveloperForm";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminJobs from "./components/Admin/AdminJobs";
import AdminHiring from "./components/Admin/AdminHiring";
import AllJobApplicants from "./components/Admin/AllJobApplicants";
import AllClientsLookForHire from "./components/Admin/AllClientsLookForHire";

function App() {
  return (
    <>
      <Routes>
        <Route path="/hire" element={<HireDeveloper />} />
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/hireDeveloper-progress-1" element={<HireDeveloper1 />} />
        <Route path="/hireDeveloper-progress-2" element={<HireDeveloper2 />} />
        <Route path="/hireDeveloper-form" element={<HireDeveloperForm />} />

        <Route path="/career" element={<CareerPage />} />

        {/* <Route path="/dashboard" element={<AdminRoute />}> */}
        {/* <Route path="admin/jobs" element={<Jobs />} /> */}
        {/* </Route> */}

        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/dashboard/adminJobs" element={<AdminJobs />} />
        <Route path="/dashboard/hireDeveloper" element={<AdminHiring />} />
        <Route
          path="/dashboard/alljobapplicants"
          element={<AllJobApplicants />}
        />
        <Route
          path="/dashboard/all-clients-looking-to-hire"
          element={<AllClientsLookForHire />}
        />
      </Routes>
    </>
  );
}

export default App;
