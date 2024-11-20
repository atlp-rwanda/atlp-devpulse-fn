import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { toast, ToastContainer } from "react-toastify";
import { AiFillFilePdf } from "react-icons/ai"

import {
    getApplicantCyclesApplications,
    getCyclesApplicationAttributes,
    getCyclesStages
} from "../../redux/actions/applications";
import { Link } from "react-router-dom";

export const MyApplication = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [application, setApplication] = useState<any>(null);
    const [attributes, setAttributes] = useState<any>(null);
    const [stages, setStages] = useState<any>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await getApplicantCyclesApplications();
                if (response?.data?.getTraineeCyclesApplications) {
                    setApplication(response.data.getTraineeCyclesApplications);
                    console.log("Appl", response.data.getTraineeCyclesApplications)
                } else {
                    throw new Error("No applications found");
                }
            } catch (error) {
                toast.error("No applications found!");
            } finally {
                setIsLoading(false);
            }
        };

        if (!application) {
            fetchApplications();
        } else {
            const fetchAttributesAndStages = async () => {
                try {
                    setIsLoading(true);
                    if (application?._id) {
                        const attributesResponse = await getCyclesApplicationAttributes(application._id);
                        if (attributesResponse?.data?.getApplicationsAttributes) {
                            setAttributes(attributesResponse.data.getApplicationsAttributes);
                        }
                        const stagesResponse = await getCyclesStages(application._id);
                        if (stagesResponse?.data?.getApplicationStages) {
                            console.log(stagesResponse.data.getApplicationStages);
                            setStages(stagesResponse.data.getApplicationStages);
                        }
                    }
                } catch (error) {
                    toast.error("Something went wrong while fetching details!");
                } finally {
                    setIsLoading(false);
                }
            };

            fetchAttributesAndStages();
        }
    }, [application]);

    const formatDate = (timestamp) => {
        const date = new Date(Number(timestamp));
        console.log("DDD", date)
        if (isNaN(date.getTime())) return '';

        return new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }).format(date);
    };

    if (isLoading) {
        return (
            <>
                <div className="animate-pulse space-y-4 p-6 bg-gray-100 dark:bg-[#1E293B] min-h-screen min-w-screen"
                    style={{ width: "70%" }}>
                    <div className="h-10 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
                <div className="animate-pulse space-y-4 p-6 bg-gray-100 dark:bg-[#1E293B] min-h-screen min-w-screen"
                    style={{ width: "70%" }}>
                    <div className="h-10 w-2/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-6 w-1/2 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-1/3 bg-gray-300 dark:bg-gray-700 rounded"></div>
                        <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-700 rounded"></div>
                    </div>
                </div>
            </>
        );
    }

    if (!application) {
        return (
            <div className="flex items-center justify-center min-h-screen w-full bg-gray-100 dark:bg-[#1E293B]">
                <div className="space-y-4 p-6 bg-gray-200 dark:bg-gray-800 rounded-md shadow-lg">
                    <div className="h-10 w-full flex items-center justify-center rounded-md">
                        <p className="text-red-500 dark:text-red-400 text-lg font-semibold">
                            No applications found
                        </p>
                    </div>
                </div>
            </div>
        );
    }
    console.log("APPJJA", application)

    return (
        <>
            <ToastContainer />
            <div className="py-8 px-6 min-h-screen min-w-screen bg-gray-100 dark:bg-[#1E293B] text-gray-900 dark:text-white" style={{ width: "70%" }}>
                <h2 className="pl-5 text-3xl font-extrabold text-primary dark:text-[#56C870] sm:text-4xl mb-6">
                    My Application
                </h2>
                <div className="dark:bg-[#1F2A37] p-6 mt-5 rounded-lg shadow-lg">
                    <div className="flex flex-col sm:flex-row border-b border-gray-300 dark:border-gray-600 pb-4">
                        <div className="flex-1 pr-4 mb-4 sm:mb-0">
                            <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-[#56C870]">
                                Personal Information
                            </h3>
                            <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                                {application?.firstName && <li><strong>Firstname:</strong> {application.firstName}</li>}
                                {application?.lastName && <li><strong>Lastname:</strong> {application.lastName}</li>}
                                {application?.email && <li><strong>Email:</strong> {application.email}</li>}
                                {application?.cycle_id?.name && <li><strong>Application Cycle:</strong> {application.cycle_id.name}</li>}
                                {application?.cycle_id?.createdAt && (
                                    <li><strong>Published date:</strong> {formatDate(application.cycle_id.createdAt)}</li>
                                )}
                                {application?.createdAt && (
                                    <li><strong>Application date:</strong> {formatDate(application.createdAt)}</li>
                                )}
                            </ul>
                        </div>
                        <div className="flex-1 pl-4">
                            {attributes?.Address && (
                                <h3 className="text-lg font-semibold mb-2 text-green-700 dark:text-[#56C870]">
                                    Address
                                </h3>)}
                            <ul className="list-disc list-inside space-y-2 text-gray-800 dark:text-gray-300">
                                {attributes?.province && <li><strong>Province:</strong> {attributes.province}</li>}
                                {attributes?.district && <li><strong>District:</strong> {attributes.district}</li>}
                                {attributes?.sector && <li><strong>Sector:</strong> {attributes.sector}</li>}
                                {attributes?.Address && <li><strong>Address:</strong> {attributes.Address}</li>}
                            </ul>
                        </div>
                    </div>
                    {(application?.coverLetterUrl || application?.resumeUrl || application?.idDocumentUrl) && (
                        <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-gray-100 dark:bg-gray-800 dark:border-gray-700">
                            <h3 className="mb-4 text-lg font-semibold text-green-700 dark:text-[#56C870]">
                                Supporting Documents
                            </h3>
                            <ul className="flex flex-col gap-4">
                                {application?.idDocumentUrl && (
                                    <li className="flex flex-col">
                                        <strong className="text-gray-700 dark:text-gray-200">
                                            ID Card
                                        </strong>
                                        <Link
                                            to={`/view-external-document?fileUrl=${encodeURIComponent(application.idDocumentUrl)}&backUrl=${encodeURIComponent("/")}&title=${encodeURIComponent("ID Document")}`}
                                            target="_blank"
                                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-1"
                                        >
                                            <AiFillFilePdf size={20} className="text-red-600" />
                                            <span>View ID Card</span>
                                        </Link>
                                    </li>
                                )}
                                {application?.resumeUrl && (
                                    <li className="flex flex-col">
                                        <strong className="text-gray-700 dark:text-gray-200">
                                            Resume
                                        </strong>
                                        <Link
                                            to={`/view-external-document?fileUrl=${encodeURIComponent(application.resumeUrl)}&backUrl=${encodeURIComponent("/")}&title=${encodeURIComponent("Resume Document")}`}
                                            target="_blank"
                                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-1"
                                        >
                                            <AiFillFilePdf size={20} className="text-red-600" />
                                            <span>View Resume</span>
                                        </Link>
                                    </li>
                                )}
                                {application?.coverLetterUrl && (
                                    <li className="flex flex-col">
                                        <strong className="text-gray-700 dark:text-gray-200">
                                            Cover Letter
                                        </strong>
                                        <Link
                                            to={`/view-external-document?fileUrl=${encodeURIComponent(application.coverLetterUrl)}&backUrl=${encodeURIComponent("/")}&title=${encodeURIComponent("Cover letter Document")}`}
                                            target="_blank"
                                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline mt-1"
                                        >
                                            <AiFillFilePdf size={20} className="text-red-600" />
                                            <span>View Cover Letter</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                    <section>
                        <h3 className="text-2xl font-bold text-primary dark:text-[#56C870] mb-4">Application Stages</h3>
                        <p className="mb-3">
                            <strong>Current Stage:</strong>
                            {application?.applicationPhase === "Rejected" ? (
                                <span className="text-red-500"> Rejected</span>
                            ) : (
                                <span className="text-green-500"> {application?.applicationPhase}</span>
                            )}
                        </p>

                        <div className="bg-gray-100 dark:bg-[#262E3D] p-4 rounded-lg mt-4 shadow">
                            <h4 className="text-xl font-semibold mb-3">Stages History</h4>
                            {!stages?.dismissed && !stages?.interview && !stages?.shortlist && (
                                <p className="text-red-500">
                                    No stages history found
                                </p>
                            )}
                            <ul className="space-y-6 list-disc list-inside marker:text-[#56C870] dark:marker:text-green-400 bg-red">
                                {stages?.dismissed && (
                                    <li className="bg-red-500 text-white p-6 rounded-lg shadow-md">
                                        <strong className="font-semibold text-xl mb-3">Rejected</strong>

                                        {stages.dismissed?.status && (
                                            <p><strong>Status:</strong> {stages.dismissed.status}</p>
                                        )}

                                        {stages.dismissed?.stageDismissedFrom && (
                                            <p><strong>Stage dismissed from:</strong> {stages.dismissed.stageDismissedFrom}</p>
                                        )}

                                        {stages.dismissed?.comments && (
                                            <p><strong>Comments:</strong> {stages.dismissed.comments}</p>
                                        )}

                                        {stages.dismissed?.createdAt && (
                                            <p><strong>Date:</strong> {formatDate(stages.dismissed.createdAt)}</p>
                                        )}
                                    </li>
                                )}

                                {stages?.admitted && (
                                    <li className="">
                                        <strong>Admitted</strong>
                                        {stages?.allStages?.history
                                            .filter((history: any) => history.stage === "Admitted")
                                            .map((history: any, index: any) => (
                                                <strong key={index}>
                                                    &nbsp; ({formatDate(history.enteredAt)} - {formatDate(history.exitedAt)})
                                                </strong>
                                            ))}
                                        {stages.admitted?.status && <p><b>Status:</b> {stages.admitted.status}</p>}
                                        {stages.admitted?.stageDismissedFrom && <p><b>Score:</b> {stages.admitted.stageDismissedFrom}</p>}
                                        {stages.admitted?.comments && <p><b>Comments:</b> {stages.admitted.comments}</p>}
                                        {stages.admitted?.createdAt && <p><b>Date:</b> {formatDate(stages.admitted.createdAt)}</p>}
                                    </li>
                                )}
                                {stages?.interview && (
                                    <li>
                                        <strong>Interview Assessment</strong>
                                        {stages?.allStages?.history
                                            .filter((history: any) => history.stage === "Technical Assessment")
                                            .map((history: any, index: any) => (
                                                <strong key={index}>
                                                    &nbsp; ({formatDate(history.enteredAt)} - {formatDate(history.exitedAt)})
                                                </strong>
                                            ))}
                                        {stages.interview?.interviewScore && <p><b>Score:</b> {stages.interview.interviewScore}</p>}
                                        {stages.interview?.status && <p><b>Status:</b> {stages.interview.status}</p>}
                                        {stages.interview?.comments && <p><b>Comments:</b> {stages.interview.comments}</p>}
                                        {stages.interview?.createdAt && <p><b>Date:</b> {formatDate(stages.interview.createdAt)}</p>}
                                    </li>
                                )}
                                {stages?.technical && (
                                    <li>
                                        <strong>Technical Assessment</strong>
                                        {stages?.allStages?.history
                                            .filter((history: any) => history.stage === "Technical Assessment")
                                            .map((history: any, index: any) => (
                                                <strong key={index}>
                                                    &nbsp; ({formatDate(history.enteredAt)} - {formatDate(history.exitedAt)})
                                                </strong>
                                            ))}
                                        {stages.technical?.score && <p><b>Score:</b> {stages.technical.score}%</p>}
                                        {stages.technical?.status && <p><b>Status:</b> {stages.technical.status}</p>}
                                        {stages.technical?.comments && <p><b>Comments:</b> {stages.technical.comments}</p>}
                                        {stages.technical?.createdAt && <p><b>Date:</b> {formatDate(stages.technical.createdAt)}</p>}
                                    </li>
                                )}
                                {stages?.shortlist && (
                                    <li>
                                        <strong>Shortlist</strong>
                                        {stages?.allStages?.history
                                            .filter((history: any) => history.stage === "Shortlisted")
                                            .map((history: any, index: any) => (
                                                <strong key={index}>
                                                    &nbsp; ({formatDate(history.enteredAt)} - {formatDate(history.exitedAt)})
                                                </strong>
                                            ))}
                                        {stages.shortlist?.status && <p><b>Status:</b> {stages.shortlist.status}</p>}
                                        {stages.shortlist?.comments && <p><b>Comments:</b> {stages.shortlist.comments}</p>}
                                        {stages.shortlist?.createdAt && <p><b>Date:</b> {formatDate(stages.shortlist.createdAt)}</p>}
                                    </li>
                                )}

                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default MyApplication;