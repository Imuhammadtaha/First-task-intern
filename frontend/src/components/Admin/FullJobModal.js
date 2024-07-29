import React, { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
// import { IoIosClose } from "react-icons/io";
import Confirmation from "./Confirmation";

import toast from "react-hot-toast";

const FullJobModal = ({ id, setid }) => {
  const [post, setPost] = useState(null);

  const [form, setForm] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getSingleJob = async () => {
      if (id) {
        try {
          const res = await axios.get(
            `http://localhost:8080/api/v1/job/get-single-job/${id}`
          );
          setPost(res.data.job);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getSingleJob();
  }, [id]);

  //STATES FOR UPDATING JOBS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contract, setContract] = useState("");
  const [duration, setDuration] = useState("");
  const [skillRequired, setSkillRequired] = useState("");
  const [preferredQualification, setPreferredQualification] = useState("");
  const [jobPostedDate, setJobPostedDate] = useState("");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setDescription(post.description);
      setContract(post.contract);
      setDuration(post.duration);
      setSkillRequired(post.skillRequired);
      setPreferredQualification(post.preferredQualification);
      setJobPostedDate(
        new Date(post.jobPostedDate).toISOString().split("T")[0]
      );
      setDeadline(new Date(post.deadline).toISOString().split("T")[0]);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Audio
          height="100"
          width="100"
          radius="10"
          color="orange"
          ariaLabel="loading"
        />
      </div>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title,
        description,
        contract,
        duration,
        skillRequired,
        preferredQualification,
        jobPostedDate: new Date(jobPostedDate).toISOString(),
        deadline: new Date(deadline).toISOString(),
      };
      const { res } = await axios.put(
        `http://localhost:8080/api/v1/job/update-job/${id}`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
      if (res) {
        toast.success("Job Updated Successfully");
      }
      toast.success("Job Updated Successfully");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setTitle("");
      setDescription("");
      setContract("");
      setDuration("");
      setSkillRequired("");
      setPreferredQualification("");
      setJobPostedDate("");
      setDeadline("");
    }
  };

  return (
    <>
      {form ? (
        <>
          <div
            className="modal  fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 pop bold"
                    id="exampleModalLabel"
                  >
                    Infinity Waves Solutions
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={() => setForm(false)}
                  />
                </div>
                <div className="modal-body">
                  <form className="w-full">
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12">
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8">
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Title
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Example"
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="col-span-full">
                            <label
                              htmlFor="description"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Description
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="description"
                                name="description"
                                rows={10}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="This Job is about.... ( Min 50 Words )"
                                autoComplete="description"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Contract
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                value={contract}
                                onChange={(e) => setContract(e.target.value)}
                                placeholder="Life-Time"
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Job-Type
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Full Time - Onsite"
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Requirements
                            </label>
                            <div className="mt-2">
                              <textarea
                                id="title"
                                name="title"
                                type="text"
                                rows={10}
                                value={skillRequired}
                                onChange={(e) =>
                                  setSkillRequired(e.target.value)
                                }
                                placeholder="Proven Experience in Web Development"
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Prefered Qualification
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="text"
                                value={preferredQualification}
                                onChange={(e) =>
                                  setPreferredQualification(e.target.value)
                                }
                                placeholder="MSCS..."
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Posted On
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="date"
                                value={jobPostedDate}
                                onChange={(e) =>
                                  setJobPostedDate(e.target.value)
                                }
                                placeholder="Example"
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="title"
                              className="mont text-left block text-sm font-medium leading-6 text-gray-900"
                            >
                              Last Date To Apply
                            </label>
                            <div className="mt-2">
                              <input
                                id="title"
                                name="title"
                                type="date"
                                value={deadline}
                                onChange={(e) => setDeadline(e.target.value)}
                                placeholder="Tomorrow"
                                autoComplete="title"
                                className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
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
        </>
      ) : (
        <>
          <div
            className="modal  fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 mont bold"
                    id="exampleModalLabel"
                  >
                    Infinity Waves Solutions
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>
                <div className="modal-body">
                  <article className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-w-3xl mx-auto mb-8">
                    <div className="flex items-center justify-between">
                      <time
                        dateTime={post.jobPostedDate}
                        className="text-sm text-gray-500 pop"
                      >
                        {new Date(post.jobPostedDate).toLocaleDateString()}
                      </time>
                      <button className="button-17 text-white">
                        {post.contract}
                      </button>
                    </div>
                    <div>
                      <div className="mt-4">
                        <h1 className="pop text-2xl font-semibold text-gray-900">
                          {post.title}
                        </h1>
                        <p className="pop text-base text-gray-600 mt-2">
                          Infinity Waves Solutions are looking for{" "}
                          <span className="l-bold mont">{post.title}</span>{" "}
                          <br />
                          <br />
                          {post.description}
                          Lorem ipsum dolor sit, amet consectetur adipisicing
                          elit. Magnam quo aspernatur ab dignissimos quibusdam,
                          illum blanditiis dolore adipisci earum fugit, impedit,
                          ipsa similique sequi magni iure porro consectetur
                          eligendi recusandae!
                        </p>
                      </div>
                      <div className="mt-4">
                        <div className="text-sm leading-6 text-gray-900">
                          <p className="font-semibold mont">Required Skills:</p>
                          <p className="text-gray-600 pop">
                            {post.skillRequired.join(", ")}
                          </p>
                          <p className="font-semibold mont">
                            Job Duration:{" "}
                            <span className="mt-1">{post.duration}</span>
                          </p>
                          <p className="font-semibold mt-2 mont">
                            Preferred Qualification: <br />
                            <span className="text-gray-600 pop">
                              {post.preferredQualification}
                            </span>
                          </p>
                          <button
                            className="button-17 mt-5 text-white"
                            onClick={() => {
                              setForm(true);
                            }}
                          >
                            Edit
                          </button>

                          <button
                            className="button-17-del  ms-5 flex-end mt-5 text-white"
                            onClick={() => {
                              setOpen(true);
                              setid(id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </div>
          </div>
          {/* CONFIRAM */}
          <Confirmation open={open} setOpen={setOpen} id={id} />
        </>
      )}
    </>
  );
};

export default FullJobModal;
