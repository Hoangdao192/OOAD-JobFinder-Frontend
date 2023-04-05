import axios from "axios";
import React, { useEffect, useState } from "react";
import { set } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Post({ post }) {
  // function to get 50 first words of job description
  function getJobDescription() {
    const words = post.jobDescription.split(" ");
    const first50Words = words.slice(0, 50).join(" ");
    return first50Words;
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/company/post/${post.id}`, { state: { id: post.id } });
  };

  const [job, setJob] = useState({});
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/job/${post.id}`,
    })
      .then((res) => {
        setJob(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div
      className="flex flex-col w-full p-5 gap-2 shadow-md rounded-md cursor-pointer"
      onClick={handleClick}
    >
      <div className="flex justify-between">
        <h1 className="text-xl font-medium">{post.jobTitle}</h1>
        <p className="text-lg font-medium text-text_color pr-10">{`${post.numberOfCV} Đơn ứng tuyển`}</p>
      </div>
      <p className="font-base">
        {`Số lượng tuyển dụng: `}
        <span>{post.numberOfHiring}</span>
      </p>
      <p className="text-base w-2/3">{`${getJobDescription()} ...`}</p>

      <div className="flex justify-between">
        <div className="flex gap-5">
          <span className="bg-purple-200 p-2 rounded-md">{post.salary}</span>
          <span className="bg-cyan-100 p-2 rounded-md">
            {post.requireExperience}
          </span>
          <span className="bg-pink-100 p-2 rounded-md">{post.workingForm}</span>
        </div>
        <p className="font-light italic pr-10">{`Ngày hết hạn: ${post.closeDate}`}</p>
      </div>
    </div>
  );
}
