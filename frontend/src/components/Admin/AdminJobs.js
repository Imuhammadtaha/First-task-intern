import { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";
import FullJobModal from "./FullJobModal";
import AdminMenu from "../Layout/AdminMenu";
import CreateJobForm from "./CreateJobForm";
import { Audio } from "react-loader-spinner";

const JobListing = () => {
  const [posts, setPosts] = useState([]);
  const [id, setid] = useState(null);
  const [show, setshow] = useState("none");
  const [loading, setLoading] = useState(false);

  const getJobs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:8080/api/v1/job/get-jobs");
      setPosts(res.data.jobs);
      // Set the initial id to the first job's id if there are any jobs
      if (res.data.jobs.length > 0) {
        setid(res.data.jobs[0]._id);
      }
      if (res) {
        setLoading(false);
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
            <div className="container-fluid text-center">
              <button
                className="button-17 w-full w-50"
                onClick={() => setshow("show")}
              >
                CREATE A JOB
              </button>
            </div>
            <section>
              <div className="bg-slate-50 ">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                  <Fade>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-300 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
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
                                  {new Date(
                                    post.jobPostedDate
                                  ).toLocaleDateString()}
                                </time>
                              </div>
                              <div>
                                <div className="mt-4">
                                  <h1 className="pop text-2xl font-semibold text-gray-900">
                                    {post.title}
                                  </h1>
                                  <p className="pop text-base text-gray-600 mt-2">
                                    Infinity waves Solutions are looking for{" "}
                                    <span className="l-bold mont">
                                      {post.title}
                                    </span>{" "}
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
                        </>
                      )}
                    </div>
                  </Fade>
                </div>
              </div>
            </section>

            <FullJobModal id={id} setid={setid} />
            <CreateJobForm show={show} />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobListing;
