import React from "react";
// import logo from "../../assets/logo.svg"
// import * as logo from '../../assets/logo.svg';
// const logo: string = require("../../assets/logo.svg").default;
import { sidebarItems2, sidebarItems1,sidebarItems3 } from "./sidebarItems";

const sidebar = ()=>{
    return (
        <div className="min-h-screen w-64 block pb-10 pt-1 bg-slate-50 relative font-sans">
            <div className="mb-5 border-b border-[#979797]">
                <ul className="pl-4 block mt-6">
                {sidebarItems1.map((items, index) => {
                    return (
                    <li key={index} className="justify-content-start mb-1 align-items-center text-[#173B3F] text-base">
                        <a href={items.path} className="p-1 flex align-items-center leading-3 cursor-pointer font-semibold hover:font-bold">
                        <label className="mr-3 p-1">{items.icon}</label>
                        <label className="p-1">{items.title} </label>
                        </a>
                    </li>
                    );
                })}
                </ul>
            </div>
            <div className="mb-5">
                <ul className="pl-4 block mt-2">
                {sidebarItems2.map((items, index) => {
                    return (
                    <li key={index} className="justify-content-start  align-items-center text-[#173B3F]">
                        <a href={items.path} className="p-1 flex align-items-center leading-3 cursor-pointer text-base font-semibold hover:font-bold">
                        <label className="mr-3 p-1">{items.icon}</label>
                        <label className="p-1">{items.title} </label>
                        </a>
                    </li>
                    );
                })}
                </ul>
            </div>
            <div className=" absolute inset-x-0 bottom-2 ">
                <ul className="px-20 flex justify-content-center">
                {sidebarItems3.map((items, index) => {
                    return (
                    <li key={index} className="flex justify-content-center mb-1 align-items-center text-[#173B3F]">
                        <a href={items.path} className="p-1 flex align-items-center leading-5 cursor-pointer text-base">
                        <label className="mr-3 p-1">{items.icon}</label>
                        </a>
                    </li>
                    );
                })}
                </ul>
            </div>
        </div>
      );
}

export default sidebar