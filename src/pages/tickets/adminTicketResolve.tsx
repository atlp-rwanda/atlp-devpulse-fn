import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { GetTicket, resolveTicket } from "../../redux/actions/ticketActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const ResolveTicketPage = (props: any) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [ticketId, setTicketId] = useState(params.id);
  const [adminReply, setAdminReply] = useState("");
  const ticketData = useSelector((state: any) => state.tickets?.currentTicket);

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
      } catch (error) {
        toast.error("Failed to resolve ticket")
        console.error("Failed to resolve ticket:", error);
      }
    }
  };
  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg w-[50%]">
        <div className="flex flex-col justify-start mt-24 items-start p-5 w-[95%] overflow-hidden bg-white dark:bg-dark-bg">
          <h2 className="dark:text-white text-black font-bold my-5">
            <BsFillPersonLinesFill className="float-left m-1" />
            Ticket information
          </h2>
          <div className="flex flex-col justify-center gap-3 mb-8">
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

                {ticketData.adminResponse && (
                  <div className="flex flex-col">
                    <h3 className="dark:text-white text-black font-medium">
                      Admin Response
                    </h3>
                    <p className="text-gray-500 text-sm dark:text-gray-400 mt-1">
                      {ticketData.adminResponse.body}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Responded at:{" "}
                      {new Date(
                        parseInt(ticketData.adminResponse.respondedAt)
                      ).toLocaleString()}
                    </p>
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
                        disabled={!adminReply.trim()}
                        className="px-4 py-2 bg-button-color dark:bg-green text-white rounded-lg "
                      >
                        Submit Response
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