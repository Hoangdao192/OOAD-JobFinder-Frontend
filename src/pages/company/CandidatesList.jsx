import axios from "axios";
import Candidate from "components/company/Candidate";
import Authentication from "services/Authentication/Authentication";
import { example } from "./CandidatesPerPost";
import Pagination, { postsPerPage } from "components/Pagination";

const { default: Dashboard } = require("components/company/Dashboard");
const { default: React, useEffect, useState } = require("react");

function CandidatesList() {
  const [candidates, setCandidates] = useState([]);
  const [waitingCandidates, setWaitingCandidates] = useState([]);
  const [acceptedCandidates, setAcceptedCandidates] = useState([]);
  const [rejectedCandidates, setRejectedCandidates] = useState([]);

  const [activeOption, setActiveOption] = useState("Waiting");
  const companyData = Authentication.getCurrentUser();

  const [currentPage, setCurrentPage] = useState(1);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const [currentPosts, setCurrentPosts] = useState([]);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/job-application/listByCompany?companyId=${companyData.id}`,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    })
      .then((res) => {
        // setCandidates(res.data);
        console.log(res.data);
        setAcceptedCandidates(
          res.data.elements
            .filter((candidate) => {
              return candidate.status === "Accepted";
            })
            .map((item) => {
              return item.candidate;
            })
        );

        setWaitingCandidates(
          res.data.elements
            .filter((candidate) => {
              return candidate.status === "Waiting";
            })
            .map((item) => {
              return item.candidate;
            })
        );
        setRejectedCandidates(
          res.data.elements
            .filter((candidate) => {
              return candidate.status === "Rejected";
            })
            .map((item) => {
              return item.candidate;
            })
        );
        // console.log(res.data);

        switch (activeOption) {
          case "Waiting":
            setCandidates(waitingCandidates);
            break;
          case "Accepted":
            setCandidates(acceptedCandidates);
            break;
          case "Rejected":
            setCandidates(rejectedCandidates);
            break;
          default:
            break;
        }
        // setCurrentPosts(candidates?.slice(firstPostIndex, lastPostIndex));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log("SETTER");
    console.log(candidates);
    setCurrentPosts(candidates?.slice(firstPostIndex, lastPostIndex));
  }, [currentPage, candidates]);

  console.log(waitingCandidates);
  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
        <h1 className="text-text_color text-2xl font-medium mb-10">
          Danh sách ứng viên
        </h1>
        <div className="flex gap-10">
          <div>
            <button
              onClick={() => setActiveOption("Waiting")}
              className={`${
                activeOption === "Waiting"
                  ? "text-text_color"
                  : "text-text_color/50"
              } text-lg font-medium `}
            >
              <span>Đang chờ</span>
              <span className="ml-3">{waitingCandidates.length}</span>
              {activeOption === "Waiting" && (
                <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
              )}
            </button>
          </div>
          <div>
            <button
              onClick={() => setActiveOption("Accepted")}
              className={`${
                activeOption === "Accepted"
                  ? "text-text_color"
                  : "text-text_color/50"
              } text-lg font-medium `}
            >
              <span>Chấp nhận</span>
              <span className="ml-3">{acceptedCandidates.length}</span>
              {activeOption === "Accepted" && (
                <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
              )}
            </button>
          </div>
          <div>
            <button
              onClick={() => setActiveOption("Rejected")}
              className={`${
                activeOption === "Rejected"
                  ? "text-text_color"
                  : "text-text_color/50"
              } text-lg font-medium `}
            >
              <span>Từ chối</span>
              <span className="ml-3">{rejectedCandidates.length}</span>
              {activeOption === "Rejected" && (
                <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
              )}
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-5 p-5 scrollbar-hide">
          {candidates.slice(firstPostIndex, lastPostIndex).map((candidate) => {
            return (
              <Candidate
                key={candidate.id}
                candidate={candidate}
                activeOption={activeOption}
              />
            );
          })}
        </div>
        <Pagination
          totalPosts={candidates.length}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </Dashboard>
  );
}
export default CandidatesList;
