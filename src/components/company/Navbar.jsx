import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className=" text-white px-10 py-4 flex justify-between items-center bg-[#0d0c22]">
      <div className="flex items-center gap-5">
        <span className="text-2xl font-medium">
          JobFinder
          <span className="text-lg font-normal">{` for `}</span>
          <span className="text-xl font-light">Business</span>
        </span>
      </div>

      <div className="flex items-center gap-10">
        <ul className="flex gap-4 text-lg  ">
          <li>
            <button
              onClick={() => navigate("/company/requirement")}
              className="text-[0.9rem] hover:bg-button_hover_color flex items-center gap-2 py-2 px-4 rounded-md font-poppins uppercase font-light"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[1.2rem] h-[1.2rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                />
              </svg>
              Đăng tin
            </button>
          </li>

          <li>
            <button className="text-[0.9rem] hover:bg-button_hover_color items-center flex gap-2 py-2 px-4 rounded-md font-poppins uppercase font-light">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[1.2rem] h-[1.2rem]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              Tìm CV
            </button>
          </li>
        </ul>
        <img
          src="/blankAvatar.png"
          alt="avatar"
          className="w-7 h-7 rounded-full object-cover"
        />
      </div>
    </div>
  );
}
export default Navbar;
