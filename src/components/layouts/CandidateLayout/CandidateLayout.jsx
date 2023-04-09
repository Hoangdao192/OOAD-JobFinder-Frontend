import React, { Children, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Authentication from 'services/Authentication/Authentication';

import LogoJobFinder from "../../../assets/image/candidates/LogoJobFinder.png"
import { AccountCircle, Lock, Logout } from '@mui/icons-material';
// import { useOnClickOutside } from 'hooks/useOnClickOutside';

function Header() {
    const navigate = useNavigate()

    const isLogged = Authentication.isUserAuthenticated();
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const subMenuRef = useRef(null);

    const subMenuItemCandidate = [
        {
            title: "Thông tin cá nhân",
            icon: <AccountCircle />,
            onClick: () => {}
        },
        {
            title: "Đổi mật khẩu",
            icon: <Lock />,
            onClick: () => {}
        },
        {
            title: "Đăng xuất",
            icon: <Logout />,
            onClick: () => {
                navigate("/auth/signout")
            }
        }
    ]
    const subMenuItemCompany = [
        {
            title: "Bảng điều khiển",
            icon: <AccountCircle />,
            onClick: () => {
                navigate("/company")
            }
        },
        {
            title: "Đổi mật khẩu",
            icon: <Lock />,
            onClick: () => {}
        },
        {
            title: "Đăng xuất",
            icon: <Logout />,
            onClick: () => {
                navigate("/auth/signout")
            }
        }
    ]
    const subMenuItemAdmin = [
        {
            title: "Bảng điều khiển",
            icon: <AccountCircle />,
            onClick: () => {
                navigate("/admin")
            }
        },
        {
            title: "Đổi mật khẩu",
            icon: <Lock />,
            onClick: () => {}
        },
        {
            title: "Đăng xuất",
            icon: <Logout />,
            onClick: () => {
                navigate("/auth/signout")
            }
        }
    ]

    let subMenuItem =  subMenuItemCandidate;
    if (Authentication.isCompany()) {
        subMenuItem = subMenuItemCompany;
    } else if (Authentication.isAdmin()) {
        subMenuItem = subMenuItemAdmin;
    }

    return (
        <header className="text-gray-500">
            <nav className="container mx-auto py-4 px-[2rem] flex items-center justify-between">
                {/* Logo */}
                <div className='flex flex-row space-x-3 items-center'>
                    <img className='rounded-md w-10 h-10' src={LogoJobFinder}></img>
                    <h1 className="text-2xl font-bold justify-start text-common_color">Job Finder</h1>
                </div>
                {
                    !isLogged && <div className='flex space-x-4'>
                        <Link to='/auth/signin'>
                            <button className="w-[7.5rem] whitespace-nowrap bg-common_color hover:bg-green-700 text-white py-1 px-4 rounded-md justify-end">
                                Đăng nhập
                            </button>
                        </Link>
                        <Link to="/auth/signup">
                            <button className="w-[7.5rem] whitespace-nowrap bg-common_color hover:bg-green-700 text-white py-1 px-4 rounded-md justify-end">
                                Đăng kí
                            </button></Link>
                    </div>
                }
                {
                    isLogged && 
                    <div className='flex space-x-4 relative'
                        ref={subMenuRef}
                        onMouseOver={() => setIsSubmenuOpen(true)}
                        
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {
                            isSubmenuOpen &&
                            <div className="min-w-[15rem] drop-shadow-md flex flex-col right-0 bg-white rounded-xl z-10 top-full mt-2 absolute w-fit whitespace-nowrap"
                                onMouseLeave={() => setIsSubmenuOpen(false)}
                            ><div className="overflow-hidden rounded-xl">
                                {
                                    subMenuItem.map((item, index) => {
                                        return (
                                            <div onClick={item.onClick} className="p-4 group hover:bg-[#f1f1f1] cursor-pointer flex items-center gap-[1rem]" key={index}>
                                                {item.icon}
                                                <p>{item.title}</p>
                                            </div>
                                        )
                                    })
                                }</div>
                            </div>
                        }
                    </div>
                }
            </nav>
        </header>
    );
}


export default function CandidateLayout({ children }) {
    return (
        <div className="bg-[#f7f7f7] h-screen flex flex-col">
            <div>
                <Header />
            </div>
            <div className="flex w-full flex-grow">
                {children}
            </div>
        </div>
    );
}