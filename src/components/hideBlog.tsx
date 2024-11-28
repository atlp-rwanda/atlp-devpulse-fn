import WarningModal from "./application/WarningModal";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideBlogAction } from "../redux/actions/blogActions"
import { toast } from "react-toastify";


interface HideUnhideButtonProps {
  blogId: string;
  isHidden: boolean;
}

const HideUnhideButton: React.FC<HideUnhideButtonProps> = ({ blogId, isHidden }) => {
  const dispatch = useDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleHideUnhideClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleConfirmAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(hideBlogAction(blogId));
    setIsModalOpen(false);
  };

  const handleCancelAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={handleHideUnhideClick}
        className={`mt-2 text-tertiary hover:bg-primary ${isHidden ? 'bg-red-500' : 'bg-green'} px-4 py-2 rounded-md`}
      >
        {isHidden ? "Unhide" : "Hide"}
      </button>

      <WarningModal
        isOpen={isModalOpen}
        message={`Are you sure you want to ${isHidden ? "unhide" : "hide"} this blog?`}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
      />
    </div>
  );
};

export default HideUnhideButton;

