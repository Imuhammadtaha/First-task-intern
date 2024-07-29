import React, { useState, useEffect } from "react";
import AdminMenu from "../Layout/AdminMenu";
import { HiPencilAlt } from "react-icons/hi";
import { FaTrash } from "react-icons/fa";
import { Audio } from "react-loader-spinner";

import axios from "axios";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CreateExpertiseForm from "./CreateExpertiseForm";
const AdminHiring = () => {
  const [exp, setExp] = useState([]);
  const [id, setid] = useState(null);
  const [singleExp, setSingleExp] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState("none");
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("Upload a image");

  const getExpertise = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "http://localhost:8080/api/v1/hiring/get-all-exp"
      );
      if (res) {
        setExp(res.data.expertises);
        setLoading(false);
      }
      if (res.data.expertises.length > 0) {
        setid(res.data.expertises[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getExpertise();
  }, []);

  useEffect(() => {
    const getSingleExp = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/hiring/get-single-exp/${id}`
        );
        console.log(res?.data?.exp);
        setSingleExp(res?.data?.exp);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleExp();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);
      const res = await axios.put(
        `http://localhost:8080/api/v1/hiring/update-exp/${id}`,
        formData
      );
      if (res) {
        toast.success("Expertise Updating");
      }

      toast.success("Expertise Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (singleExp) {
      setTitle(singleExp.title);
      setImage(singleExp.imageBase64);
    }
  }, [singleExp]);

  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8080/api/v1/hiring/delete-exp/${id}`
      );
      toast.success("Expertise deleted successfully");
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

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
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="container-fluid">
              <div className="container-fluid text-center my-3">
                <button
                  className="button-17 w-full w-50"
                  onClick={() => setShow("show")}
                >
                  INTRODUCE NEW EXPERTISE
                </button>
              </div>
              <div className="row">
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
                    {exp.map((expertise) => (
                      <div
                        className="col-md-3 m-3"
                        onClick={() => {
                          setid(expertise._id);
                        }}
                      >
                        <div className="container d-flex ">
                          <HiPencilAlt
                            className="m-2"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            style={{ cursor: "pointer" }}
                          />
                          <FaTrash
                            color="red"
                            className="m-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => setOpen(true)}
                          />
                        </div>

                        <div
                          key={expertise._id}
                          className=" p-4 rounded-lg shadow-lg text-center block"
                          onClick={() => {}}
                        >
                          <img
                            src={expertise.imageBase64}
                            alt={expertise.title}
                            className="w-16 h-16 mx-auto object-contain rounded"
                          />
                          <h2 className="mt-4 text-xl  pop">
                            {expertise.title}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      <div
        className={`modal  fade`}
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className={`modal-dialog`}>
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 pop bold" id="exampleModalLabel">
                Infinity Waves Solutions
              </h1>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="username"
                          className="block pop text-sm font-medium leading-6 text-gray-900"
                        >
                          Title
                        </label>
                        <div className="mt-2">
                          <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                            <input
                              id="username"
                              name="username"
                              type="text"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
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
                          htmlFor="photo"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Image
                        </label>

                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                          <div className="text-center">
                            {image && (
                              <>
                                <p className="mont">Preview</p>
                                <img
                                  src={image}
                                  alt="Preview"
                                  className="container opacity-50 w-24 h-auto rounded-md shadow-sm"
                                />
                              </>
                            )}
                            <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                              <label
                                htmlFor="file-upload-resume"
                                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span className="pop">
                                  {imageName.substring(0, 10)}...
                                </span>
                                <input
                                  id="file-upload-resume"
                                  name="file-upload"
                                  accept="image/*"
                                  type="file"
                                  onChange={(e) => {
                                    setImage(e.target.files[0]);
                                    setImageName(
                                      e.target.files[0]?.name ||
                                        "Upload a image"
                                    );
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
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-100"
        style={{ position: "absolute", zIndex: "1000000" }}
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"></div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Delete This Expertise&nbsp;?
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to delete this Expertise? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className=" w-full justify-center rounded-md bg-red-600 px-3  text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <CreateExpertiseForm show={show} setShow={setShow} />
    </>
  );
};

export default AdminHiring;
