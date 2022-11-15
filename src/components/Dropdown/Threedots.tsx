import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router";
import { getAllFilteredTraineess } from "./../../redux/actions/filterTraineeActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Threedots = (props: any) => {
  const { allfilteredTrainees } = props;
  const traineeList = allfilteredTrainees.data;

  const [showOptions, setShowOptions] = useState(false);
  const handleClick = () => {
    setShowOptions(!showOptions);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const navigate = useNavigate();
  const handleOpenDetails = () => {
    navigate("/trainee-details");
  };

  const scorePageId = props.min;

  return (
    <>
      {traineeList && (
        <div className="inline-block text-left">
            <div>
                <button type="button" onClick={handleClick} className="flex items-center">
                    <BsThreeDotsVertical
                        onClick={(event) => {
                            setAnchorEl(event.currentTarget as unknown as HTMLElement);
                        }}
                        className="text-dots  dark:text-[#dbdee6] h-5"
                        viewBox="0 0 13 13" />
                </button>
            </div>
           
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
                    {traineeList.trainee_id && <>
                    <Link to={`/trainee-Details/${traineeList.trainee_id._id}`}>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm" ><MenuItem>View</MenuItem></a>
                   
                    </Link></>}
                    <a href="#" className="text-button-color hover:bg-bdr text-sm" onClick={handleOpenDetails} ><MenuItem>Export</MenuItem></a>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm"><MenuItem>Delete</MenuItem></a>
                    <a href="#" className="text-button-color hover:bg-bdr text-sm"><MenuItem><ul><li>Permanent </li><li>Delete</li></ul></MenuItem></a>

                </Menu>
           

        </div>
      )}
    </>
  );
};

// export default Threedots;
const mapState = ({ filterTrainee }: any) => ({
  allfilteredTrainees: filterTrainee,
});

export default connect(mapState, {
  getAllFilteredTraineess: getAllFilteredTraineess,
})(Threedots);
