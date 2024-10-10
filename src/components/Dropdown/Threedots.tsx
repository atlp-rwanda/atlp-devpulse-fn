import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router";
import { getAllFilteredTraineess } from "../../redux/actions/filterTraineeActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Button from "../form/Button";
import MenuItem from "@mui/material/MenuItem";

interface ThreedotsProps {
  useParentFx: () => void;
  allfilteredTrainees: any;
  min: string;
}

const Threedots = (props: ThreedotsProps) => {
  const { allfilteredTrainees, min } = props;
  const traineeList = allfilteredTrainees?.data;
  const [anchorEl, setAnchorEl] = useState<HTMLElement | SVGElement | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();

  const isLoading = !traineeList;

  const handleClick = () => setShowOptions(!showOptions);

  const handleClose = () => setAnchorEl(null);

  const handleOpenDetails = () => {
    navigate("/trainee-applicant-details");
  };

  const open = Boolean(anchorEl);

   return (
    <>
      {isLoading ? (
        <Skeleton width={40} height={40} />
      ) : (
        <div className="inline-block text-left">
          <Button type="button" onClick={handleClick} className="flex items-center" loading={isLoading}>
            <BsThreeDotsVertical
              onClick={(event) => setAnchorEl(event.currentTarget)}
              className="text-dots dark:text-[#dbdee6] h-5"
              viewBox="0 0 13 13"
            />
          </Button>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{ "aria-labelledby": "basic-button" }}
          >
            <a href={`#/filter_trainee-applicants/${min}`} className="text-button-color hover:bg-bdr text-sm">
              <MenuItem>Rate</MenuItem>
            </a>

            <a href="#">
              <MenuItem>Email</MenuItem>
            </a>

            {traineeList?.trainee_id ? (
              <Link to={`/trainee-applicant-details/${traineeList.trainee_id._id}`}>
                <a href="#" className="text-button-color hover:bg-bdr text-sm">
                  <MenuItem>View</MenuItem>
                </a>
              </Link>
            ) : (
              <Skeleton width={100} height={20} />
            )}

            <a href="#" className="text-button-color hover:bg-bdr text-sm" onClick={handleOpenDetails}>
              <MenuItem>Export</MenuItem>
            </a>

            <a href="#" className="text-button-color hover:bg-bdr text-sm">
              <MenuItem>Delete</MenuItem>
            </a>

            <a href="#" className="text-button-color hover:bg-bdr text-sm">
              <MenuItem>
                <ul>
                  <li>Permanent</li>
                  <li>Delete</li>
                </ul>
              </MenuItem>
            </a>
          </Menu>
        </div>
      )}
    </>
  );
};

const mapState = (state: any) => ({
  allfilteredTrainees: state.filterTrainee,
});

export default connect(mapState, {
  getAllFilteredTraineess,
})(Threedots);
