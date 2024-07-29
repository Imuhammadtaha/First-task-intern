import React, { useState, useEffect } from "react";
import AdminMenu from "../Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Audio } from "react-loader-spinner";

const AllClientsLookForHire = () => {
  const [hiringcan, setHiringcan] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllClientsLookForHire = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:8080/api/v1/hiring/get-all-hire-app`
      );
      if (res) {
        setHiringcan(res.data.hiringcan);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getAllClientsLookForHire();
  }, []);

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="special" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f58310" stopOpacity="1" />
            <stop offset="100%" stopColor="#e100ff" stopOpacity="1" />
          </linearGradient>
        </defs>
        <path
          fill="url(#special)"
          d="M0,256L24,250.7C48,245,96,235,144,224C192,213,240,203,288,181.3C336,160,384,128,432,138.7C480,149,528,203,576,208C624,213,672,171,720,133.3C768,96,816,64,864,85.3C912,107,960,181,1008,213.3C1056,245,1104,235,1152,229.3C1200,224,1248,224,1296,234.7C1344,245,1392,267,1416,277.3L1440,288L1440,0L1416,0C1392,0,1344,0,1296,0C1248,0,1200,0,1152,0C1104,0,1056,0,1008,0C960,0,912,0,864,0C816,0,768,0,720,0C672,0,624,0,576,0C528,0,480,0,432,0C384,0,336,0,288,0C240,0,192,0,144,0C96,0,48,0,24,0L0,0Z"
        ></path>
      </svg>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h2 className="text-center text-green-700 pop">
              TOTAL CLIENTS: &nbsp;{hiringcan.length}
            </h2>
            {loading ? (
              <>
                <div className="flex justify-center items-center h-screen">
                  <Audio
                    height="100"
                    width="100"
                    radius="10"
                    color="orange"
                    ariaLabel="loading"
                  />
                </div>
              </>
            ) : (
              <>
                {hiringcan.map((jobApp) => (
                  <div key={jobApp._id} className="container m-3">
                    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                      <div className="text-center mb-4">
                        <h2 className="text-2xl font-bold pop text-gray-900">
                          {jobApp.name}
                        </h2>
                        <p className="text-gray-600 pop">{jobApp.area}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg pop font-semibold text-gray-800">
                            Contact Information
                          </h3>
                          <p className="text-gray-700 pop">
                            <span className="font-medium">Email:</span>{" "}
                            {jobApp.email}
                          </p>
                          <p className="text-gray-700 pop">
                            <span className="font-medium">Phone:</span>{" "}
                            {jobApp.phone}
                          </p>
                          <p className="text-gray-700 pop">
                            <span className="font-medium">
                              Company Website:
                            </span>{" "}
                            <a
                              href={`https://${jobApp.companyWebsiteURL}`}
                              className="text-indigo-600 hover:underline"
                            >
                              {jobApp.companyWebsiteURL}
                            </a>
                          </p>
                        </div>
                        <div>
                          <h3 className="text-lg pop font-semibold text-gray-800">
                            Reference Information
                          </h3>
                          <p className="text-gray-700 pop">
                            <span className="font-medium">Reference:</span>{" "}
                            {jobApp.reference}
                          </p>
                          <p className="text-gray-700 pop">
                            <span className="font-medium">Team:</span>{" "}
                            {jobApp.team}
                          </p>
                          <p className="text-gray-700 pop">
                            <span className="font-medium">Time:</span>{" "}
                            {jobApp.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllClientsLookForHire;
