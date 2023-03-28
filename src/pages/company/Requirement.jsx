import axios from "axios";
import Dashboard from "components/company/Dashboard";
import SelectionList from "components/company/SelectionList";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Authentication from "services/Authentication/Authentication";

function Requirement() {
  const sexList = ["Không yêu cầu", "Nam", "Nữ"];
  const majorList = ["Information Technology", "Sale", "Accountant", "Medical"];
  const requireExperienceList = [
    "Không yêu cầu",
    "Dưới 1 năm",
    "1 - 3 năm",
    "Trên 3 năm",
  ];
  const workingFormList = ["Full-time", "Part-time", "Remote"];
  const [selectedSex, setSelectedSex] = useState(sexList[0]);
  const [selectedMajor, setSelectedMajor] = useState("");
  const [selectedForm, setSelectedForm] = useState(workingFormList[0]);
  const [selectedExperience, setSelectedExperience] = useState(
    requireExperienceList[0]
  );
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    if (
      data.jobTitle === "" ||
      data.jobDescription === "" ||
      data.major === "" ||
      data.salary === "" ||
      data.numberOfHiring === ""
    ) {
      alert("Please fill all required field");
    } else {
      const formData = new FormData();

      formData.append("jobTitle", data.jobTitle);
      formData.append("jobDescription", data.jobDescription);
      formData.append("major", selectedMajor);
      formData.append("salary", data.salary);
      formData.append("numberOfHiring", data.numberOfHiring);
      formData.append("sex", selectedSex);
      formData.append("workingForm", selectedForm);
      formData.append("requireExperience", selectedExperience);
      formData.append("jobAddress", companyAddressAsString);

      // for (const value of formData.values()) {
      //   console.log(value);
      // }
      axios({
        method: "post",
        url: "http://localhost:5000/api/job",
        headers: {
          "Content-Type": "application/json",
          Authorization: Authentication.generateAuthorizationHeader(),
        },
        data: {
            jobTitle: data.jobTitle,
            jobDescription: data.jobDescription,
            major: selectedMajor,
            salary: data.salary,
            numberOfHiring: data.numberOfHiring,
            sex: selectedSex,
            workingForm: selectedForm,
            requireExperience: selectedExperience,
            jobAddress: companyAddress
        }
      })
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // useEffect(() => {
  //   if (isSubmitSuccessful) {
  //     alert("Đăng tin thành công");
  //   }
  // }, [isSubmitSuccessful]);

  const [companyAddressAsString, setCompanyAddressAsString] = useState("");
  const [companyAddress, setCompanyAddress] = useState({});

  const companyData = Authentication.getCurrentUser();

  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:5000/api/company/${companyData.id}`,
    })
      .then((res) => {
        // console.log(res.data.address);
        setCompanyAddressAsString(
          `${res.data.address.detailAddress}, ${res.data.address.ward}, ${res.data.address.district}, ${res.data.address.province}`
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5">
        <h1 className="text-3xl font-semibold text-text_color mb-10">
          Đăng tin tuyển dụng
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full xl:pr-24 flex-col gap-5 text-text_color overflow-y-scroll scrollbar-hide"
        >
          <div className="flex flex-col lg:flex-row w-full gap-10">
            <div className="flex flex-col gap-2 md:flex-1">
              <label
                htmlFor="jobTitle"
                className="text-base md:text-lg font-medium"
              >
                Tên công việc
                <span className="text-red-500 ml-2">(*)</span>
              </label>
              <input
                type="text"
                {...register("jobTitle", {})}
                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="major"
                className="text-base md:text-lg font-medium"
              >
                Ngành nghề
                <span className="text-red-500 ml-2">(*)</span>
              </label>
              <SelectionList
                options={majorList}
                selected={selectedMajor}
                setSelected={setSelectedMajor}
                {...register("major")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-initial">
            <label
              htmlFor="jobDescription"
              className="text-base md:text-lg font-medium"
            >
              Mô tả
              <span className="text-red-500 ml-2">(*)</span>
            </label>
            <textarea
              {...register("jobDescription", {})}
              className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-2 flex-initial">
              <label
                htmlFor="numberOfHiring"
                className="text-base md:text-lg font-medium"
              >
                Số lượng
                <span className="text-red-500 ml-2">(*)</span>
              </label>
              <input
                type="number"
                {...register("numberOfHiring", {})}
                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="sex" className="text-base md:text-lg font-medium">
                Giới tính
              </label>

              <SelectionList
                options={sexList}
                selected={selectedSex}
                setSelected={setSelectedSex}
                {...register("sex")}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="requireExperience"
                className="text-base md:text-lg font-medium"
              >
                Kinh nghiệm
              </label>

              <SelectionList
                options={requireExperienceList}
                selected={selectedExperience}
                setSelected={setSelectedExperience}
                {...register("requireExperience")}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="salary"
                className="text-base md:text-lg font-medium"
              >
                Lương
                <span className="text-red-500 ml-2">(*)</span>
              </label>

              <input
                type="text"
                {...register("salary")}
                className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label
                htmlFor="workingForm"
                className="text-base md:text-lg font-medium"
              >
                Hình thức
              </label>

              <SelectionList
                options={workingFormList}
                selected={selectedForm}
                setSelected={setSelectedForm}
                {...register("workingForm")}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="jobAddress"
              className="text-base lg:text-lg font-medium"
            >
              Địa điểm làm việc
            </label>

            <input
              type="text"
              defaultValue={companyAddressAsString}
              readOnly={true}
              className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
              {...register("jobAddress")}
            />
          </div>

          <input
            type="submit"
            value={"Đăng"}
            className="text-white text-base md:text-lg bg-background_color hover:bg-background_color_hover py-2 rounded-md my-4"
          />
        </form>
      </div>
    </Dashboard>
  );
}
export default Requirement;
