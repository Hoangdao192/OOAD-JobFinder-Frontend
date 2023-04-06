import Dashboard from "components/company/Dashboard";
import React, { useEffect, useState } from "react";
import Chart from "components/company/Chart";
import axios from "axios";
import config from '../../config.json'
import Authentication from "services/Authentication/Authentication";
import { Bar, Line } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    LineElement
} from 'chart.js';
import { faker } from "@faker-js/faker";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend, LineElement
);

function ApplicationAnalysticChartLine({month = 0, year = 0}) {
    const options = {
        tension: 0.27,
        responsive: true,
        maintainAspectRatio: false,
        barPercentage : 0.5,
        plugins: {
            title: {
                display: false,
                text: 'Tăng trưởng người dùng',
            },
            legend: {
                display: true
            }
        },
        scales: {
            x: {
                // stacked: true,
            },
            y: {
                // stacked: true,
                suggestedMax: 200
            },
        },
    };

    let label = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    if (month != 0) {
        label = Array.from(Array(new Date(year, month, 0).getDate()).keys())
            .map((index) => `${index + 1}`)
    }

    const [chartData, setChartData] = useState({
        labels: label,
        datasets: [
            {
                fill: true,
                label: 'CV Chấp nhận',
                data: label.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: '#f66885',
                borderRadius: 50,
                borderColor: "#f66885",
                pointBackgroundColor: "#f66885"
                // pointRadius: 0
                // stack: 'Stack 0',
            },
            {
                fill: true,
                label: 'CV Từ chối',
                data: label.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: '#36a0ea',
                borderRadius: 50,
                borderColor: "#36a0ea",
                pointBackgroundColor: "#36a0ea"
                // pointRadius: 0
                // stack: 'Stack 0',
            }
        ],
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/job/statistic?month=${month}&year=${year}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((response) => {
            setChartData({
                labels: label,
                datasets: [
                    {
                        label: 'CV Từ chối',
                        data: label.map(() => faker.datatype.number({ min: 0, max: 100 })),
                        backgroundColor: '#1a181f',
                        borderRadius: 50,
                        borderColor: "#f66885",
                        pointBackgroundColor: "#f66885"
                        // pointRadius: 0
                        // stack: 'Stack 0',
                    },
                    {
                        label: 'CV Tiếp nhận',
                        data: label.map(() => faker.datatype.number({ min: 0, max: 100 })),
                        backgroundColor: '#1a181f',
                        borderRadius: 50,
                        borderColor: "#36a0ea",
                        pointBackgroundColor: "#36a0ea"
                        // pointRadius: 0
                        // stack: 'Stack 0',
                    }
                ],
            })
        })
    }, [month, year])

    return (
            <Line options={options} data={chartData}/>
    )
}

function ApplicationAnalysticChart({ month = 0, year = 2023 }) {
    const [statisticData, setStatisticData] = useState()
    const [candidate, setCandidate] = useState([])
    const [company, setCompany] = useState([])

    let label = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12']
    if (month != 0) {
        label = Array.from(Array(new Date(year, month, 0).getDate()).keys())
            .map((index) => `${index + 1}`)
    }

    const [chartData, setChartData] = useState({
        labels: label,
        datasets: [
            {
                label: 'Ứng viên',
                data: label.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: '#3762ec',
                borderRadius: 50,
                // stack: 'Stack 1',
            },
            {
                label: 'Công ty',
                data: label.map(() => faker.datatype.number({ min: 0, max: 100 })),
                backgroundColor: '#1a181f',
                borderRadius: 50,
                // stack: 'Stack 0',
            }
        ],
    })

    useEffect(() => {
        axios({
            method: 'GET',
            url: `${config.server.domain}/user/statistic?month=${month}&year=${year}`,
            headers: {
                Authorization: Authentication.generateAuthorizationHeader()
            }
        }).then((res) => {
            console.log(res)
            setCandidate(res.data.candidate)
            setCompany(res.data.company)

            let labels = [""]
            setChartData({
                labels: label,
                datasets: [
                    {
                        maxBarThickness: 5,
                        barThickness: 5,
                        label: 'Ứng viên',
                        data:  labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                        backgroundColor: '#3762ec',
                        borderRadius: 50,
                        // stack: 'Stack 1',
                    },
                    {
                        maxBarThickness: 5,
                        barThickness: 5,
                        label: 'Công ty',
                        data:  labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
                        backgroundColor: '#1a181f',
                        borderRadius: 50,
                        // stack: 'Stack 0',
                    }
                ],
            })
        })
    }, [month, year])

    const options = {
        tension: 0.4,
        responsive: true,
        maintainAspectRatio: false,
        barPercentage: 0.4,
        maxBarThickness: 20,
        data: {
            borderRadius: [50, 40]
        },
        plugins: {
            title: {
                display: false,
                text: 'Tăng trưởng người dùng',
            },
            legend: {
                display: true,
                padding: {
                    bottom: 20
                },
                labels: {
                    boxHeight: 15,
                    boxWidth: 15
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                
            },
            y: {
                stacked: true,
                min: 0,
                suggestedMax: 4,
                ticks: {
                    // forces step size to be 50 units
                    stepSize: 1
                }
            },
        },
    };


    return (
        <Bar options={options} data={chartData} />
    )
}

function HomeCompany() {
    return (
        <Dashboard>
            <div className="flex flex-col w-full bg-white m-5 rounded-md shadow-md p-5 ">
                <div>
                    <h1 className="text-text_color text-2xl font-medium">
                        Hiệu quả tuyển dụng
                    </h1>
                    <ul className="flex mt-10 gap-5">
                        <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-purple-100 rounded-xl">
                            <p className="text-3xl font-bold text-gray-800">8</p>
                            <div className="flex justify-between">
                                <p className="text-base">Tin tuyển dụng đang mở</p>
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
                                        d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46"
                                    />
                                </svg>
                            </div>
                        </li>

                        <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-blue-100 rounded-xl">
                            <p className="text-3xl font-bold text-gray-800">10</p>
                            <div className="flex justify-between">
                                <p className="text-base">CV tiếp nhận</p>
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
                                        d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                                    />
                                </svg>
                            </div>
                        </li>

                        <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-cyan-100 rounded-xl">
                            <p className="text-3xl font-bold text-gray-800">5</p>
                            <div className="flex justify-between">
                                <p className="text-base">CV phản hồi</p>
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
                                        d="M4.5 12.75l6 6 9-13.5"
                                    />
                                </svg>
                            </div>
                        </li>

                        <li className="flex flex-col gap-5 w-64 px-5 py-10 bg-pink-100 rounded-xl">
                            <p className="text-3xl font-bold text-gray-800">2</p>
                            <div className="flex justify-between">
                                <p className="text-base">CV ứng tuyển mới</p>
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
                                        d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25"
                                    />
                                </svg>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="mt-[2rem] flex-[1] h-[20rem]">
                    {/* <ApplicationAnalysticChart /> */}
                    <ApplicationAnalysticChartLine />
                </div>
            </div>
        </Dashboard>
    );
}
export default HomeCompany;
