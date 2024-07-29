import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Audio } from "react-loader-spinner";
import { useLocation } from "react-router-dom";

const HireDeveloperForm = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { state } = location;
  const query = new URLSearchParams(location.search);
  const Area = state?.Area || query.get("area");
  const Team = state?.Team || query.get("team");
  const Time = state?.Team || query.get("time");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [companyWebsiteURL, setCompanyWebsiteURL] = useState("");
  const [reference, setReference] = useState("");
  const [phone, setPhone] = useState("");
  const [area, setArea] = useState(Area);
  const [team, setTeam] = useState(Team);
  const [time, setTime] = useState(Time);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("companyWebsiteURL", companyWebsiteURL);
      formData.append("reference", reference);
      formData.append("area", area);
      formData.append("team", team);
      formData.append("time", time);

      const res = await axios.post(
        `http://localhost:8080/api/v1/hiring/hire-a-developer`,
        formData
      );
      if (res) {
        toast.success("Response Sent Successfully");
      }
    } catch (error) {
      toast.error(error?.message);

      console.log(error);
    } finally {
      setName("");
      setEmail("");
      setPhone("");
      setArea("");
      setTeam("");
      setTime("");
      setCompanyWebsiteURL("");
      setReference("");
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 bg-white rounded-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <p className="text-sm mb-4 pop">
              Please provide the necessary info so we can connect you with the
              right developer/s from our network.
            </p>
            <form>
              <div className="mb-4">
                <label
                  className="pop text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  className="pop shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Your Name"
                />
              </div>
              <div className="mb-4">
                <label
                  className="pop text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  className="pop shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email Address"
                />
              </div>
              <div className="mb-4">
                <label
                  className="pop text-gray-700 text-sm font-bold mb-2"
                  htmlFor="website"
                >
                  Company Website <span className="text-red-500">*</span>
                </label>
                <input
                  className="pop shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="website"
                  value={companyWebsiteURL}
                  onChange={(e) => setCompanyWebsiteURL(e.target.value)}
                  type="url"
                  placeholder="Company Website"
                />
              </div>
              <div className="mb-4">
                <label
                  className="pop text-gray-700 text-sm font-bold mb-2"
                  htmlFor="referredBy"
                >
                  Referred By
                </label>
                <input
                  className="pop shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="website"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  type="text"
                  placeholder="Scout"
                />
              </div>
              <div className="mb-4">
                <label
                  className="pop text-gray-700 text-sm font-bold mb-2"
                  htmlFor="phone"
                >
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <div className="flex">
                  <input
                    className="pop shadow appearance-none border rounded-r w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="7400 123456"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  className="mont d-flex rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {loading ? (
                    <Audio
                      height="20"
                      width="20"
                      radius="5"
                      color="orange"
                      ariaLabel="loading"
                      wrapperStyle
                      wrapperClass
                    />
                  ) : (
                    "Respond"
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <img
              src="/images/contact.jpg"
              alt="Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
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
    </>
  );
};

export default HireDeveloperForm;
