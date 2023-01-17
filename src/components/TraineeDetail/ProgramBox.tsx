import React from "react";

import { IconType } from "react-icons";

interface ProgramItemProps {
  title: string;
  value: string | number | boolean;
  Icon: IconType;
}

const ProgramItem: React.FC<ProgramItemProps> = ({ title, value,Icon }) => {
  return (
    <div className="ml-5 flex items-center gap-4">
      <Icon size={50} />
      <div>
        <h3 className="pb-2">{title}</h3>
        <p className="text-gray-500 text-sm">{value}</p>
      </div>
    </div>
  );
};

export default ProgramItem;
