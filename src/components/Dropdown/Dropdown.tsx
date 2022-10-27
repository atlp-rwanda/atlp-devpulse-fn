import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";


const Dropdown = () => {
    const [showOptions, setShowOptions] = useState(false);
    const handleClick = () => {
        setShowOptions(!showOptions)
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={handleClick} className="flex items-center border bg-row-gray border-solid border-bdr shadow-sm pl-4 pr-4 py-4px rounded-bt-rd">
                    <span className="">
                        <h4 className="text-button-color font-normal sm:text-sm">Select value</h4>
                    </span>
                    <span className="pl-3 text-button-color"><FaCaretDown /></span>
                </button>
            </div>
            {showOptions && (
                <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                    <div className="" role="none">
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Passed</a>
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">Failed</a>
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">Religated</a>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Dropdown;

