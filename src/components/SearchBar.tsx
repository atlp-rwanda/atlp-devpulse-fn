import React, { useState } from "react";
import * as icons from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttribute, setFilterAttribute] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`search?q=${searchTerm}&filter=${filterAttribute}`);
    }
  };

  return (
    <div className="flex items-center">
      <div className="flex bg-gray-100 dark:bg-dark-tertiary rounded-xl h-10 items-center border-2">
        <select
          className="bg-gray-800 text-white border-none text-sm dark:text-gray-300 outline-none pl-2 py-2 rounded-l-xl cursor-pointer"
          value={filterAttribute}
          onChange={(e) => setFilterAttribute(e.target.value)}
        >
          <option value="">All</option>
          <option value="firstname">First Name</option>
          <option value="lastname">Last Name</option>
          <option value="email">Email</option>
          <option value="roleName">Role Name</option>
          <option value="title">Title</option>
          <option value="phase">Phase</option>
          <option value="name">Name</option>
        </select>
        <input
          type="text"
          placeholder="Search devpulse"
          className="bg-transparent outline-none px-2 text-gray-700 dark:text-gray-300 w-96"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="px-4" onClick={handleSearch}>
          <icons.AiOutlineSearch className="cursor-pointer text-cyan-300" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
