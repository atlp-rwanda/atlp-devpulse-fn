import React, { useState } from "react";

const DocumentSelector = ({ item }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleDocumentOnClick = (urls: string) => {
        const url = `#/view-external-document?fileUrl=${encodeURIComponent(urls)}&backUrl=${encodeURIComponent("/")}&title=${encodeURIComponent("Documents Preview")}`;
        window.open(url, "_blank");
    };
    return (
        <div className="relative inline-block">
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={toggleDropdown}
            >
                Select Attachment
            </button>

            {isDropdownOpen && (
                <ul className="dark:text-white dark:bg-dark-tertiary absolute mt-2 border border-gray-300 rounded-lg shadow-lg w-48 z-50">
                    {item?.idDocumentUrl && (
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 text-white hover:bg-gray-100 hover:text-blue-500 focus:outline-none"
                                onClick={() => {
                                    handleDocumentOnClick(item.idDocumentUrl);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                ID Card
                            </button>
                        </li>
                    )}
                    {item?.resumeUrl && (
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 text-white hover:bg-gray-100 hover:text-blue-500 focus:outline-none"
                                onClick={() => {
                                    handleDocumentOnClick(item.resumeUrl);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                Resume
                            </button>
                        </li>
                    )}
                    {item?.coverLetterUrl && (
                        <li>
                            <button
                                className="w-full text-left px-4 py-2 text-white hover:bg-gray-100 hover:text-blue-500 focus:outline-none"
                                onClick={() => {
                                    handleDocumentOnClick(item.coverLetterUrl);
                                    setIsDropdownOpen(false);
                                }}
                            >
                                Cover Letter
                            </button>
                        </li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default DocumentSelector;