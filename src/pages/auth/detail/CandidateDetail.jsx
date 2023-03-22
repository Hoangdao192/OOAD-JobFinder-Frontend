import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";
import Datepicker from "tailwind-datepicker-react";

const options = {
  title: "Demo Title",
  autoHide: true,
  todayBtn: false,
  clearBtn: false,
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-white dark:bg-gray-800",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "text-text_color",
    disabledText: "text-gray-300",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => (
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
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    ),
    next: () => (
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
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    ),
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date(),
  language: "en",
};

function CandidateDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmit = (data) => {
    // console.log(data);
    const formData = new FormData();
    formData.append("fullName", data.fullName);
    formData.append("sex", data.sex);
    formData.append("dateOfBirth", selectedDate);
    formData.append("contactEmail", data.contactEmail);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("selfDescription", data.selfDescription);
    formData.append("candidateAvatarFile", data.candidateAvatarFile);
    // for (const value of formData.values()) {
    //   console.log(value);
    // }
    axios({
      method: "put",
      url: "http://localhost:5000/api/candidate",
      data: formData,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    }).then((res) => {
      console.log(res);
    });
  };

  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = (selectedDate) => {
    setSelectedDate(selectedDate);
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const [preview, setPreview] = useState();
  const [selectedAvatar, setSelectedAvatar] = useState();

  useEffect(() => {
    if (!selectedAvatar) {
      setPreview(undefined);
      return;
    }
    const objUrl = URL.createObjectURL(selectedAvatar);
    setPreview(objUrl);

    return () => URL.revokeObjectURL(objUrl);
  }, [selectedAvatar]);

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedAvatar(undefined);
      return;
    }

    setSelectedAvatar(e.target.files[0]);
    setValue("candidateAvatarFile", e.target.files[0]);
  };

  return (
    <div className="flex overflow-auto mx-5 md:mx-20 px-5 md:px-10  my-5 max-h-screen gap-20 border py-5 shadow-md rounded-md">
      <img
        src="https://images.unsplash.com/photo-1579389083046-e3df9c2b3325?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
        alt="right_side"
        className="hidden lg:block object-cover w-1/3 self-center rounded-md"
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full xl:pr-24 flex-col gap-3 text-text_color overflow-y-scroll scrollbar-hide"
      >
        <h1 className="self-center text-2xl md:text-3xl font-semibold">
          Candidate's Information
        </h1>

        <div className="mt-14 mb-5 flex sm:flex-row flex-col w-full sm:items-center gap-5 md:gap-10">
          <div className=" ">
            {selectedAvatar ? (
              <img
                src={preview}
                alt="logo"
                className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={0.1}
                stroke="#6B7280"
                className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full outline ml-5 outline-[#6B7280] outline-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                />
              </svg>
            )}
          </div>
          <label
            htmlFor="logo"
            className="text-base md:text-lg font-base cursor-pointer text-background_color "
          >
            Change avatar
            <input
              type="file"
              id="logo"
              onChange={onSelectImage}
              name="companyLogoFile"
              className="hidden"
            />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="fullName"
            className="text-base md:text-lg font-medium"
          >
            Họ và tên
            <span className="text-red-500 ml-2">(*)</span>
          </label>
          <input
            type="text"
            {...register("fullName", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />

          {errors.fullName && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="date" className="text-base lg:text-lg font-medium">
            Ngày sinh
          </label>
          <Datepicker
            options={options}
            onChange={handleChange}
            show={show}
            setShow={handleClose}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="">
            Giới tính
            <span className="text-red-500 ml-2">(*)</span>
          </label>
          <div className="flex gap-2 items-center">
            <input
              className="md:h-6 md:w-6 h-4 w-4"
              type="radio"
              value="male"
              id="male"
              {...register("sex")}
            />
            <label htmlFor="male">Nam</label>
          </div>
          <div className="flex gap-2 items-center">
            <input
              className="md:h-6 md:w-6 h-4 w-4"
              type="radio"
              value="female"
              {...register("sex", {})}
              id="male"
            />
            <label htmlFor="female">Nữ</label>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="contactEmail"
            className="text-base md:text-lg font-medium"
          >
            Email
            <span className="text-red-500 ml-2">(*)</span>
          </label>
          <input
            type="text"
            {...register("contactEmail", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />

          {errors.contactEmail && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="phoneNumber"
            className="text-base md:text-lg font-medium"
          >
            Điện thoại
            <span className="text-red-500 ml-2">(*)</span>
          </label>
          <input
            type="tel"
            {...register("phoneNumber", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />
          {errors.phoneNumber && (
            <p className="text-red-500">This field is required</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="selfDescription"
            className="text-base lg:text-lg font-medium"
          >
            Giới thiệu
          </label>
          <textarea
            name="selfDescription"
            id="selfDescription"
            {...register("selfDescription", {
              required: true,
            })}
            className="border h-24 focus:outline-none p-2 text-base lg:text-lg rounded-md "
          ></textarea>
        </div>
        <input
          type="submit"
          className="p-2 mt-5 border bg-background_color hover:bg-background_color_hover text-white text-base md:text-lg rounded-md"
        />
      </form>
    </div>
  );
}
export default CandidateDetail;
