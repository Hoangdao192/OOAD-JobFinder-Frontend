import axios from "axios"
import JobView from "components/componentCustom/JobView"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import config from '../../config.json'

export default function ViewCompany() {
    const [listJob, setListJob] = useState([])
    const [company, setCompany] = useState({
        companyName: "",
        companyDescription: "",
        companyLogo: "",
        companyAddress: "",
        numberOfEmployee: ""
    })
    const params = useParams()

    useEffect(() => {
        axios({
            method: 'get',
            url: `${config.server.domain}/company/${params.id}`,
        }).then((response) => {
            console.log(response.data)
            let address = response.data.address;
            let companyAddress = `${address.detailAddress}, ${address.ward}, ${address.district}, ${address.province}`
            setCompany({
                ...response.data,
                companyAddress: companyAddress
            })
        })

        axios({
            method: 'get',
            url: `${config.server.domain}/job?companyId=${params.id}`,
        }).then((response) => {
            console.log(response.data)
            setListJob(response.data.elements)
        })
    }, [])

    return (
        <div className="bg-[#e5e7eb] flex w-full p-4 gap-4">
            <div className="flex-[2]">
                <div className="rounded flex flex-col gap-4">
                {
                    listJob.length > 0 ?
                        listJob.map((item, index) => (
                            <JobView data={item}></JobView>
                        ))
                        : <div className="font-bold p-5 bg-white text-center text-common_color rounded-xl">
                            Công ty chưa có công việc nào
                            </div>
                }
                </div>
            </div>
            <div className="flex-[5]">
                <div className="bg-white rounded-xl flex relative flex-wrap">
                    <div className="bg-cover bg-no-repeat rounded-xl absolute z-0 h-[12rem] w-full bg-[url('D:\Wallpaper\1065466.png')]"></div>
                    <div className="w-full h-[8rem]"></div>
                    <div className="flex z-[1] px-[2rem] py-[1rem] top-[5rem] flex-col w-full">
                        <div className="w-full">
                            <div className="border-[3px] rounded-xl border-white bg-cover w-[6rem] h-[6rem] bg-[url('https://cdn.topcv.vn/140/company_logos/cong-ty-tnhh-monstar-lab-viet-nam-6119dd2e836af.jpg')]"></div>
                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div className="flex flex-col gap-[0.5rem] mt-[1rem]">
                                <p className="font-[700] text-[1.5rem]">{company.companyName}</p>
                                <p className="text-[#8e8e8e]">{company.companyAddress}</p>
                            </div>

                            <div>
                                <button className="rounded-xl bg-[#379d70] py-3 px-8 inline-block">
                                    <span className="text-white">Báo cáo công ty</span>
                                </button>
                                <div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-[1.5rem] rounded-xl bg-white mt-4">
                    <p className="text-[1.25rem] font-bold">Thông tin công ty</p>
                    <p className="mt-4">{company.companyDescription}</p>
                    <p className="text-[1.25rem] font-bold mt-4">Quy mô công ty</p>
                    <p className="mt-2">{`${company.numberOfEmployee} nhân viên`}</p>
                    <p className="text-[1.25rem] font-bold mt-4">Địa chỉ</p>
                    <p className="mt-2">{company.companyAddress}</p>
                </div>
            </div>
        </div>
    )
}