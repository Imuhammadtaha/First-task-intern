import React from "react";
import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { Audio } from "react-loader-spinner";
import { useAuth } from "../../Context/auth";
import { Slide, Fade } from "react-awesome-reveal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:8080/api/v1/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (res.data.success) {
        toast.success("Login Successful");
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
      } else {
        toast.error(res.data.message);
        console.log(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
      console.log(error);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="w-full items-center">
      <div className="container mx-auto p-4">
        <Slide>
          <Fade damping={0.1} delay={1} direction="left">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
              <div className="relative bg-gray-100 min-h-screen flex items-center justify-center overflow-hidden">
                <img src="/images/sing.png" alt="" />

                <h1 className="min-h-screen flex items-center justify-center absolute text-white text-7xl pop ">
                  LOGIN
                </h1>
              </div>

              <div className="p-4 bg-gray-100 flex flex-row items-center">
                <form className=" w-full">
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="col-span-full">
                          <label
                            htmlFor="email"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Email address
                          </label>
                          <div className="mt-2">
                            <input
                              id="email"
                              name="email"
                              type="email"
                              value={email}
                              disabled={loading}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="mail@example.com"
                              autoComplete="email"
                              required
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="password"
                            className="block pop text-sm font-medium leading-6 text-gray-900"
                          >
                            Password
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Enter Your Password"
                                autoComplete="current-password"
                                required
                                className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-x-6">
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
                        "Login"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Fade>
        </Slide>
      </div>
    </div>
  );
};

export default Login;
