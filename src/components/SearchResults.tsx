import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSearchData } from '../redux/actions/fetchSearchDataAction';
import { RootState } from '../redux/reducers';

interface SearchResultsProps {
  searchTerm: string;
  filterAttribute: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ searchTerm, filterAttribute }) => {
  const dispatch = useDispatch();
  const searchResults = useSelector((state: RootState) => state.searchData.data);
  const loading = useSelector((state: RootState) => state.searchData.loading);
  const error = useSelector((state: RootState) => state.searchData.error);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSearchData({ searchTerm, itemsPerPage: 10, page: 1, filterAttribute }));
    }
  }, [dispatch, searchTerm, filterAttribute]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {searchResults && searchResults.length > 0 ? (
        <ul>
          {searchResults.map((result: any, index: number) => (
            <li key={index}>{result.title || result.firstname || result.lastname}</li>
          ))}
        </ul>
      ) : (
        <div>No results found</div>
      )}
    </div>
  );
};

export default SearchResults;