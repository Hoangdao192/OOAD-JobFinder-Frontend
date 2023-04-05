import axios from "axios";
import Dashboard from "components/company/Dashboard";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";
import subVn from "sub-vn";

function EditProfile() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const location = useLocation();

  const [selectedLogo, setSelectedLogo] = useState(null);
  const [preview, setPreview] = useState(null);

  const [selectedProvince, setSelectedProvince] = useState(
    location.state.company.address.province
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    location.state.company.address.district
  );
  const [selectedWard, setSelectedWard] = useState(
    location.state.company.address.ward
  );
  const [detailAddress, setDetailAddress] = useState(
    location.state.company.address.detailAddress
  );
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);

  const provinces = subVn.getProvinces();

  const [provinceCode, setProvinceCode] = useState(null);
  const [districtCode, setDistrictCode] = useState(null);
  useEffect(() => {
    const province = provinces.filter(
      (province) => province.name === selectedProvince
    );
    if (province.length !== 0) {
      const code = province[0].code;
      setProvinceCode(code);
    }
  }, [selectedProvince, provinces, provinceCode]);

  useEffect(() => {
    const districtList = subVn.getDistrictsByProvinceCode(provinceCode);
    setDistricts(districtList);
  }, [selectedProvince, provinceCode]);

  useEffect(() => {
    const district = districts.filter(
      (district) => district.name === selectedDistrict
    );
    if (district.length !== 0) {
      const code = district[0].code;
      setDistrictCode(code);
    }
  }, [selectedDistrict, districtCode, districts]);

  useEffect(() => {
    const wards = subVn.getWardsByDistrictCode(districtCode);
    setWards(wards);
  }, [selectedDistrict, districtCode]);

  const [companyName, setCompanyName] = useState(
    location.state.company.companyName
  );
  const [companyDescription, setCompanyDescription] = useState(
    location.state.company.companyDescription
  );
  const [numberOfEmployee, setNumberOfEmployee] = useState(
    location.state.company.numberOfEmployee
  );

  const onSubmit = (data) => {
    console.log(data);
    let formData = new FormData();
    formData.append("companyName", companyName);
    formData.append("companyDescription", companyDescription);
    formData.append("numberOfEmployee", numberOfEmployee);
    formData.append("address.province", selectedProvince);
    formData.append("address.district", selectedDistrict);
    formData.append("address.ward", selectedWard);
    formData.append("address.detailAddress", detailAddress);
    formData.append("companyLogoFile", data.companyLogoFile);

    axios({
      method: "put",
      url: "http://localhost:5000/api/company",
      data: formData,
      headers: {
        Authorization: Authentication.generateAuthorizationHeader(),
      },
    })
      .then((res) => {
        console.log(res);
        navigate("/company/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSelectImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedLogo(undefined);
      return;
    }

    setSelectedLogo(e.target.files[0]);
    setValue("companyLogoFile", e.target.files[0]);
  };
  return (
    <Dashboard>
      <div className="w-full bg-white m-5 rounded-md shadow-md p-5 overflow-y-scroll scrollbar-hide">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full xl:px-10 flex-col gap-3 text-text_color overflow-y-scroll scrollbar-hide"
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
                <img
                  src="/blankAvatar.png"
                  alt="blankAvatar"
                  className="w-24 h-24 md:w-28 md:h-28 xl:w-36 xl:h-36 object-cover rounded-full"
                />
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
              // {...register("companyName", {
              //   required: true,
              // })}
              defaultValue={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
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
              // {...register("companyDescription", {
              //   required: true,
              // })}
              defaultValue={companyDescription}
              onChange={(e) => setCompanyDescription(e.target.value)}
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
              // {...register("numberOfEmployee", {
              //   required: true,
              // })}
              defaultValue={numberOfEmployee}
              onChange={(e) => setNumberOfEmployee(e.target.value)}
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
                defaultValue={selectedProvince}
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
                defaultValue={selectedDistrict}
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
                defaultValue={selectedWard}
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
              defaultValue={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              className="mt-2 border focus:outline-none p-2 text-base rounded-md"
            />
            {errors.address && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

          <input
            type="submit"
            value="Cập nhật"
            className="p-2 my-10 border bg-background_color hover:bg-background_color_hover text-white text-base md:text-lg rounded-md"
          />
        </form>
      </div>
    </Dashboard>
  );
}
export default EditProfile;
