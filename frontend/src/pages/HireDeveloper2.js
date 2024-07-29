import React, { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import { Link, useLocation } from "react-router-dom";

const HireDeveloper2 = () => {
  const [time, setTime] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state } = location;
  const query = new URLSearchParams(location.search);
  const Area = state?.Area || query.get("area");
  const Team = state?.Team || query.get("team");

  const getTime = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8080/api/v1/hiring/get-time"
      );
      if (res) {
        setTime(res.data.time);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTime();
  }, []);

  return (
    <>
      <section className="bg-slate-100">
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
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="special noto big-font font-bold tracking-tight text-gray-900 text-center sm:text-4xl">
            Hire From the Infinity Waves
          </h1>
          <p className="mt-2 text-lg leading-8 text-gray-900 text-center">
            Where Expertise Meets Innovation.
          </p>
        </div>
        <hr className="container mt-5" />
        <div className="mx-auto px-5 mt-10 grid max-w-7xl grid-cols-2 gap-6 pt-10 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {loading ? (
            <>
              {" "}
              <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-10">
                <Audio
                  height="100"
                  width="100"
                  radius="10"
                  color="orange"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            </>
          ) : (
            <>
              {" "}
              {time.map((expertise) => (
                <Link
                  to={`/hireDeveloper-form?area=${Area}&team=${Team}&time=${encodeURIComponent(
                    expertise.title
                  )}`}
                >
                  <div
                    key={expertise._id}
                    className=" p-4 rounded-lg shadow-lg text-center block"
                  >
                    <img
                      src={expertise.imageBase64}
                      alt={expertise.title}
                      className="w-16 h-16 mx-auto object-contain rounded"
                    />
                    <h2 className="mt-4 text-xl  pop">{expertise.title}</h2>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <defs>
            <linearGradient id="special" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ee0979" stopOpacity="1" />
              <stop offset="100%" stopColor="#ff6a00" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            fill="url(#special)"
            d="M0,256L24,250.7C48,245,96,235,144,224C192,213,240,203,288,181.3C336,160,384,128,432,138.7C480,149,528,203,576,208C624,213,672,171,720,133.3C768,96,816,64,864,85.3C912,107,960,181,1008,213.3C1056,245,1104,235,1152,229.3C1200,224,1248,224,1296,234.7C1344,245,1392,267,1416,277.3L1440,288L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
          ></path>
        </svg>
      </section>
    </>
  );
};

export default HireDeveloper2;
