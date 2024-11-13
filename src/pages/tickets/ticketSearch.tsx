import React from "react";
import Select from "react-select";

const SearchFilter = ({
  options,
  filterAttribute,
  setFilterAttribute,
  searchTerm,
  handleSearchChange,
  handleKeyDown,
  theme,
  placeholder = "Search",
  searchInputClassName = "",
  selectClassName = "",
  containerClassName = "",
}) => {
  const customTheme = (theme: any) => ({
    ...theme,
    colors: {
      ...theme.colors,
      text: "light-gray",
      primary25: "#E5E7EB",
      primary: "#d6dfdf",
      neutral0: "white",
    },
  });

  const darkTheme = (theme: any) => ({
    ...theme,
    colors: {
      primary25: "#404657",
      primary: "#d6dfdf",
      neutral0: "#293647",
    },
  });
  const sortedOptions = [
    ...options.filter((opt) => opt.value !== ""),
    { value: "", label: "Filter by" },
  ];

  return (
    <>
      <div className="w-full sm:w-40">
        <Select
          className={`w-full text-sm rounded-md dark:text-ltb ${selectClassName}`}
          options={sortedOptions}
          defaultValue={sortedOptions[sortedOptions.length - 1]}
          onChange={(e) => setFilterAttribute(`${e?.value}`)}
          theme={theme ? customTheme : darkTheme}
          isSearchable={false}
        />
      </div>
      <div className="w-full sm:w-auto flex-grow">
        <div className="relative">
          <input
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className={`w-full bg-row-gray dark:bg-[#293647] dark:text-ltb border border-bdr dark:border-cg dark:border-opacity-5 rounded-md py-2 pl-9 pr-4 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-[#56C870] text-sm ${searchInputClassName}`}
            value={searchTerm}
            placeholder={placeholder}
            type="text"
            name="search"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;
