import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { GetTicket, resolveTicket } from "../../redux/actions/ticketActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

const ResolveTicketPage = (props: any) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [ticketId, setTicketId] = useState(params.id);
  const [adminReply, setAdminReply] = useState("");
  const ticketData = useSelector((state: any) => state.tickets?.currentTicket);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getAllReplies = () => {
    if (!ticketData) return [];
    
    const adminReplies = (ticketData.adminReplies || []).map((reply) => ({
      ...reply,
      type: "Admin",
      author: reply.repliedBy,
    }));

    const applicantReplies = (ticketData.applicantReplies || []).map((reply) => ({
      ...reply,
      type: "Applicant",
      author: reply.repliedBy,
    }));

    const allReplies = [...adminReplies, ...applicantReplies].sort((a, b) => 
      parseInt(a.createdAt) - parseInt(b.createdAt)
    );

    return allReplies;
  };

  useEffect(() => {
    if (ticketId) {
      dispatch(GetTicket(ticketId));
    }
  }, [ticketId, dispatch]);

  const handleSubmitReply = async (e) => {
    e.preventDefault();
    if (ticketId && adminReply.trim()) {
      try {
        await dispatch(resolveTicket(ticketId, adminReply));
        setAdminReply("");
        await dispatch(GetTicket(ticketId));
        toast.success("Ticket Resolved Successfully");
        setIsSubmitting(true);
      } catch (error) {
        toast.error("Failed to resolve ticket")
        console.error("Failed to resolve ticket:", error);
      } finally{
        setIsSubmitting(false);
      }
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg w-[50%]">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] bg-white dark:bg-dark-bg">
          <h2 className="dark:text-white text-black font-bold my-5 w-full overflow-y-auto">
            <BsFillPersonLinesFill className="float-left m-1" />
            Ticket information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8 w-full">
            {ticketData != null && (
              <>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">Ticket title</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {ticketData.title}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black">Ticket Body</h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400">
                    {ticketData.body}
                  </p>
                </div>

                <div className="flex flex-col">
                  <h3 className="dark:text-white text-black font-medium">
                    Status
                  </h3>
                  <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                    {ticketData.status}
                  </p>
                </div>

                {getAllReplies().length > 0 && (
                  <div className="flex flex-col w-full">
                    <h3 className="dark:text-white text-black font-medium">
                      Responses
                    </h3>
                    {getAllReplies().map((reply, index) => (
                      <div
                        key={reply.id}
                        className={`mt-2 p-3 rounded ${reply.type === "Admin" ? "bg-gray-100 dark:bg-gray-700" : "bg-blue-50 dark:bg-blue-900/20"}`}
                      >
                        <div className="flex flex-col">
                          <h4 className="font-bold text-sm text-gray-600 dark:text-gray-300">{reply.type === "Admin" ? "Admin Response" : "Applicant Response"}</h4>
                          <p className="text-gray-500 text-sm dark:text-gray-400">
                            {reply.body}
                          </p>
                          <div className="flex gap-2 mt-1 text-sm text-gray-400">
                            <span>
                              {reply.author.firstname} {reply.author.lastname}
                            </span>
                            <span>•</span>
                            <span>
                              {new Date(
                                parseInt(reply.createdAt)
                              ).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}


                  <form onSubmit={handleSubmitReply} className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium dark:text-white text-black">
                        Reply to Ticket
                      </h3>
                      <textarea
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        className="w-full min-h-[150px] p-3 border rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white resize-none"
                        placeholder="Enter your response..."
                      />
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-button-color dark:bg-green text-white rounded-lg "
                      >
                        {isSubmitting ? (
                        <ThreeDots height="20" width="30" color="#ffffff" />
                      ) : (
                        "Submit Response"
                      )}
                      </button>
                    </div>
                  </form>

                <ToastContainer />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResolveTicketPage;