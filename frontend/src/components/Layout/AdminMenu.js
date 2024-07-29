import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div classname="text-center">
        <div className="list-group">
          <h1 className="text-2xl pop font:semibold special my-2">
            Admin Pannel
          </h1>
          <NavLink
            to="/dashboard/adminJobs"
            className="list-group-item list-group-item-action pop"
          >
            CURRENT JOBS
          </NavLink>
          <NavLink
            to="/dashboard/hireDeveloper"
            className="list-group-item list-group-item-action pop"
          >
            HIRE DEVELOPER
          </NavLink>
          <NavLink
            to="/dashboard/alljobapplicants"
            className="list-group-item list-group-item-action pop"
          >
            ALL JOB APPLICANTS
          </NavLink>
          <NavLink
            to="/dashboard/all-clients-looking-to-hire"
            className="list-group-item list-group-item-action pop"
          >
            ALL CLIENTS
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
