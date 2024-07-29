import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Audio } from "react-loader-spinner";

const ContactForm = ({ show, desg }) => {
  //loader
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [institution, setInstitution] = useState("");
  const [cgpa, setCgpa] = useState("");
  const [Workexperience, setWorkexperience] = useState("");
  const [designation, setDesignation] = useState(desg);
  const [onlinePortfolio, setOnlinePortfolio] = useState("");
  const [references, setReferences] = useState("");
  const [qa, setQA] = useState("");
  const [resume, setResume] = useState("");
  const [certification, setCertification] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [video, setVideo] = useState("");
  const [additionalComments, setAdditionalComments] = useState("");

  const [resumeFileName, setResumeFileName] = useState("Upload a file");
  const [coverLetterFileName, setCoverLetterFileName] =
    useState("Upload a file");
  const [certificationFileName, setCertificationFileName] =
    useState("Upload a PDF");
  const [videoFileName, setVideoFileName] = useState("Upload a 60 sec Video");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("address", address);
      formData.append("qualification", qualification);
      formData.append("institution", institution);
      formData.append("cgpa", cgpa);
      formData.append("Workexperience", Workexperience);
      formData.append("designation", designation);
      formData.append("onlinePortfolio", onlinePortfolio);
      formData.append("references", references);
      formData.append("qa", qa);
      formData.append("resume", resume);
      formData.append("certification", certification);
      formData.append("coverLetter", coverLetter);
      formData.append("video", video);
      formData.append("additionalComments", additionalComments);

      const res = await axios.post(
        `http://localhost:8080/api/v1/apply/apply-job`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res) {
        toast.success("Response Sent Successfully");
      } else {
        toast.error(res?.data?.message);
        console.log(res?.response?.message);
      }
    } catch (error) {
      toast.error(error?.message);
      console.log(error);
    } finally {
      setLoading(false);
      setName("");
      setCoverLetterFileName("Upload a Pdf");
      setCertificationFileName("Upload a Pdf");
      setResumeFileName("Upload a Pdf");
      setVideo("");
      setQA("");
      setReferences("");
      setCoverLetter("");
      setEmail("");
      setCertification("");
      setPhone("");
      setOnlinePortfolio("");
      setAddress("");
      setQualification("");
      setInstitution("");
      setCgpa("");
      setWorkexperience("");
      setDesignation("");
      setResume("");
      setAdditionalComments("");
      setVideoFileName("Upload a Video");
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
              <p className="mt-2 text-lg leading-8 text-gray-900">
                Reach Out and Let's Innovate Together .
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
                            htmlFor="username"
                            className="block pop text-sm font-medium leading-6 text-gray-900"
                          >
                            Full Name
                          </label>
                          <div className="mt-2">
                            <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                              <input
                                id="username"
                                name="username"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="Enter Your Name"
                                autoComplete="username"
                                required
                                disabled={loading}
                                className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="sm:col-span-4">
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
                            htmlFor="street-address"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Street address
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="street-address"
                              type="text"
                              value={address}
                              disabled={loading}
                              required
                              onChange={(e) => setAddress(e.target.value)}
                              placeholder="New York, United States"
                              autoComplete="street-address"
                              className="px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="phone"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Phone no.
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="phone"
                              type="number"
                              value={phone}
                              disabled={loading}
                              required
                              onChange={(e) => setPhone(e.target.value)}
                              placeholder="+92 987654321"
                              autoComplete="street-address"
                              className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="qualification"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Qualification
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="text"
                              required
                              type="text"
                              disabled={loading}
                              value={qualification}
                              onChange={(e) => setQualification(e.target.value)}
                              placeholder="Your Qualification"
                              autoComplete="street-address"
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="instituion"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Instituion
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="text"
                              type="text"
                              disabled={loading}
                              required
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              placeholder="Your Instituion"
                              autoComplete="street-address"
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="phone"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            CGPA
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="phone"
                              type="number"
                              disabled={loading}
                              required
                              value={cgpa}
                              onChange={(e) => setCgpa(e.target.value)}
                              placeholder="Enter Your CGPA"
                              autoComplete="street-address"
                              className="px-2 pop block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="about"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Work Experience
                          </label>
                          <div className="mt-2">
                            <textarea
                              id="about"
                              name="about"
                              rows={3}
                              required
                              disabled={loading}
                              value={Workexperience}
                              onChange={(e) =>
                                setWorkexperience(e.target.value)
                              }
                              className="block pop px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              defaultValue={""}
                            />
                          </div>
                          <p className="pop mt-3 text-sm leading-6 text-gray-600">
                            Write a few sentences about your work experience.
                          </p>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="instituion"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Designation
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="text"
                              type="text"
                              value={desg}
                              disabled
                              placeholder="Seat You're applying for"
                              autoComplete="street-address"
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="instituion"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Online Portfolio
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="text"
                              type="text"
                              value={onlinePortfolio}
                              disabled={loading}
                              required
                              onChange={(e) =>
                                setOnlinePortfolio(e.target.value)
                              }
                              placeholder="www.onlineportfolioexample.com"
                              autoComplete="street-address"
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="photo"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Resume
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                                <label
                                  htmlFor="file-upload-resume"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span className="pop">{resumeFileName}</span>
                                  <input
                                    id="file-upload-resume"
                                    name="file-upload"
                                    accept="application/pdf"
                                    type="file"
                                    required
                                    disabled={loading}
                                    onChange={(e) => {
                                      setResume(e.target.files[0]);
                                      setResumeFileName(
                                        e.target.files[0]?.name ||
                                          "Upload a PDF"
                                      );
                                    }}
                                    className="bg-white sr-only"
                                  />
                                </label>
                                <p className="pl-1 pop">or drag and drop</p>
                              </div>
                              <p className="pop text-xs leading-5 text-gray-600">
                                PDF only
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="col-span-full">
                          <label
                            htmlFor="cover-letter-upload"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cover Letter * (Optional)
                          </label>

                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="cover-letter-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span className="pop">
                                    {coverLetterFileName}
                                  </span>

                                  <input
                                    id="cover-letter-upload"
                                    accept="application/pdf"
                                    name="cover-letter-upload"
                                    disabled={loading}
                                    onChange={(e) => {
                                      setCoverLetter(e.target.files[0]);
                                      setCoverLetterFileName(
                                        e.target.files[0]?.name ||
                                          "Upload a PDF"
                                      );
                                    }}
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1 pop">or drag and drop</p>
                              </div>
                              <p className="pop text-xs leading-5 text-gray-600">
                                PDF only
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="certification-upload"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Any Certification * (Optional)
                          </label>

                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="certification-upload"
                                  className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500 py-0"
                                >
                                  <span className="pop justify-content-center d-flex flex-column">
                                    {certificationFileName}
                                  </span>
                                  <input
                                    id="certification-upload"
                                    accept="application/pdf"
                                    name="certification-upload"
                                    disabled={loading}
                                    onChange={(e) => {
                                      setCertification(e.target.files[0]);
                                      setCertificationFileName(
                                        e.target.files[0]?.name ||
                                          "Upload a PDF"
                                      );
                                    }}
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="sm:col-span-4">
                          <label
                            htmlFor="refer"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Any References * (Optional)
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="text"
                              type="text"
                              value={references}
                              disabled={loading}
                              onChange={(e) => setReferences(e.target.value)}
                              placeholder="Know someone who can refer you?"
                              autoComplete="street-address"
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-4">
                          <label
                            htmlFor="refer"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Any Question
                          </label>
                          <div className="mt-2">
                            <input
                              id="street-address"
                              name="text"
                              type="text"
                              disabled={loading}
                              value={qa}
                              onChange={(e) => setQA(e.target.value)}
                              placeholder="What do you expect from us?"
                              autoComplete="street-address"
                              className="pop px-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="col-span-full">
                          <label
                            htmlFor="cover-photo"
                            className="pop block text-sm font-medium leading-6 text-gray-900"
                          >
                            Short Video
                          </label>

                          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                            <div className="text-center">
                              <div className="pop mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                  htmlFor="file-upload"
                                  className="pop relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                  <span className="pop">{videoFileName}</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    accept="video/*"
                                    disabled={loading}
                                    required
                                    onChange={(e) => {
                                      setVideo(e.target.files[0]);
                                      setVideoFileName(
                                        e.target.files[0]?.name ||
                                          "Upload a PDF"
                                      );
                                    }}
                                    type="file"
                                    placeholder="Why should we consider you"
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1 pop">or drag and drop</p>
                              </div>
                              <p className="pop text-xs leading-5 text-red-900">
                                It should be less than 5Mb
                              </p>
                            </div>
                          </div>
                          <div className="col-span-full">
                            <label
                              htmlFor="refer"
                              className="pop mt-5 block text-sm font-medium leading-6 text-gray-900"
                            >
                              Additional Comments
                            </label>
                            <div className="mt-2">
                              <input
                                id="street-address"
                                name="text"
                                type="text"
                                disabled={loading}
                                value={additionalComments}
                                onChange={(e) =>
                                  setAdditionalComments(e.target.value)
                                }
                                placeholder="Any Comments?"
                                autoComplete="street-address"
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
                        "Respond"
                      )}
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

export default ContactForm;
