import React, { useState } from 'react'
import { AiOutlineSearch, AiOutlineClose } from "react-icons/ai";

function SearchBar({ placeholder, data }) {
    const allData = data?.allTrainnees
    const [filteredData, setFilteredData] = useState([])
    const [wordEntered, setWordEntered] = useState("")

    const handleFilter = (e) => {
        e.preventDefault();
        const searchWord = e.target.value
        setWordEntered(searchWord)
        const newFilter = allData.filter((value) => {
            return (
                value.firstName.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.lastName.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.email.toLowerCase().includes(searchWord.toLowerCase()) ||
                value.status.toLowerCase().includes(searchWord.toLowerCase())
            )
        })
        if (searchWord === "") {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
        }
    }

    const clearInpunt = () => {
        setFilteredData([]);
        setWordEntered("")
    }

    return (
        <div className='search'>
            <div className=" searchInputs relative block ">
                <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg className="h-5 w-5 fill-slate-300 text-cg" viewBox="-6 -2 20 20">
                        {filteredData.length === 0 ? (
                        <AiOutlineSearch />
                        ) : (
                        <AiOutlineClose className="cursor-pointer" onClick={clearInpunt}/>
                        )}
                        
                    </svg>
                </span>
                <input onChange={handleFilter} className="block bg-row-gray w-50 border border-bdr rounded-bt-rd mt-2 py-2 pl-9 pr-4 focus:outline-none sm:text-sm" value={wordEntered} placeholder={placeholder} type="text" name="search" />
            </div>
            {filteredData.length != 0 && (
                <div className='dataResult mt-1 h-40 overflow-hidden overflow-y-auto bg-row-gray shadow rounded'>
                    {filteredData?.slice(0, 10).map((value: any, key: any) => {
                        return (
                            <p className=' dataItem hover:bg-bdr hover:cursor-pointer p-2 text-sm'>{value.firstName + " " + value.lastName}</p>
                        )
                    })}
                </div>
            )}

        </div>
    )
}

export default SearchBar