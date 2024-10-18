import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchSearchData } from '../redux/actions/fetchSearchDataAction';
import { RootState } from '../redux/reducers';
import { Circles } from 'react-loader-spinner';
import SearchResultItem from '../components/SearchResultItem'
import Users from '../components/search/users';
import Roles from '../components/search/roles';
import Jobs from '../components/search/jobs';
import Cohorts from '../components/search/cohorts';
import Programs from '../components/search/programs';
import Trainees from '../components/search/trainees';
import Applicationcycles from '../components/search/applicationcycles';

const Search = () => {
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('q'), filterAttribute = searchParams.get('filter') || '';
  const [activeItem, setActiveItem] = useState('Users');

  const dispatch = useDispatch();
  const { data: searchResults, loading, error } = useSelector((state: RootState) => state.searchData);

  useEffect(() => {
    if (searchTerm) {
      dispatch(fetchSearchData({ searchTerm, itemsPerPage: 10, page: 1, filterAttribute }));
    }
  }, [dispatch, searchTerm, filterAttribute]);

  const items = [
    { name: 'Users', length: searchResults?.users?.length || 0, Component: Users, results: searchResults?.users },
    { name: 'Roles', length: searchResults?.roles?.length || 0, Component: Roles, results: searchResults?.roles },
    { name: 'Jobs', length: searchResults?.jobs?.length || 0, Component: Jobs, results: searchResults?.jobs },
    { name: 'Cohorts', length: searchResults?.cohorts?.length || 0, Component: Cohorts, results: searchResults?.cohorts },
    { name: 'Programs', length: searchResults?.programs?.length || 0, Component: Programs, results: searchResults?.programs },
    { name: 'Trainees', length: searchResults?.trainees?.length || 0, Component: Trainees, results: searchResults?.trainees },
    { name: 'Applicationcycles', length: searchResults?.applicationCycles?.length || 0, Component: Applicationcycles, results: searchResults?.applicationCycles },
  ];

  return (
    <div className="w-full">
      <div className="w-full px-16 py-4 text-3xl text-white">
        <h1>Search Results</h1>
      </div>
      <div className="flex flex-row gap-8 mx-12">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex gap-2 cursor-pointer ${activeItem === item.name ? 'text-[#56C870]' : 'text-white'}`}
            onClick={() => setActiveItem(item.name)}
          >
            <span className={`my-2 border-b-2 ${activeItem === item.name ? 'border-[#56C870]' : 'border-none'}`}>
              {item.name} ({item.length})
            </span>
          </div>
        ))}
      </div>
      <div className="w-full bg-white h-[.1px]" />
      <div>
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Circles height="80" width="80" color="#4fa94d" ariaLabel="circles-loading" visible={true} />
          </div>
        ) : error ? (
          <p>Error: {error.message || 'An error occurred'}</p>
        ) : (
          <>
            {items.map(item => (
              <SearchResultItem
                key={item.name}
                activeItem={activeItem}
                name={item.name}
                length={item.length}
                results={item.results || []}
                Component={item.Component}
                noResultsMessage={`No ${item.name.toLowerCase()} found.`}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
