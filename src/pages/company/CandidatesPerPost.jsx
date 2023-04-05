import axios from "axios";
import Candidate from "components/company/Candidate";
import Dashboard from "components/company/Dashboard";
import Post from "components/company/Post";
import React, { useEffect, useReducer, useState } from "react";
import { useLocation } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";
export const example = [
  {
    id: 1,
    fullName: "Thanh Huyen",
    sex: "Female",
    dateOfBirth: "2002-02-19",
    contactEmail: "20020420@vnu.edu.vn",
    phoneNumber: "0981964337",
    selfDescription:
      "Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN, Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN, Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN, Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN",
    avatar: "/avatar.png",
  },
  {
    id: 2,
    fullName: "Nguyen Thanh Huyen",
    sex: "Female",
    dateOfBirth: "2002-02-19",
    contactEmail: "20020420@vnu.edu.vn",
    phoneNumber: "0981964337",
    selfDescription:
      "Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN",
    avatar: "/avatar.png",
  },
  {
    id: 3,
    fullName: "Thanh Huyen 1110",
    sex: "Female",
    dateOfBirth: "2002-02-19",
    contactEmail: "20020420@vnu.edu.vn",
    phoneNumber: "0981964337",
    selfDescription:
      "Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN",
    avatar: "/avatar.png",
  },
  {
    id: 4,
    fullName: "Thanh Huyen 2",
    sex: "Female",
    dateOfBirth: "2002-02-19",
    contactEmail: "20020420@vnu.edu.vn",
    phoneNumber: "0981964337",
    selfDescription:
      "Sinh viên năm 3, ngành Công nghệ thông tin, trường Đại học Công nghệ - ĐHQGHN",
    avatar: "/avatar.png",
  },
];
function CandidatesPerPost({ route, navigation }) {
  const location = useLocation();

  const [candidates, setCandidates] = useState(example);
  const [waitingCandidates, setWaitingCandidates] = useState([]);
  const [acceptedCandidates, setAcceptedCandidates] = useState([]);
  const [rejectedCandidates, setRejectedCandidates] = useState([]);

  const [activeOption, setActiveOption] = useState("Waiting");

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/job-application?jobId=${location.state.post.id}`,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    })
      .then((res) => {
        // setCandidates(res.data);
        setAcceptedCandidates(
          res.data.filter((candidate) => {
            return candidate.status === "Accepted";
          })
        );

        setWaitingCandidates(
          res.data.filter((candidate) => {
            return candidate.status === "Waiting";
          })
        );
        setRejectedCandidates(
          res.data.filter((candidate) => {
            return candidate.status === "Rejected";
          })
        );
        console.log(res.data);

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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [activeOption, acceptedCandidates, waitingCandidates, rejectedCandidates]);

  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
        <Post post={location.state.post} />
        <div className="flex flex-col gap-5 mt-10">
          <h1 className="text-xl font-medium ">Danh sách ứng viên</h1>

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

          <div className="flex flex-col gap-5  scrollbar-hide">
            {candidates.map((candidate) => {
              return (
                <Candidate
                  key={candidate.id}
                  candidate={candidate}
                  activeOption={activeOption}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
export default CandidatesPerPost;
