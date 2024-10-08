import React from 'react';

const SearchResultItem= ({ 
  activeItem, 
  name, 
  length, 
  results, 
  Component, 
  noResultsMessage 
}) => {
  if (activeItem !== name) return null;

  return length > 0 ? (
    <Component {...{ [name.toLowerCase()]: results }} />
  ) : (
    <p className="text-center py-6 text-white">{noResultsMessage}</p>
  );
};

export default SearchResultItem;
