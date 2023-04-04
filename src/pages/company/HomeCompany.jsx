import Dashboard from "components/company/Dashboard";
import React from "react";
import Chart from "components/company/Chart";

function HomeCompany() {
  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5">
        <h1 className="text-text_color text-2xl font-medium">
          Hiệu quả tuyển dụng
        </h1>

        <ul className="flex mt-10 gap-5">
          <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-purple-100 rounded-xl">
            <p className="text-3xl font-bold text-gray-800">8</p>
            <div className="flex justify-between">
              <p className="text-base">Tin tuyển dụng đang mở</p>
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
                  d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                />
              </svg>
            </div>
          </li>

          <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-blue-100 rounded-xl">
            <p className="text-3xl font-bold text-gray-800">10</p>
            <div className="flex justify-between">
              <p className="text-base">CV tiếp nhận</p>
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
                  d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                />
              </svg>
            </div>
          </li>

          <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-cyan-100 rounded-xl">
            <p className="text-3xl font-bold text-gray-800">5</p>
            <div className="flex justify-between">
              <p className="text-base">CV phản hồi</p>
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
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </div>
          </li>

          <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-pink-100 rounded-xl">
            <p className="text-3xl font-bold text-gray-800">2</p>
            <div className="flex justify-between">
              <p className="text-base">CV ứng tuyển mới</p>
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
                  d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                />
              </svg>
            </div>
          </li>
        </ul>
        <div className="mt-20">
          <Chart />
        </div>
      </div>
    </Dashboard>
  );
}
export default HomeCompany;
