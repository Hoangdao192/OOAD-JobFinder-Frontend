import axios from "axios";
import Pagination, { postsPerPage } from "components/Pagination";
import Footer from "components/layouts/footer/Footer";
import Authentication from "services/Authentication/Authentication";

const { default: HomeHeader } = require("components/layouts/header/Header");
const { default: React, useState, useEffect } = require("react");

const appliedJobList = [
  {
    id: 1,
    title: "Lập trình viên react",
    company: "Công ty CMC Global",
    description:
      "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao ...",
    salary: "5-10 triệu",
    experience: "Không yêu cầu",
    type: "Full-time",
  },
  {
    id: 2,
    title: "Lập trình viên react",
    company: "Công ty CMC Global",
    description:
      "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao ...",
    salary: "5-10 triệu",
    experience: "Không yêu cầu",
    type: "Full-time",
  },
  {
    id: 3,
    title: "Lập trình viên react",
    company: "Công ty CMC Global",
    description:
      "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao ...",
    salary: "5-10 triệu",
    experience: "Không yêu cầu",
    type: "Full-time",
  },
  {
    id: 4,
    title: "Lập trình viên react",
    company: "Công ty CMC Global",
    description:
      "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao ...",
    salary: "5-10 triệu",
    experience: "Không yêu cầu",
    type: "Full-time",
  },
];

function AppliedJob() {
  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;

  const candidateData = Authentication.getCurrentUser();

  const [appliedJobs, setAppliedJobs] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/job-application?candidateId=${candidateData.id}`,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    })
      .then((res) => {
        console.log(res.data);
        setAppliedJobs(res.data.elements);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <HomeHeader />
      <div className="h-screen inset-x-0 top-0 flex justify-center bg-gray-200 space-x-5 p-5">
        <div className="relative h-full w-4/5 rounded-lg shadow-md bg-white px-10 py-5">
          <h2 className="text-2xl text-text_color font-medium mb-5">
            Công việc đã ứng tuyển
          </h2>
          {appliedJobList.length === 0 ? (
            <div className="flex justify-center mt-24 h-full">
              <h1 className="text-xl text-text_color font-medium">
                Bạn chưa ứng công việc nào
              </h1>
            </div>
          ) : (
            <div>
              {appliedJobList
                .slice(firstPostIndex, lastPostIndex)
                .map((job) => (
                  <div className="shadow-sm py-5" key={job.id}>
                    <div className="flex gap-2 items-center">
                      <img
                        src="/avatar.png"
                        alt=""
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div>
                        <h1 className="text-lg font-semibold">{job.title}</h1>
                        <h1 className="text-gray-500">Công ty CMC Global</h1>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p>{job.description}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="bg-slate-100 px-2 py-1 rounded-md">
                          {job.salary}
                        </span>
                        <span className="bg-slate-100 px-2 py-1 rounded-md">
                          {job.experience}
                        </span>
                        <span className="bg-slate-100 px-2 py-1 rounded-md">
                          {job.type}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

              <div className="absolute right-14 bottom-10">
                <Pagination
                  totalPosts={appliedJobList.length}
                  setCurrentPage={setCurrentPage}
                  currentPage={currentPage}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AppliedJob;
