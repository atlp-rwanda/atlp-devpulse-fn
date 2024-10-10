import React from "react";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Skeleton from "react-loading-skeleton";

const MenuItemList = ({ traineeList, scorePageId, navigate, handleClose }: any) => (
  <>
    <a href={`#/filter_trainee-applicants/${scorePageId}`} className="text-button-color hover:bg-bdr text-sm">
      <MenuItem onClick={handleClose}>Rate</MenuItem>
    </a>
    <a href="#" className="text-button-color hover:bg-bdr text-sm">
      <MenuItem onClick={handleClose}>Email</MenuItem>
    </a>
    {traineeList.trainee_id ? (
      <Link to={`/trainee-applicant-details/${traineeList.trainee_id._id}`}>
        <MenuItem onClick={handleClose}>View</MenuItem>
      </Link>
    ) : (
      <Skeleton width={100} height={20} />
    )}
    <a href="#" className="text-button-color hover:bg-bdr text-sm" onClick={() => navigate("/trainee-applicant-details")}>
      <MenuItem onClick={handleClose}>Export</MenuItem>
    </a>
    <a href="#" className="text-button-color hover:bg-bdr text-sm">
      <MenuItem onClick={handleClose}>Delete</MenuItem>
    </a>
    <MenuItem onClick={handleClose}>
      <ul>
        <li>Permanent</li>
        <li>Delete</li>
      </ul>
    </MenuItem>
  </>
);

export default MenuItemList;
