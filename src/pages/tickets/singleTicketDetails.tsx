import { useParams } from "react-router";
import NavBar from "../../components/sidebar/navHeader";
import { BsFillPersonLinesFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import { GetTicket } from "../../redux/actions/ticketActions";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux";

const SingleTicketDetails = (props: any) => {
  const dispatch = useDispatch();
  const params = useParams();
  const [ticketId, setTicketId] = useState(params.id);
  console.log(ticketId);
  const ticketData = useSelector((state: any) => state.tickets?.currentTicket);
  console.log("ticket data: ", ticketData);

  useEffect(() => {
    if (ticketId) {
      dispatch(GetTicket(ticketId));
    }
  }, [ticketId, dispatch]);
  return (
    <>
      <div className="h-screen flex flex-col items-center dark:bg-dark-frame-bg">
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleTicketDetails;
