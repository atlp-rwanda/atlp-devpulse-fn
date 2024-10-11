import React from "react";

const SearchResultItem = ({
  activeItem,
  name,
  length,
  results,
  Component,
  noResultsMessage,
}) => {
  if (activeItem !== name) return null;

  const props = {
    Users: { users: results },
    Roles: { roles: results },
    Jobs: { jobs: results },
    Cohorts: { cohorts: results },
    Programs: { programs: results },
    Trainees: { trainees: results },
    Applicationcycles: { applicationCycles: results },
  };

  return length > 0 ? (
    <Component {...props[name]} />
  ) : (
    <p className="text-center py-6 text-white">{noResultsMessage}</p>
  );
};

export default SearchResultItem;