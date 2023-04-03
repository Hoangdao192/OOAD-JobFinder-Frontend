import React, { useEffect, useState } from "react";

import HomeHeader from '../../components/layouts/header/Header'
import BackgroudLayout from '../../components/layouts/background/Layout'
import JobView from './componentCustom/JobView'
import CompanyView from "./componentCustom/CompanyView";
import Authentication from "services/Authentication/Authentication";
import { getListJobDefault, getListCompanyDefault } from '../../services/candidates/CandidateService'

import "./CandidateHome.css"
import LogoJobFinder from "../../image/candidates/LogoJobFinder.png"

export const CandidateHome = () => {
   const [filterKey, setFilterKey] = useState(
      {
         companyId: null,
         jobTitle: null,
         major: null,
         workingForm: null,
      }
   );

   const [listJob, setListJob] = useState([]);

   const [userData, setUserData] = useState(null);

   const [listCompany, setListCompany] = useState([]);

   useEffect(() => {
      getListJobDefault().then((data) => {
         setListJob(data)
      })

      getListCompanyDefault().then((data) => {
         setListCompany(data);
      })

      if (Authentication.isUserAuthenticated()) {
         setUserData(Authentication.getCurrentUser());
      } else {
         setUserData(null);
      }
   }, [filterKey, userData])

   return (
      <div className="text-Poppins">
         <HomeHeader />

         <div className="flex items-start w-full h-full bg-gray-200 space-x-5 p-5">
            {/* LeftBar */}
            <div className="w-3/12 bg-white p-3 space-y-5 rounded-xl">
               <div className="flex flex-row">
                  <p className="flex-1">Filter</p>
                  <p className="font-bold text-red-400">Clear All</p>
               </div>

               <div>
                  <label className="block mb-2 font-bold ">Locations</label>
                  <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
                     <option selected>Choose a country</option>
                     <option value="US">United States</option>
                     <option value="CA">Canada</option>
                     <option value="FR">France</option>
                     <option value="DE">Germany</option>
                  </select>
               </div>

               <div className="flex flex-col space-y-2">
                  <label className="font-bold">JobType</label>
                  <label><input type="checkbox" className="filterChx" /> Full-time</label>
                  <label><input type="checkbox" className="filterChx" defaultChecked={true} /> Part-time</label>
                  <label><input type="checkbox" className="filterChx" /> Remote</label>
               </div>
            </div>

            {/* MidBar */}
            <div className="space-y-3 w-6/12">
               <div className="bg-cover opacity-90 rounded-xl w-full h-xl bg-[url('./image/candidates/BackgroundSearch.png')]">
                  <div className="space-y-3 p-5 pb-2 text-gray-100">
                     <div className=" text-xl">Are you looking for a dream job?</div>

                     <p className="text-xs">Job Finder is place where you can find your dream job in various skills, more than 10,000 jobs are available here</p>

                     <form className="flex items-center space-x-3">
                        <div className="relative w-full">
                           <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <svg aria-hidden="true" className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                           </div>
                           <input type="text" className="p-3 text-xs bg-gray-100 bg-opacity-20 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-1 text-white rounded-md block w-full pl-10 placeholder-white" placeholder="Search" />
                        </div>
                        <button type="submit" className="p-2 w-auto h-10 text-sm text-common_color rounded-md bg-white hover:bg-hover_common_color hover:text-white">
                           <span className="m-3">Search</span>
                        </button>
                     </form>
                     <div>

                     </div>
                  </div>
               </div>
               <div className="space-y-3">

                  {/* ListJob */}
                  {
                     listJob.length > 0 ?
                        listJob.map((item, index) => (
                           <JobView data={item}></JobView>
                        ))
                        : <div className="font-bold p-5 bg-white text-center text-common_color">Have no job for this filtered!</div>
                  }
               </div>
            </div>

            {/* RightBar */}
            <div className="w-3/12 space-y-3">
               {
                  userData ?
                  <div className="flex flex-col items-center content-center space-y-2 pt-7 pb-5 bg-white p-3 rounded-xl">
                     <img className="m-auto w-1/3 h-1/3 rounded-md" src={LogoJobFinder} />
                     <p className="font-bold line-clamp-1">{userData.fullName && "Unknow"}</p>
                     <p className="line-clamp-1">{userData.phoneNumber && "Unknow"}</p>
                     <p className="line-clamp-1">{userData.contactEmail && "Unknow"}</p>
                  </div>
                  :
                  <div className="flex flex-col items-center content-center space-y-2 pt-7 pb-5 bg-white p-3 rounded-xl">
                     <img className="m-auto w-1/3 h-1/3 rounded-md" src={LogoJobFinder} />
                     <p className="font-bold line-clamp-1">Name</p>
                     <p className="line-clamp-1">Phone Number</p>
                     <p className="line-clamp-1">Email Contact</p>
                     <p className="text-xs line-clamp-1">You need sign in to display information</p>
                  </div>
               }

               <div className="space-y-3">

                  {/* ListCompany */}
                  {
                     listCompany.length > 0 ?
                     listCompany.map((item, index) => (
                           <CompanyView data={item}></CompanyView>
                        ))
                        : <div className="font-bold p-5 bg-white text-center text-common_color">Have no company to display!</div>
                  }
               </div>
            </div>
         </div>
      </div>
   );
}

export default CandidateHome;
