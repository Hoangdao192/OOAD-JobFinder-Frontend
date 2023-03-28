import axios from "axios";
import Dashboard from "components/company/Dashboard";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";

function PostDetail({ route, navigate }) {
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/job/${location.state.id}`,
    });
  }, []);

  const post = {
    id: 1,
    jobTitle: "Nhân viên kế toán",
    jobDescription: "Lập trình viên ReactJS, có cơ hội thăng tiến, lương cao",
    numberOfHiring: 5,
    major: "IT",
    salary: "5 - 10 triệu",
    sex: "Không yêu cầu",
    requireExperience: "Dưới 1 năm",
    workingForm: "Full-time",
    closeDate: "2023-04-31",
    numberOfCV: 5,
    jobAddress: "Duong Duy Tan,phuong Dich Vong Hau, quan Cau Giay, Ha Noi",
  };

  const handleDelete = () => {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/job/${location.state.id}`,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    });
  };

  const location = useLocation();
  return (
    <Dashboard>
      <div className="pl-10 w-full bg-white m-5 rounded-md shadow-md p-5">
        <h1 className="text-2xl font-medium mb-5">{post.jobTitle}</h1>

        <div className="flex gap-40 py-5">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Mức lương</p>
              <p>{post.salary}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Hình thức làm việc</p>
              <p>{post.workingForm}</p>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Số lượng tuyển</p>
              <p>{`${post.numberOfHiring} người`}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Giới tính</p>
              <p>{post.sex}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Kinh nghiệm</p>
              <p>{post.requireExperience}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-lg font-medium">Ngày đóng đơn</p>
              <p>{post.closeDate}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="text-lg font-medium ">Địa điểm làm việc</p>
          <p>{post.jobAddress}</p>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <p className="text-lg font-medium ">Mô tả</p>
          <p>{post.jobDescription}</p>
        </div>

        <div className="flex gap-10 mt-10">
          <button className="py-1 text-lg px-8 bg-background_color rounded-xl text-white hover:bg-background_color_hover">
            Sửa
          </button>

          <button
            className="py-1 text-lg px-8 bg-red-500 rounded-xl text-white hover:bg-red-700"
            onClick={() => handleDelete()}
          >
            Xóa
          </button>
        </div>

        <div className=" mt-10 border-t pt-10 ">
          <button className="text-lg font-medium flex gap-2 items-center hover:text-text_color/80">
            Danh sách ứng viên
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
                d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </Dashboard>
  );
}
export default PostDetail;
