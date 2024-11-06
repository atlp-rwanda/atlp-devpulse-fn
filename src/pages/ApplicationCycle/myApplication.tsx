import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { getMyOwnAppliedJob } from "../../redux/actions/applications";
import DynamicTable from "../../components/Tables/DynamicTable";

export const MyApplication = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getMyOwnAppliedJob());
    }, [dispatch]);

    const { loading, data } = useAppSelector((state) => state.myApplications);

    return (
        <div className="py-8 px-6 min-h-screen bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white">
            <h2 className="pl-5 text-3xl font-extrabold text-primary dark:text-[#56C870] sm:text-4xl mb-6">
                My Application
            </h2>
            <div className="dark:bg-[#1F2A37] p-6 mt-5 rounded-lg shadow-lg">
                <div className="flex flex-col sm:flex-row border-b border-gray-300 dark:border-gray-600 pb-4">
                    <div className="sm:w-1/2 pr-4 mb-4 sm:mb-0">
                        <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-[#56C870]">
                            Personal Information
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                            <li className="list-item">
                                <strong>Firstname:</strong> John
                            </li>
                            <li className="list-item">
                                <strong>Lastname:</strong> Doe
                            </li>
                            <li className="list-item">
                                <strong>Email:</strong> john.doe@example.com
                            </li>
                            <li className="list-item">
                                <strong>Application cycle:</strong> Cycle 1
                            </li>
                            <li className="list-item">
                                <strong>Publication date:</strong> 14th, Nov 2024
                            </li>
                            <li className="list-item">
                                <strong>Application date:</strong> 24th, Nov 2024
                            </li>
                        </ul>
                    </div>
                    <div className="sm:w-1/2 pl-4">
                        <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-[#56C870]">
                            Address
                        </h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                            <li className="list-item">
                                <strong>Street:</strong> Niboye
                            </li>
                            <li className="list-item">
                                <strong>District:</strong> Kicukiro
                            </li>
                            <li className="list-item">
                                <strong>Country:</strong> Rwanda
                            </li>
                            <li className="list-item">
                                <strong>Phone:</strong> +250788923011
                            </li>
                        </ul>
                    </div>
                </div>

                <section>
                    <h3 className="text-2xl font-bold text-primary dark:text-[#56C870] mb-4">
                        Application Stages
                    </h3>
                    <p className="mb-3">
                        <strong>Current Stage:</strong> <span className="text-green-500">Admitted</span> /
                        <span className="text-red-500">Dismissed</span>
                    </p>

                    {/* Stages History */}
                    <div className="bg-gray-100 dark:bg-[#262E3D] p-4 rounded-lg mt-4 shadow">
                        <h4 className="text-xl font-semibold mb-3">Stages History</h4>
                        <ul className="space-y-6 list-disc list-inside marker:text-[#56C870] dark:marker:text-green-400">
                            <li>
                                <strong>Interview</strong>
                                <p>From 12, Dec 2024 - 20, Dec 2024</p>
                                <span><b>Score:</b> 2</span>
                                <p className="mt-2">
                                    <b>Comments: </b>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error delectus ratione quo aliquid perspiciatis velit tenetur, magni soluta repellat, ut similique eligendi debitis nostrum maiores deleniti deserunt accusantium ex laboriosam!
                                </p>
                            </li>
                            <li>
                                <strong>Interview</strong>
                                <p>From 12, Dec 2024 - 20, Dec 2024</p>
                                <span><b>Score:</b> 2</span>
                                <p className="mt-2">
                                    <b>Comments: </b>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error delectus ratione quo aliquid perspiciatis velit tenetur, magni soluta repellat, ut similique eligendi debitis nostrum maiores deleniti deserunt accusantium ex laboriosam!
                                </p>
                            </li>
                            <li>
                                <strong>Interview</strong>
                                <p>From 12, Dec 2024 - 20, Dec 2024</p>
                                <span><b>Score:</b> 2</span>
                                <p className="mt-2">
                                    <b>Comments: </b>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error delectus ratione quo aliquid perspiciatis velit tenetur, magni soluta repellat, ut similique eligendi debitis nostrum maiores deleniti deserunt accusantium ex laboriosam!
                                </p>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};
