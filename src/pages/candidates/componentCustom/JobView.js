import React, { useEffect, useState } from "react";
import logoJobFinder from "../../../image/candidates/LogoJobFinder.png"
import DotDivide from "../../../image/candidates/DotDivide.png"
import { getCompanyById } from "../../../services/candidates/CandidateService"

export const JobView = ({ data }) => {
   const [companyLogo, setCompanyLogo] = useState("");

   useEffect(() => {
      getCompanyById(data.userId).then((company) => {
         if (company.companyLogo) {
            setCompanyLogo(company.companyLogo);
         } else {
            setCompanyLogo(logoJobFinder)
         }
      })
   }, [])

   return (
      <div className="space-y-2 rounded-xl w-full h-xl bg-white p-4">
         <div className="Header space-y-2">
            <div className="flex flex-row space-x-2 items-center">
               <img className="rounded-md w-10 h-10" src={companyLogo} alt={logoJobFinder} />

               <div>
                  <label className="text-base line-clamp-1">{data.jobTitle}</label>

                  <div className="flex flex-row space-x-2 items-center text-xs">
                     <label className="line-clamp-1">{data.workingForm}</label>
                     <img alt="." className="w-1 h-1" src={DotDivide} />
                     <label className="line-clamp-1">{data.jobAddress.province}</label>
                     <img alt="." className="w-1 h-1" src={DotDivide} />
                     <label className="line-clamp-1">$: {data.salary}</label>
                     <img alt="." className="w-1 h-1" src={DotDivide} />
                     <label className="line-clamp-1">{data.numberOfHiring} Applicant</label>
                  </div></div>
            </div>
         </div>

         <p className="text-base line-clamp-3">
            {data.jobDescription}
         </p>

         <div className="flex flex-row">
            <div className="bg-common_color text-xs p-1 rounded-md line-clamp-1">{data.major}</div>
            <div className="flex-1"></div>
         </div>
      </div>
   );
}
export default JobView;