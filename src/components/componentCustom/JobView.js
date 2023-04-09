import React, { useEffect, useState } from "react";
import logoJobFinder from "../../assets/image/candidates/LogoJobFinder.png"
import DotDivide from "../../assets/image/candidates/DotDivide.png"
import savedIcon from "../../assets/image/candidates/savedIcon.png"
import unSavedIcon from "../../assets/image/candidates/unSavedIcon.png"
import { getCompanyById, saveJob, isSavedJob, unSaveJob } from "../../services/candidates/CandidateService"
import { handler } from "tailwind-scrollbar-hide";
import { useNavigate } from "react-router-dom";
import Authentication from "services/Authentication/Authentication";
import { toast } from "react-toastify";

export const JobView = ({ data }) => {
   const navigate = useNavigate();
   const [companyLogo, setCompanyLogo] = useState("");
   const [isSavedJobVariable, setIsSavedJobVariable] = useState(false);


   const handlerClickViewJobDetail = (event) => {
      if (data.id)
         navigate("/job/" + data.id);
   }

   // Start view
   useEffect(() => {
      getCompanyById(data.userId).then((company) => {
         if (company.companyLogo) {
            setCompanyLogo(company.companyLogo);
         } else {
            setCompanyLogo(logoJobFinder)
         }
      })
      if (data.id && Authentication.isUserAuthenticated()) {
         isSavedJob(data.id, Authentication.getCurrentUser().userId).then((res) => {
            setIsSavedJobVariable(res);
         })
      };
      // if (data.id) {
      //    isSavedJob(data.id, 1).then((res) => {
      //    console.log("isSaved: ", res);
      //    setIsSavedJobVariable(res);
      // })};
   }, [data])

   const handleOnClickSaveJobIcon = (event) => {
      if (true) {
         if (data.id && Authentication.isUserAuthenticated()) {
            saveJob(data.id, Authentication.getCurrentUser().id)
            .then(() => {
                toast.success("Lưu công việc thành công")
            })
            .catch((error) => {
                toast.error("Công việc đã được lưu rồi.")
            })
         };
      }

      setIsSavedJobVariable(!isSavedJobVariable)
   }

   return (
      <div className="space-y-3 rounded-xl w-full h-xl bg-white p-5 hover:bg-gray-50">
         {/* Header */}
         <div className="items-stretch">
            <div className="flex flex-row space-x-3 items-center">
               {/* LogoCompany */}
               <img onClick={handlerClickViewJobDetail} className="cursor-pointer rounded-md w-10 h-10" src={companyLogo} alt={logoJobFinder} />

               <div onClick={handlerClickViewJobDetail} className="space-y-1.5 cursor-pointer">
                  <label className="text-[1.1rem] line-clamp-1 cursor-pointer">{data.jobTitle}</label>

                  <div className="flex flex-row space-x-2 text-xs items-center">
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

               {/* LogoSaveJob */}
               <div className="items-top h-full">
                  <img onClick={handleOnClickSaveJobIcon} className="hover:bg-green-100 w-5 h-5 mb-5" src={
                     isSavedJobVariable ?
                        savedIcon
                        : unSavedIcon} />
               </div>
            </div>
         </div>

         {/* Content */}
         <p className="text-[0.9rem] line-clamp-3">
            {data.jobDescription}
         </p>

         <div className="flex flex-row">
            <div className="bg-common_color text-[0.7rem] p-1 rounded-md text-white line-clamp-1">{data.major}</div>
            <div className="flex-1"></div>
         </div>
      </div>
   );
}
export default JobView;