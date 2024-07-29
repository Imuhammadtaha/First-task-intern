import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const CreateJobForm = ({ show }) => {
  //STATES FOR UPDATING JOBS
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contract, setContract] = useState("");
  const [duration, setDuration] = useState("");
  const [skillRequired, setSkillRequired] = useState("");
  const [preferredQualification, setPreferredQualification] = useState("");
  const [jobPostedDate, setJobPostedDate] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        title,
        description,
        contract,
        duration,
        skillRequired,
        preferredQualification,
        jobPostedDate,
        deadline,
      };
      const { res } = await axios.post(
        `http://localhost:8080/api/v1/job/post-job`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res?.data) {
        toast.success(res?.data?.message);
      }
      toast.success("Job Created Successfully");
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
      <div className="bg-slate-50 py-0 sm:py-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <section className={`${show}`}>
            <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="special noto text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                To the Infinity Waves
              </h2>
            </div>
            <hr className="mt-5 text-gray-900" />
            <div className="w-full bg-slate-50">
              <div className="container">
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
                              onChange={(e) => setSkillRequired(e.target.value)}
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
                              onChange={(e) => setJobPostedDate(e.target.value)}
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
                      onClick={handleSubmit}
                    >
                      Post Job
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CreateJobForm;
