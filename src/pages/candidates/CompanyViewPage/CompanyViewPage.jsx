import axios from "axios"
import React, { useEffect, useState } from "react"
import config from "../../../config.json"

export default function CompanyViewPage() {
    const [companyList, setCompanyList] = useState([])
    useEffect(() => {
        axios({
            method: "GET",
            url: `${config.server.domain}/company`
        }).then((response) => {
            setCompanyList(response.data.elements.map((item, index) => {
                return {
                    ...item,
                    companyDescription: item.companyDescription.substr(0, 355)
                }
            }))
        })
    }, [])

    return (
        <div className="w-full flex flex-wrap m-4  gap-4">
            {
                companyList.map((company, index) => {
                    return (
                        <div className="w-[32.5%] h-[20rem] bg-white rounded p-4">
                            <div className="flex items-center gap-4 ">
                                <div className="w-[5rem] rounded-md h-[5rem] bg-slate-800"></div>
                                <div>
                                <p className="font-bold text-[1rem]">{company.companyName}</p>
                                </div>
                                
                            </div>
                            <p className="mt-4">{company.companyDescription}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}