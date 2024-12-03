import React, { useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import * as icons from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const CreateTicketModal = ({ isOpen, onClose, onSubmit }) => {
    const [ticket, setTicket] = useState({
      title: "",
      body: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!ticket.title.trim() || !ticket.body.trim()) {
        toast.error("Please fill in all required fields");
        return;
      }
  
      try {
        setIsSubmitting(true);
        await onSubmit(ticket);
        toast.success("Ticket submitted successfully");
        handleClose();
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
  
    const handleClose = () => {
      setTicket({
        title: "",
        body: "",
      });
      onClose();
    };
  
    if (!isOpen) return null;
    return (
      <>
        <div className="h-[80vh] w-[50%] z-20 mt-16 bg-opacity-30 backdrop-blur-sm absolute flex justify-center">
          <div className="bg-white dark:bg-dark-bg w-full max-h-[500px] overflow-auto md_:w-[65%] md-sm:w-[95%] rounded-lg p-4 pb-8">
            <div className="card-title w-full flex flex-wrap justify-center items-center">
              <h3 className="font-bold text-sm dark:text-white text-center w-11/12">
                <icons.AiOutlineClose
                  className="float-right text-3xl cursor-pointer"
                  onClick={handleClose}
                />
                CREATE TICKET
              </h3>
              <div className="flex flex-col w-full mt-14 md_:mt-5">
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
                      {isSubmitting ? (
                        <AiOutlineLoading3Quarters className="animate-spin text-xl" />
                      ) : (
                        "Submit"
                      )}
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
          </div>
        </div>
      </>
    );
  };

  export default CreateTicketModal;
