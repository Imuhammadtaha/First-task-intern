import React, { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import FullJobModal from "./FullJobModal";

const JobListing = () => {
  const [posts, setPosts] = useState([]);
  const [id, setid] = useState(null);

  const getJobs = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/v1/job/get-jobs");
      setPosts(res.data.jobs);
      if (res.data.jobs.length > 0) {
        setid(res.data.jobs[0]._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getJobs();
  }, []);

  return (
    <>
      <section>
        <div className="bg-slate-50 ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <Fade>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {posts.map((post) => (
                  <article
                    key={post._id}
                    className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between max-w-3xl mx-auto mb-8"
                  >
                    <div className="flex items-center justify-between">
                      <button className="button-17-1">
                        <small className="bold">Posted On</small>
                      </button>

                      <time
                        dateTime={post.jobPostedDate}
                        className="text-sm text-gray-500 pop"
                      >
                        {new Date(post.jobPostedDate).toLocaleDateString()}
                      </time>
                    </div>
                    <div>
                      <div className="mt-4">
                        <h1 className="pop text-2xl font-semibold text-gray-900">
                          {post.title}
                        </h1>
                        <p className="pop text-base text-gray-600 mt-2">
                          Infinity waves Solutions are looking for{" "}
                          <span className="l-bold mont">{post.title}</span>{" "}
                          <br />
                        </p>
                      </div>
                    </div>

                    <button
                      className="button-17 mt-3"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => {
                        setid(post._id);
                      }}
                    >
                      See more &darr;
                    </button>
                  </article>
                ))}
              </div>
            </Fade>
          </div>
        </div>
      </section>

      {id && <FullJobModal id={id} setId={setid} />}
    </>
  );
};

export default JobListing;
