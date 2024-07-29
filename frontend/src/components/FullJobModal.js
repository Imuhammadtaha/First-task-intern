import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./ContactForm";
import { Audio } from "react-loader-spinner";

const FullJobModal = ({ id, setId }) => {
  const [post, setPost] = useState(null);
  const [show, setShow] = useState("none");
  const [desg, setdesg] = useState(" ");

  useEffect(() => {
    const getSingleJob = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/v1/job/get-single-job/${id}`
        );
        setPost(res.data.job);
      } catch (error) {
        console.log(error);
      }
    };

    getSingleJob();
  }, [id]);

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

  return (
    <>
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
              <h1 className="modal-title fs-5 mont bold" id="exampleModalLabel">
                Infinity Waves Solutions
              </h1>
              <button
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
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
                      <span className="l-bold mont">{post.title}</span> <br />
                      <br />
                      {post.description}
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Magnam quo aspernatur ab dignissimos quibusdam, illum
                      blanditiis dolore adipisci earum fugit, impedit, ipsa
                      similique sequi magni iure porro consectetur eligendi
                      recusandae!
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
                        data-bs-dismiss="modal"
                        aria-label="Close"
                        onClick={() => {
                          setShow("show");
                          setdesg(post.title);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
      <ContactForm show={show} desg={desg} />
    </>
  );
};

export default FullJobModal;
