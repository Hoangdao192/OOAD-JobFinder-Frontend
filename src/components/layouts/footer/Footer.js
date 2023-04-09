import LogoJobFinder from "../../../assets/image/candidates/LogoJobFinder.png"
import { Link, useNavigate } from "react-router-dom";
import BackgroudFooter from "../../../assets/image/candidates/BackgroudFooter.png"
import React from "react";

export const Footer = () => {
    const navigate = useNavigate();

    const handleClickLogoJobFinder = (e) => {
        navigate("/");
    }

    return (
        <>
            <div className="flex flex-row justify-evenly justify-stretch justify-self-center p-3 bg-gradient-to-br from-common_color to-hover_common_color text-white w-full h-auto">
            <div className="space-y-1 content-center whitespace-pre-line w-full">
                    <p className="text-center text-[1.2rem] content-center align-center items-center justify-center">Đồng sáng lập{"\n"}</p>
                    <p className="text-center text-[0.9rem] content-center align-center items-center justify-center">Nguyễn Đăng Hoàng Đạo{"\n"}Nguyễn Thị Thanh Huyền{"\n"}Trần Đình Cường{"\n"}Trần Thị Kim Bắc{"\n"}Phan Văn Tiến Dũng</p>
                </div>
                
                <div className="w-3/4 space-y-4 mt-1">
                    <div onClick={handleClickLogoJobFinder} className="flex flex-row space-x-3 items-center justify-center">
                        <img className="rounded-md w-12 h-12 border border-[0.15rem] border-white" src={LogoJobFinder}></img>
                        <div>
                            <h1 className="text-2xl font-bold justify-start text-white">
                                Job Finder
                            </h1>
                            <p className="text-[0.7rem] text-center">Công việc ước mơ</p>
                        </div>
                    </div>

                    <div>
                        <h1 className="text-[1.0rem] text-center justify-start text-white">
                            Công ty Việt Nam
                        </h1>
                       
                        <h1 className="text-[1.0rem] text-center justify-start text-white">
                            Chất Lượng Diễn Châu
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;