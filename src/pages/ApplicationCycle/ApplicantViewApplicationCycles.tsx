import React, { useEffect, useState } from "react";
import {
    getAllCycles,
    createCycle,
    updateApplicationCycle,
    deleteApplicationCycle,
    applicantApplyCycle,
    applicantGetCyclesApplications,
    getApplicantsStageHistory,
} from "../../redux/actions/cyclesActions";
import { connect } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { CycleSkeleton } from '../../skeletons/cycleSkeleton';
import { toast, ToastContainer } from "react-toastify";

const ApplicantViewApplicationCycles = (props: any) => {
    const { allCycles, errors } = props;
    const [loading, setLoading] = useState(true);
    const [applications, setApplications] = useState([]); // To store the user’s applications
    const cycles = allCycles?.data || [];
    const [stageHistory, setStageHistory]: any = useState("");

    const [isTrackOpen, setIsTrackOpen] = useState(false);
    useEffect(() => {
        const fetchCycles = async () => {
            setLoading(true);
            await props.getAllCycles();
            setLoading(false);
        };
        fetchCycles();
    }, [props]);

    useEffect(() => {
        getCyclesApplications();
    }, []);

    const getCyclesApplications = async () => {
        try {
            setLoading(true);
            const response = await applicantGetCyclesApplications();
            setApplications(response?.data?.getTraineeCyclesApplications || []);
        } catch (error) {
            toast.error("An Unknown error occurred!");
        } finally {
            setLoading(false);
        }
    };

    const handleApplyCycle = async (cycleId) => {
        try {
            setLoading(true);
            const response: any = await applicantApplyCycle(cycleId);
            if (response.data.applyCycle.message === "You have already applied to this Cycle") {
                toast.error("You have already applied to this Cycle");
                return;
            }
            getCyclesApplications();
            toast.success("Application submitted successfully!");
        } catch (error) {
            toast.error("An Unknown error occurred!");
        } finally {
            setLoading(false);
        }
    };

    const isCycleApplied = (cycleId: any) => {
        return applications.some((application: any) => application.cycle_id === cycleId);
    };

    const getApplicationId = (cycleId: any) => {
        const foundApplication: any = applications.find((application: any) => application.cycle_id === cycleId);
        console.log("Application found", foundApplication);
        return foundApplication ? foundApplication._id : null;
    };



    const handleOpenTrackApplication = async (applicantId: any) => {
        console.log("APP ID", applicantId);
        const response = await getApplicantsStageHistory(applicantId)
        if (response) {
            setStageHistory(response)
            setIsTrackOpen(true);
        }
        else {
            toast.error("No application stage history found!");
        }
    }
    const handleClose = () => {
        setIsTrackOpen(false);
    }

    return (
        <>
            <ToastContainer />
            <div className="flex dark:bg-dark-frame-bg dark:text-white bg-[#F9F9FB] min-h-[100vh]">
                <div className="min-h-[50vh] w-[100%] block md:w-[100%] md:mt-0 pt-4">
                    <div className="table table-fixed w-[100%] top-[20%] md:top-[10%] pb-10 md:relative px-8 md:px-[10px]">
                        <div>
                            <div className="w-[100%] dark:bg-dark-bg max-h-[70vh] m-auto bg-[#fff] shadow-md rounded-[10px] relative pb-[20px] overflow-x-auto overflow-y-scroll md:w-[100%]">
                                {loading ? (
                                    <CycleSkeleton />
                                ) : cycles.length === 0 ? (
                                    <div className="p-4 text-center text-gray-500">
                                        No cycles available at the moment.
                                    </div>
                                ) : (
                                    <table className="min-w-full leading-normal">
                                        <thead className="w-full px-32 sticky top-0">
                                            <tr>
                                                <th className="p-6 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                                    #
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                                    Cycle name
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                                    Start date
                                                </th>
                                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase md:table-cell tracking-wider">
                                                    Closing date
                                                </th>
                                                <th className="border-b-2 sm:text-center border-gray-200 bg-gray-100 dark:bg-dark-tertiary  text-left text-xs font-semibold text-gray-600 dark:text-white uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cycles.map((cycle, index) => (
                                                <tr key={cycle.id}>
                                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                        {index + 1}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                        {cycle.name}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                        {cycle.startDate}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm">
                                                        {cycle.endDate}
                                                    </td>
                                                    <td className="px-5 py-5 border-b border-gray-200 dark:border-dark-tertiary text-sm text-center">
                                                        <div className="flex justify-center items-center space-x-4">
                                                            {isCycleApplied(cycle.id) ? (
                                                                <button
                                                                    className="h-[40px] w-[120px] rounded-[5px] dark:bg-[#56C870] bg-[#173b3f] text-white flex justify-center items-center p-0 px-[10px] mb-[20px]"
                                                                    onClick={() => handleOpenTrackApplication(getApplicationId(cycle.id))}
                                                                >
                                                                    Track Application
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    className="h-[40px] w-[120px] rounded-[5px] dark:bg-[#56C870] bg-[#173b3f] text-white flex justify-center items-center p-0 px-[10px] mb-[20px]"
                                                                    onClick={() => handleApplyCycle(cycle.id)}
                                                                >
                                                                    Apply
                                                                </button>
                                                            )}
                                                        </div>
                                                    </td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isTrackOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
                    <div className="bg-white dark:bg-[#1F2937] rounded-lg w-full max-w-lg p-6 shadow-lg transform transition-all duration-300 ease-in-out">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold dark:text-white">
                                Application Stages History
                            </h2>
                            <button onClick={handleClose} className="text-red hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition duration-200">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-lg font-medium dark:text-gray-200">
                                <b>Current Stage:</b> {stageHistory.currentStage}
                            </p>
                        </div>

                        <div> {stageHistory.history.length > 0 && (
                            <div>
                                <h5 className="text-lg font-semibold mb-3 dark:text-gray-200">Full History</h5>
                                <ul className="space-y-2">
                                    {stageHistory.history.map((stage, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center space-x-2 p-2 rounded-lg bg-gray-100 dark:bg-[#374151] dark:text-gray-200"
                                        >
                                            <span className="font-medium">{stage.stage}</span>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">- {new Date(stage.enteredAt).toLocaleDateString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>)}
                        </div>
                    </div>
                </div>
            )}

        </>
    );
};

const mapState = ({ cycles }: any) => ({
    allCycles: cycles,
    errors: cycles.errors,
});

export default connect(mapState, {
    getAllCycles,
    createCycle,
    updateApplicationCycle,
    deleteApplicationCycle,
})(ApplicantViewApplicationCycles);
