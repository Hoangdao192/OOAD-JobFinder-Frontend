import axios from "axios";
import Pagination, { postsPerPage } from "components/Pagination";
import Footer from "components/layouts/footer/Footer";
import Authentication from "services/Authentication/Authentication";

const { default: HomeHeader } = require("components/layouts/header/Header");
const { default: React, useState, useEffect } = require("react");

const savedJobList = [
    {
        id: 1,
        title: "Lập trình viên react",
        company: "Công ty CMC Global",
        description:
            "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao. ",
        salary: "5-10 triệu",
        experience: "Không yêu cầu",
        type: "Full-time",
    },
    {
        id: 2,
        title: "Lập trình viên react",
        company: "Công ty CMC Global",
        description:
            "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao.Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao. Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao. ",
        salary: "5-10 triệu",
        experience: "Không yêu cầu",
        type: "Full-time",
    },
    {
        id: 3,
        title: "Lập trình viên react",
        company: "Công ty CMC Global",
        description:
            "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao. ",
        salary: "5-10 triệu",
        experience: "Không yêu cầu",
        type: "Full-time",
    },
    {
        id: 4,
        title: "Lập trình viên react",
        company: "Công ty CMC Global",
        description:
            "Lập trình viên Frontend được tham gia các dự án lớn ở công ty. Phúc lợi cao. ",
        salary: "5-10 triệu",
        experience: "Không yêu cầu",
        type: "Full-time",
    },
];
function getJobDescription(str) {
    if (str != undefined) {
        const words = str.split(" ");
        const first50Words = words.slice(0, 50).join(" ");
        return first50Words;
    } else return ""
}

function SavedJob() {
    const [currentPage, setCurrentPage] = useState(1);
    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;

    const candidateData = Authentication.getCurrentUser();

    const [savedJobs, setSavedJobs] = useState([]);
    useEffect(() => {
        axios({
            method: "get",
            url: `http://localhost:5000/api/job/save?candidateId=${candidateData.id}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res.data);
                setSavedJobs(res.data.elements);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleUnSaveJob = (jobId) => {
        axios({
            method: "delete",
            url: `http://localhost:5000/api/job/save/${jobId}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader(),
            },
        })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div className="w-full">
            <div className="h-screen w-full inset-x-0 top-0 flex justify-center bg-gray-200 space-x-5 p-5">
                <div className="relative h-full w-4/5 rounded-lg shadow-md bg-white px-10 py-5">
                    <h2 className="text-2xl text-text_color font-medium mb-5">
                        Công việc đã lưu
                    </h2>
                    {savedJobList.length === 0 ? (
                        <div className="flex justify-center mt-24 h-full">
                            <h1 className="text-xl text-text_color font-medium">
                                Bạn chưa lưu công việc nào
                            </h1>
                        </div>
                    ) : (
                        <div>
                            {savedJobs.slice(firstPostIndex, lastPostIndex)
                                .map((savedJob) => savedJob.job)
                                .map((job) => (
                                <div className="shadow-sm py-5" key={job.id}>
                                    <div className="flex justify-between items-center">
                                        <div className="flex gap-2 items-center">
                                            <img
                                                src="/avatar.png"
                                                alt=""
                                                className="h-12 w-12 rounded-full object-cover"
                                            />
                                            <div>
                                                <h1 className="text-lg font-semibold">{job.jobTitle}</h1>
                                            </div>
                                        </div>
                                        <button
                                            className="text-gray-600 hover:text-gray-800 px-2 py-1 rounded-md"
                                            onClick={() => handleUnSaveJob(job.id)}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth={1.5}
                                                stroke="currentColor"
                                                className="w-6 h-6"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    <div className="mt-2 w-5/6">
                                        <p>{`${getJobDescription(job.jobDescription)} ...`}</p>
                                        <div className="mt-2 flex gap-2">
                                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                {job.salary}
                                            </span>
                                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                {job.requireExperience}
                                            </span>
                                            <span className="bg-slate-100 px-2 py-1 rounded-md">
                                                {job.workingForm}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="absolute right-14 bottom-10">
                                <Pagination
                                    totalPosts={savedJobList.length}
                                    setCurrentPage={setCurrentPage}
                                    currentPage={currentPage}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
export default SavedJob;
