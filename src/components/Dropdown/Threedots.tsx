import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";

const Threedots = () => {
    const [showOptions, setShowOptions] = useState(false);
    const handleClick = () => {
        setShowOptions(!showOptions)
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClose = () => {
        setAnchorEl(null);
    };
    const navigate = useNavigate();
    const handleOpenDetails =()=>{
       
        navigate("/trainee-details")
    }

    return (
        <div className="inline-block text-left">
            <div>
                <button type="button" onClick={handleClick} className="flex items-center">
                    <BsThreeDotsVertical
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget as unknown as HTMLElement);
                        }}
                        className="text-dots h-5"
                        viewBox="0 0 13 13" />
                </button>
            </div>
            {/* {showOptions && ( */}
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        "aria-labelledby": "basic-button",
                    }}
                >
                    <a href="#" ><MenuItem>Email</MenuItem></a>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm" onClick={handleOpenDetails} ><MenuItem>View</MenuItem></a>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm"><MenuItem>Export</MenuItem></a>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm"><MenuItem>Delete</MenuItem></a>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm"><MenuItem><ul><li>Permanent </li><li>Delete</li></ul></MenuItem></a>

                </Menu>
            {/* )} */}

        </div>
    )
}

export default Threedots;