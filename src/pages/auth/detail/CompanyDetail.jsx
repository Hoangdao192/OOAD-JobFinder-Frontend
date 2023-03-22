import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Authentication from "services/Authentication/Authentication";
import subVn from "sub-vn";

function CompanyDetail() {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [selectedWard, setSelectedWard] = useState(null);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const provinces = subVn.getProvinces();

  const [provinceCode, setProvinceCode] = useState(null);
  const [districtCode, setDistrictCode] = useState(null);

  const [selectedLogo, setSelectedLogo] = useState();
  const [preview, setPreview] = useState();
  useEffect(() => {
    const province = provinces.filter(
      (province) => province.name === selectedProvince
    );
    console.log(province);
    if (province.length !== 0) {
      const code = province[0].code;
      console.log(code);
      setProvinceCode(code);
      console.log(provinceCode);
    }
  }, [selectedProvince, provinces, provinceCode]);

  useEffect(() => {
    const districtList = subVn.getDistrictsByProvinceCode(provinceCode);
    setDistricts(districtList);
    // console.log(districts);
  }, [selectedProvince, provinceCode]);

  useEffect(() => {
    const district = districts.filter(
      (district) => district.name === selectedDistrict
    );
    if (district.length !== 0) {
      const code = district[0].code;
      setDistrictCode(code);
      console.log(districtCode);
    }
  }, [selectedDistrict, districtCode, districts]);

  useEffect(() => {
    const wards = subVn.getWardsByDistrictCode(districtCode);
    setWards(wards);
    console.log(wards);
  }, [selectedDistrict, districtCode]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("companyName", data.companyName);
    formData.append("companyDescription", data.companyDescription);
    formData.append("numberOfEmployee", data.numberOfEmployee);
    formData.append("address.province", data.address.province);
    formData.append("address.district", data.address.district);
    formData.append("address.ward", data.address.ward);
    formData.append("address.detailAddress", data.address.detailAddress);
    formData.append("companyLogoFile", data.companyLogoFile);

    axios({
      method: "put",
      url: "http://localhost:5000/api/company",
      data: formData,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    }).then((res) => {
      console.log(res);
    });
  };

  // handle upload logo

  useEffect(() => {
    if (!selectedLogo) {
      setPreview(undefined);
      return;
    }
    const objUrl = URL.createObjectURL(selectedLogo);
    setPreview(objUrl);

    return () => URL.revokeObjectURL(objUrl);
  }, [selectedLogo]);

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedLogo(undefined);
      return;
    }

    setSelectedLogo(e.target.files[0]);
    setValue("companyLogoFile", e.target.files[0]);
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
          Company's Information
        </h1>

        <div className="mt-14 mb-5 flex sm:flex-row flex-col w-full sm:items-center gap-5 md:gap-10">
          <div className=" ">
            {selectedLogo ? (
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
            Change logo
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
            htmlFor="companyName"
            className="text-base md:text-lg font-medium"
          >
            Tên công ty
          </label>
          <input
            type="text"
            {...register("companyName", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />
          {errors.companyName && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label
            htmlFor="companyDescription"
            className="text-base md:text-lg font-medium"
          >
            Mô tả
          </label>
          <input
            type="text"
            {...register("companyDescription", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />
          {errors.companyDescription && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2 mt-5">
          <label
            htmlFor="numberOfEmployee"
            className="text-base md:text-lg font-medium"
          >
            Quy mô (nhân viên)
          </label>
          <input
            type="text"
            {...register("numberOfEmployee", {
              required: true,
            })}
            className="border p-2 text-base md:text-lg focus:outline-none rounded-md"
          />
          {errors.numberOfEmployee && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="countries"
            className="block text-base md:text-lg font-medium "
          >
            Địa chỉ
          </label>
          <div className="flex gap-10">
            <select
              id="provinces"
              {...register("address.province", {
                required: true,
              })}
              onChange={(e) => {
                setSelectedProvince(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Chọn tỉnh/ thành phố</option>
              {provinces.map((province) => {
                return (
                  <option key={province.code} value={province.name}>
                    {province.name}
                  </option>
                );
              })}
            </select>

            <select
              id="districts"
              {...register("address.district", {
                required: true,
              })}
              onChange={(e) => {
                setSelectedDistrict(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Chọn quận/ huyện</option>
              {districts.map((district) => {
                return (
                  <option key={district.code} value={district.name}>
                    {district.name}
                  </option>
                );
              })}
            </select>

            <select
              id="wards"
              {...register("address.ward", {
                required: true,
              })}
              onChange={(e) => {
                setSelectedWard(e.target.value);
              }}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option selected>Chọn xã/ phường/ thị trấn</option>
              {wards.map((ward) => {
                return (
                  <option key={ward.code} value={ward.name}>
                    {ward.name}
                  </option>
                );
              })}
            </select>
          </div>

          <input
            type="text"
            placeholder="Đường/ Tòa nhà"
            {...register("address.detailAddress", {
              required: true,
            })}
            className="mt-2 border focus:outline-none p-2 text-base rounded-md"
          />
          {errors.address && (
            <span className="text-red-500">This field is required</span>
          )}
        </div>

        <input
          type="submit"
          className="p-2 mt-5 border bg-background_color hover:bg-background_color_hover text-white text-base md:text-lg rounded-md"
        />
      </form>
    </div>
  );
}
export default CompanyDetail;
