import Post from "../../components/company/Post";

const { default: Dashboard } = require("components/company/Dashboard");
const { default: React, useState } = require("react");

export default function Posts() {
  const activePosts = [
    {
      id: 1,
      jobTitle: "Front-end Developer",
      jobDescription: "Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao",
      numberOfHiring: 5,
      major: "IT",
      salary: "5 - 10 triệu",
      sex: "Không yêu cầu",
      requireExperience: "Dưới 1 năm",
      workingForm: "Full-time",
      expired: "2023-04-31",
      numberOfCV: 5,
    },
    {
      id: 2,
      jobTitle: "Back-end Developer",
      jobDescription: "Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao",
      numberOfHiring: 5,
      major: "IT",
      salary: "5 - 10 triệu",
      sex: "Không yêu cầu",
      requireExperience: "Dưới 1 năm",
      workingForm: "Full-time",
      expired: "2023-04-31",
      numberOfCV: 5,
    },
    {
      id: 3,
      jobTitle: "Front-end Developer",
      jobDescription:
        "Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao, Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao, Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao, Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao,Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao,Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao,Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao, ",
      numberOfHiring: 5,
      major: "IT",
      salary: "5 - 10 triệu",
      sex: "Không yêu cầu",
      requireExperience: "Dưới 1 năm",
      workingForm: "Full-time",
      expired: "2023-04-31",
      numberOfCV: 5,
    },
    {
      id: 4,
      jobTitle: "Front-end Developer",
      jobDescription: "Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao",
      numberOfHiring: 5,
      major: "IT",
      salary: "5 - 10 triệu",
      sex: "Không yêu cầu",
      requireExperience: "Dưới 1 năm",
      workingForm: "Full-time",
      expired: "2023-04-31",
      numberOfCV: 5,
    },
  ];
  const expiredPosts = [
    {
      id: 1,
      jobTitle: "Nhân viên kế toán",
      jobDescription: "Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao",
      numberOfHiring: 5,
      major: "IT",
      salary: "5 - 10 triệu",
      sex: "Không yêu cầu",
      requireExperience: "Dưới 1 năm",
      workingForm: "Full-time",
      expired: "2023-04-31",
      numberOfCV: 5,
    },
  ];

  const [isPressedActive, setIsPressedActive] = useState(true);
  const [isPressedExpired, setIsPressedExpired] = useState(false);
  const handleActivePosts = () => {
    setIsPressedActive(true);
    setIsPressedExpired(false);
  };
  const handleExpiredPosts = () => {
    setIsPressedExpired(true);
    setIsPressedActive(false);
  };

  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5">
        <h1 className="text-3xl font-semibold text-text_color mb-10">
          Tin tuyển dụng
        </h1>
        <div className="flex gap-10">
          <button
            onClick={() => handleActivePosts()}
            className={`${
              isPressedActive ? "text-text_color" : "text-text_color/50"
            } text-xl font-medium `}
          >
            Tin hoạt động
            {isPressedActive && (
              <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
            )}
          </button>
          <button
            onClick={() => handleExpiredPosts()}
            className={`${
              isPressedExpired ? "text-text_color" : "text-text_color/50"
            } text-xl font-medium `}
          >
            Tin hết hạn
            {isPressedExpired && (
              <div className="w-full h-2 bg-purple-300 mt-2 rounded-xl"></div>
            )}
          </button>
        </div>
        <div className="m-5 overflow-y-scroll h-3/4 scrollbar-hide flex flex-col gap-3">
          {isPressedActive &&
            activePosts.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
          {isPressedExpired &&
            expiredPosts.map((post) => {
              return <Post key={post.id} post={post} />;
            })}
        </div>
      </div>
    </Dashboard>
  );
}
