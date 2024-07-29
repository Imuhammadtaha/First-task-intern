import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CreateExpertiseForm = ({ show, setShow }) => {
  const [expertiseTitle, setExpertiseTitle] = useState("");
  const [expertiseImage, setExpertiseImage] = useState("");
  const [expertiseImageName, setExpertiseImageName] = useState("Upload...");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", expertiseTitle);
      formData.append("image", expertiseImage);
      const res = await axios.post(
        `http://localhost:8080/api/v1/hiring/add-exp`,
        formData
      );
      if (res.data.success) {
        toast.success("Expertise Added Successfully");
        // Clear the form fields after successful submission
        setExpertiseTitle("");
        setExpertiseImage(null);
        setExpertiseImageName("Upload...");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-slate-50 py-0 sm:py-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <section className={show}>
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="special noto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              To the Infinity Waves
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-900">
              Reach Out and Let's Innovate Together.
            </p>
          </div>
          <hr className="mt-5 text-gray-900" />
          <div className="w-full bg-slate-50">
            <div className="container">
              <form>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="expertise-title"
                          className="block pop text-sm font-medium leading-6 text-gray-900"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="expertise-title"
                              name="expertise-title"
                              type="text"
                              value={expertiseTitle}
                              onChange={(e) =>
                                setExpertiseTitle(e.target.value)
                              }
                              placeholder="Enter Expertise Title"
                              autoComplete="username"
                              required
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="sm:col-span-4">
                        <label
                          htmlFor="expertise-image"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Image
                        </label>

                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                              <label
                                htmlFor="file-upload-expertise"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span className="pop">
                                  {expertiseImageName.substring(0, 10)}...
                                </span>
                                <input
                                  id="file-upload-expertise"
                                  name="file-upload"
                                  accept="image/*"
                                  type="file"
                                  onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                      setExpertiseImage(file);
                                      setExpertiseImageName(file.name);
                                    } else {
                                      setExpertiseImage(null);
                                      setExpertiseImageName("Upload...");
                                    }
                                  }}
                                  required
                                  className="bg-white sr-only"
                                />
                              </label>
                              <p className="pl-1 pop">or drag and drop</p>
                            </div>
                            <p className="pop text-xs leading-5 text-gray-600">
                              Image Only
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    type="submit"
                    className="mont d-flex rounded-md bg-orange-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={handleSubmit}
                  >
                    Add Expertise
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CreateExpertiseForm;
