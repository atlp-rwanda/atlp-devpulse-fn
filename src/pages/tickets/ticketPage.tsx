import React, { useEffect, useState } from "react";
import { useTheme } from "../../hooks/darkmode";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createTicket } from "../../redux/actions/ticketActions";

const TicketPage = () => {
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme();
  const [ticket, setTicket] = useState({
    title: "",
    body: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticket.title.trim() || !ticket.body.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      setIsSubmitting(true);
      await dispatch(createTicket(ticket.title, ticket.body));
      toast.success("Ticket submitted successfully");
      setTicket({
        title: "",
        body: "",
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.errors?.[0]?.message ||
        error.message ||
        "Failed to submit ticket";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (theme) {
      document.body.classList.add("light-mode");
    } else {
      document.body.classList.remove("light-mode");
    }
  }, [theme]);

  return (
    <>
      <div className="min-h-screen p-6 py-10 bg-light-bg dark:bg-dark-frame-bg w-[100%] ">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Submit A Ticket
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={ticket.title}
                  onChange={(e) =>
                    setTicket((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Enter the subject of your ticket"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={ticket.body}
                  onChange={(e) =>
                    setTicket((prev) => ({
                      ...prev,
                      body: e.target.value,
                    }))
                  }
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-white dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[200px] resize-none"
                  placeholder="Please provide a detailed description of your issue"
                  required
                />
              </div>

              <div className="flex space-x-4">
                <button
                  className="flex bg-primary dark:bg-[#56C870] rounded-md py-2 px-4 text-white font-medium cursor-pointer"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setTicket({ title: "", body: "" })}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default TicketPage;
