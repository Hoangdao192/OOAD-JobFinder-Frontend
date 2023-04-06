import React, { useEffect, useState } from "react";
import LogoJobFinder from "../../../image/candidates/LogoJobFinder.png";
import DotDivide from "../../../image/candidates/DotDivide.png";

export const CompanyView = ({ data }) => {
  const defaultValue = "Unknow";

  const [company, setCompany] = useState(null);

  useEffect(() => {
    if (data) {
      let validData = { ...data };

      //valid
      if (!validData.companyLogo) validData.companyLogo = String(LogoJobFinder);

      if (!validData.companyName) validData.companyName = defaultValue;

      if (!validData.address) validData.address = defaultValue;

      if (!validData.numberOfEmployee)
        validData.numberOfEmployee = defaultValue;

      if (!validData.companyDescription)
        validData.companyDescription = defaultValue;

      setCompany(validData);
    }
  }, []);

  return (
    <div>
      {company && (
        <div className="space-y-2 rounded-xl w-full h-xl bg-white p-4">
          <div className="Header space-y-2">
            <div className="flex flex-row space-x-2 items-center">
              <img
                className="rounded-md w-10 h-10"
                src={company.companyLogo}
                alt={LogoJobFinder}
              />

              <div>
                <label className="text-base line-clamp-1">
                  {company.companyName}
                </label>

                <div className="flex flex-row space-x-2 items-center text-xs">
                  <label className="line-clamp-1">
                    {company.address.province}
                  </label>
                  <img alt="." className="w-1 h-1" src={DotDivide} />
                  <label className="line-clamp-1">
                    {company.numberOfEmployee} Applicant
                  </label>
                </div>
              </div>
            </div>
          </div>

          <p className="text-base line-clamp-2">{company.companyDescription}</p>

          {/* <div className="flex flex-row">
            <div className="bg-common_color text-white text-xs p-1 rounded-md line-clamp-1">
              Công nghệ
            </div>
            <div className="flex-1"> </div>
          </div> */}
        </div>
      )}
    </div>
  );
};
export default CompanyView;
