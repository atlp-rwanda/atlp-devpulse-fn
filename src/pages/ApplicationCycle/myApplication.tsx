import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toast, ToastContainer } from "react-toastify";
import { parseISO, format } from "date-fns";
import {
    getApplicantCyclesApplications,
    getCyclesApplicationAttributes,
    getCyclesStages
} from "../../redux/actions/applications";

export const MyApplication = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [application, setApplication]: any = useState();
    const [attributes, setAttributes]: any = useState();
    const [stages, setStages]: any = useState();

    useEffect(() => {
        const fetchApps = async () => {
            try {
                setIsLoading(true);
                const response = await getApplicantCyclesApplications();
                if (response.data) {
                    setApplication(response.data.getTraineeCyclesApplications);
                    toast.success("Application retrieved successfully");
                } else {
                    throw new Error("An unknown error occurred!");
                }
            } catch (error) {
                toast.error("Something went wrong with fetching applications!");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchAttributes = async (applicationId: string) => {
            try {
                setIsLoading(true);
                const response = await getCyclesApplicationAttributes(applicationId);
                if (response.data) {
                    setAttributes(response.data.getApplicationsAttributes);
                } else {
                    throw new Error("An unknown error occurred!");
                }
            } catch (error) {
                toast.error("Something went wrong with fetching attributes!");
            } finally {
                setIsLoading(false);
            }
        };

        const fetchStages = async (trainee_id: string) => {
            try {
                setIsLoading(true);
                const response = await getCyclesStages(trainee_id);
                if (response.data) {
                    console.log("SS")
                    setStages(response.data.getApplicationStages);
                } else {
                    throw new Error("An unknown error occurred!");
                }
            } catch (error) {
                toast.error("Something went wrong with fetching stages!");
            } finally {
                setIsLoading(false);
            }
        };

        fetchApps().then(() => {
            if (application?._id) {
                fetchAttributes(application._id);
                fetchStages(application._id);
            }
        });
    }, [application?._id]);

    function formatDate(dateString: string) {
        try {
            const date = parseISO(dateString);
            if (isNaN(date.getTime())) return dateString;
            return `${getDayWithSuffix(date.getDate())} ${format(date, "MMM yyyy 'at' HH:mm")}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return dateString;
        }
    }

    function getDayWithSuffix(day: number) {
        if (day > 3 && day < 21) return day + "th";
        switch (day % 10) {
            case 1:
                return day + "st";
            case 2:
                return day + "nd";
            case 3:
                return day + "rd";
            default:
                return day + "th";
        }
    }

    return (
        <>
            <ToastContainer />
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
                                {application?.firstName && <li><strong>Firstname:</strong> {application?.firstName}</li>}
                                {application?.lastName && <li><strong>Lastname:</strong> {application?.lastName}</li>}
                                {application?.email && <li><strong>Email:</strong> {application?.email}</li>}
                                {application?.cycle_id && <li><strong>Application Cycle:</strong> {application?.cycle_id?.name}</li>}
                                {application?.cycle_id?.createdAt && (
                                    <li><strong>Published date:</strong> {formatDate(application.cycle_id.createdAt)}</li>
                                )}
                                {application?.createdAt && (
                                    <li><strong>Application date:</strong> {formatDate(application.createdAt)}</li>
                                )}
                            </ul>
                        </div>
                        <div className="sm:w-1/2 pl-4">
                            <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-[#56C870]">
                                Address
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                                {attributes?.province && <li><strong>Province:</strong> {attributes?.province}</li>}
                                {attributes?.district && <li><strong>District:</strong> {attributes?.district}</li>}
                                {attributes?.sector && <li><strong>Sector:</strong> {attributes?.sector}</li>}
                                {attributes?.Address && <li><strong>Address:</strong> {attributes?.Address}</li>}
                            </ul>
                        </div>
                    </div>

                    <section>
                        <h3 className="text-2xl font-bold text-primary dark:text-[#56C870] mb-4">Application Stages</h3>
                        <p className="mb-3">
                            <strong>Current Stage:</strong>
                            {application?.applicationPhase && application?.applicationPhase === "Dismissed" ? (
                                <span className="text-red-500"> Dismissed</span>
                            ) : (
                                <span className="text-green-500"> {application?.applicationPhase}</span>
                            )}
                        </p>

                        {stages && Object.values(stages).length > 0 && (
                            <div className="bg-gray-100 dark:bg-[#262E3D] p-4 rounded-lg mt-4 shadow">
                                <h4 className="text-xl font-semibold mb-3">Stages History</h4>
                                <ul className="space-y-6 list-disc list-inside marker:text-[#56C870] dark:marker:text-green-400">
                                    {["technical", "interview", "admitted", "shortlist"].map((stageKey) =>
                                        stages[stageKey]?.map((stage: any, index: number) => (
                                            <li key={`${stageKey}-${index}`}>
                                                <strong>{stageKey.charAt(0).toUpperCase() + stageKey.slice(1)}</strong>
                                                <p><b>Status:</b> {stage.status}</p>
                                                <p><b>Score:</b> {stage.interviewScore || stage.score}</p>
                                                <p><b>Comments:</b> {stage.comments}</p>
                                                <p><b>Created At:</b> {formatDate(stage.createdAt)}</p>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>
                        )}

                    </section>
                </div>
            </div>
        </>
    );
};