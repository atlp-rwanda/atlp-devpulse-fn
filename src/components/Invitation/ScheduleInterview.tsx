import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sendInterviewInvitations } from "../../redux/actions/applicationStage";
import { getAllCoordinators } from "../../redux/actions/users";
import { updateInterviewStatuses } from "../../redux/actions/applicationStage";
import toast from "react-hot-toast";

interface Props {
  applicantId: string;
  stage: string;
  status?: string;
  onClose: () => void;
  availableStatuses?: string[];
  technicalInterviews?: any[]; // Added to handle existing interviews
}

const ScheduleInterview: React.FC<Props> = ({
  applicantId,
  stage,
  status,
  onClose,
  technicalInterviews = [],
  availableStatuses = ["Scheduled", "Completed", "No show", "cancelled"],
}) => {
  const dispatch = useAppDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"invite" | "update-status">(
    "invite"
  );

  // Invite Form States
  const [meetingLink, setMeetingLink] = useState("");
  const [scheduledDateTime, setScheduledDateTime] = useState("");
  const [coordinatorId, setCoordinatorId] = useState("");
  const [platForm, setPlatForm] = useState("");
  const [coordinators, setCoordinators] = useState([]);

  // Update Status States
  const [newStatus, setNewStatus] = useState("");
  const [selectedInterviewId, setSelectedInterviewId] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCoordinators = async () => {
      try {
        const fetchedCoordinators = await dispatch(getAllCoordinators());
        setCoordinators(fetchedCoordinators);
      } catch (err) {
        console.error("Failed to fetch coordinators:", err);
      }
    };

    fetchCoordinators();
  }, [dispatch]);

  useEffect(() => {
    // Ensure technicalInterviews is an array and has length
    if (Array.isArray(technicalInterviews) && technicalInterviews.length > 0) {
      // Set the ID of the first interview in the array
      setSelectedInterviewId(technicalInterviews[0]._id);
    } else {
      // Ensure we have a fallback
      setSelectedInterviewId("");
    }
  }, [technicalInterviews]);

  const handleOpenModel = () => {
    setIsModelOpen(true);
    setActiveTab("invite");
  };

  const handleCloseModel = () => {
    setIsModelOpen(false);
    onClose();
  };

  const handleInviteSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!coordinatorId) {
      setError("Please select a coordinator");
      return;
    }

    if (!meetingLink.trim()) {
      setError("Link is required");
      return;
    }

    const validPlatforms = ["Zoom", "Teams"];
    const platform =
      platForm.charAt(0).toUpperCase() + platForm.slice(1).toLowerCase();

    if (!validPlatforms.includes(platform)) {
      setError(
        `Invalid meeting platform. Must be one of: ${validPlatforms.join(", ")}`
      );
      return;
    }

    const formattedDateTime = new Date(scheduledDateTime).toISOString();

    setIsLoading(true);
    await dispatch(
      sendInterviewInvitations(
        applicantId,
        coordinatorId,
        meetingLink,
        formattedDateTime,
        platform
      )
    ).then(() => {
      setError(null);
      onClose();
      setIsLoading(false);
    });
  };

  //   const handleStatusUpdate = async (event: React.FormEvent) => {
  //     event.preventDefault();

  //     console.log("Current technicalInterviews:", technicalInterviews);
  //     console.log("Current selectedInterviewId:", selectedInterviewId);

  //     if (!newStatus) {
  //       setError("Please select a status");
  //       return;
  //     }

  //     // If no interview exists, prevent status update
  //     if (!selectedInterviewId) {
  //       setError("No interview found. Please schedule an interview first.");
  //       return;
  //     }

  //     try {
  //       setIsLoading(true);
  //       await dispatch(updateInterviewStatuses(selectedInterviewId, newStatus));
  //       onClose();
  //       setIsLoading(false);
  //     } catch (err) {
  //       console.error("Error updating interview status:", err);
  //       setError("Failed to update status");
  //       setIsLoading(false);
  //     }
  //   };

  const handleStatusUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!newStatus) {
      setError("Please select a status");
      return;
    }

    // If no interview exists, prevent status update
    if (!selectedInterviewId) {
      setError("No interview found. Please schedule an interview first.");
      return;
    }

    // Get the current interview's status
    const currentInterview = technicalInterviews.find(
      (interview) => interview._id === selectedInterviewId
    );

    // Define valid status transitions
    const validStatusTransitions = {
      Scheduled: ["Completed", "No show", "Cancelled"],
      Completed: [], // No further transitions from Completed
      Cancelled: [], // No further transitions from Cancelled
      "No show": ["Scheduled"], // Can reschedule after a no-show
    };

    // Check if the status transition is valid
    if (currentInterview) {
      const currentStatus = currentInterview.status;
      const allowedNextStatuses = validStatusTransitions[currentStatus] || [];

      if (!allowedNextStatuses.includes(newStatus)) {
        setError(
          `Invalid status transition from ${currentStatus} to ${newStatus}`
        );
        return;
      }
    }

    try {
      setIsLoading(true);
      await dispatch(updateInterviewStatuses(selectedInterviewId, newStatus));
      onClose();
      setIsLoading(false);
    } catch (err) {
      console.error("Error updating interview status:", err);
      setError("Failed to update status");
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleOpenModel}
        disabled={
          stage === "Rejected" ||
          stage === "Admitted" ||
          (technicalInterviews.length > 0 &&
            technicalInterviews[0].status === "Completed")
        }
        className={`px-4 py-2 w-full text-sm font-medium text-white ${
          technicalInterviews.length > 0 &&
          technicalInterviews[0].status === "Completed"
            ? "bg-gray-400 cursor-not-allowed"
            : " bg-[#0c6a0c] hover:bg-[#367a4e] dark:bg-[#1bf84b8d] dark:hover:bg-emerald-700 dark:hover:text-gray-100 cursor-pointer"
        }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      >
        {status === "Invited" ? "Resend" : "Invite"}
      </button>
      {isModelOpen && (
        <div className="fixed top-0 left-0 inset-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center blur-0 z-[1000]">
          <div className="relative flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full p-4">
            <div className="relative border border-gray-300 rounded-lg p-4 bg-white dark:bg-gray-800 flex flex-col w-96 md:w-96">
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full"
                onClick={handleCloseModel}
              >
                <IoCloseCircleOutline className="text-red-500" />
              </button>

              {/* Tab Navigation */}
              <div className="flex mb-4 mt-4">
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "invite"
                      ? "bg-green text-white rounded-lg font-medium"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                  onClick={() => setActiveTab("invite")}
                >
                  Invite
                </button>
                <button
                  className={`flex-1 py-2 ${
                    activeTab === "update-status"
                      ? "bg-green text-white rounded-lg font-medium"
                      : "text-gray-400 hover:text-gray-500"
                  }`}
                  onClick={() => setActiveTab("update-status")}
                >
                  Update Status
                </button>
              </div>

              {/* Invite Form */}
              {activeTab === "invite" && (
                <form onSubmit={handleInviteSubmit}>
                  <div className="mb-5">
                    <label
                      htmlFor="coordinator"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Coordinator
                    </label>
                    <select
                      id="coordinator"
                      value={coordinatorId}
                      onChange={(e) => setCoordinatorId(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="" disabled>
                        Select a coordinator
                      </option>
                      {coordinators.map((coordinator: any) => (
                        <option key={coordinator.id} value={coordinator.id}>
                          {coordinator.firstname} {coordinator.lastname} (
                          {coordinator.role.roleName})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-5">
                    <label
                      htmlFor="platform"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Platform
                    </label>
                    <input
                      type="text"
                      placeholder="Zoom"
                      id="platform"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={platForm}
                      onChange={(e) => setPlatForm(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="link"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Meeting link
                    </label>
                    <input
                      type="url"
                      placeholder="https://meet.google.com"
                      id="url"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                      required
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                    />
                  </div>
                  <div className="mb-5">
                    <label
                      htmlFor="scheduledDateTime"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Scheduled Date and Time
                    </label>
                    <input
                      type="datetime-local"
                      id="scheduledDateTime"
                      value={scheduledDateTime}
                      onChange={(e) => setScheduledDateTime(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-[#0c6a0c] dark:bg-[#56C870] hover:bg-[#4ab862] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                  >
                    {isLoading ? "Sending..." : "Send Invite"}
                  </button>
                </form>
              )}

              {/* Update Status Form */}
              {activeTab === "update-status" && (
                <form onSubmit={handleStatusUpdate}>
                  <div className="mb-5">
                    <label
                      htmlFor="status"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Select Status
                    </label>
                    <select
                      id="status"
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                      required
                    >
                      <option value="" disabled>
                        Select a status
                      </option>
                      {availableStatuses.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                          {statusOption}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-[#0c6a0c] dark:bg-[#56C870] hover:bg-[#4ab862] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center"
                  >
                    {isLoading ? "Updating..." : "Update"}
                  </button>
                </form>
              )}

              {/* Error Message */}
              {error && (
                <div className="mt-4 text-red-500 text-sm text-center">
                  {error}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleInterview;
