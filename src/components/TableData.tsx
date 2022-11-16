// @ts-nocheck
import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlinePlus,AiOutlineClose} from "react-icons/ai";
// import Pagination from "./Pagination";



interface TableData {
  data: [any];
  columns: any;
  title: string;
  
}

function DataTable({ data, columns, title }: TableData) {
  // const sortedData = React.useMemo(() => [...data], []);
  const sortedData = data;

  // const sortedColumns = React.useMemo(() => [...columns], []);
  const sortedColumns = columns;

  const TableInstance = useTable(
    { data: sortedData, columns: sortedColumns, initialState: { pageSize:3 } },

    useGlobalFilter,
    useSortBy,
    usePagination,
  );
  const { t } = useTranslation();

  const {
    getTableProps,

    setGlobalFilter,
    getTableBodyProps,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    gotoPage,
    pageCount,
    setPageSize,
    pageOptions,
    headerGroups,
    prepareRow,
    state,
  } = TableInstance;
  // @ts-ignore
  const { globalFilter, pageIndex, pageSize } = state;
  
  

  return (
    <div className="px-3 md:px-8">
    <div className="bg-white white:bg-dark-bg shadow-lg px-5 py-8 rounded-md w-[100%] mx-auto lg:w-[80%] lg:ml-60 mb-10">
    
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
   
                      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        
          <h2 className="text-black-800 dark:text-black font-semibold text-xl">
            {t(title)}
          </h2>
         
       
      </div>
      <div className="inline-block w-full lg:min-w-full shadow rounded-lg overflow-hidden">
        <table className="min-w-full leading-normal" {...getTableProps()}>
        
          <thead className="w-full px-32">
          

{headerGroups.map((headerGroup) => (

              
              <tr className= {headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (


        
              <th className="p-6 border-b-2 border-gray-200 bg-gray-100 white:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text- uppercase tracking-wider"
              {...column.getHeaderProps(column.getSortByToggleProps())}
            
              > 

              {column.render('Header')}
              </th>
                
                  
                 
                 
                  
                ))}
                
              </tr>
             
            ))}
 
          </thead>
         
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);

              // eslint-disable-next-line operator-linebreak
              const rowTheme =
                row.index % 2 !== 0
                  ? 'bg-light-bg dark:bg-dark-tertiary'
                  : 'bg-white dark:bg-dark-bg';

              return (
                <tr className={` ${rowTheme}} ` } {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td className="p-6 border-b border-gray-200 dark:border-dark-tertiary text-sm" {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    
                    </td>
                    
                  ))}
                   
                </tr>
              );
            })}
          </tbody>
        </table>
        





       
      </div>
      
    </div>
    </div>
    
    </div>
    
    </div> 





    
     
  );
}

export default DataTable;