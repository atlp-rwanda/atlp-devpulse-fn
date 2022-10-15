import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

const Threedots = () => {
    const [showOptions, setShowOptions] = useState(false);
    const handleClick = () => {
        setShowOptions(!showOptions)
    }

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" onClick={handleClick} className="flex items-center">
                    <BsThreeDotsVertical className="text-dots h-5" viewBox="0 0 12 12"/>
                </button>
            </div>
            {showOptions && (
                <div className="absolute z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" >
                    <div className="" role="none">
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-0">Email</a>
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-1">View</a>
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">Export</a>
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">Delete</a>
                        <a href="#" className="text-button-color hover:bg-bdr block px-4 py-2 text-sm" role="menuitem" id="menu-item-2">Permanent Delete</a>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Threedots;