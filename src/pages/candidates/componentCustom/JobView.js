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
            <div className="flex flex-row space-x-2 items-top">
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
                  </div>
               </div>

               <p className="flex-1"></p>

               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-5 h-5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
               </svg>
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