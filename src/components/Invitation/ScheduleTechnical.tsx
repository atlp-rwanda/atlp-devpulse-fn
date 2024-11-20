import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { sendInvitations } from "../../redux/actions/applicationStage";
import toast from "react-hot-toast";
interface props {
  traineeEmail: string;
  applicantId: string;
  stage: string;
  status?: string;
  onClose: () => void;
}
const ScheduleTechnical: React.FC<props> = ({
  traineeEmail,
  applicantId,
  stage,
  status,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [email, setEmail] = useState(traineeEmail);
  const [invitationLink, setInvitationLink] = useState("");
  const [platForm, setPlatForm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const handleOpenModel = () => {
    setIsModelOpen(true);
  };
  const handleCloseModel = () => {
    setIsModelOpen(false);
    onClose();
  };
  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!invitationLink.trim()) {
      setError("Link is required");
      return;
    }
    setIsLoading(true);
    await dispatch(sendInvitations(applicantId, email, platForm, invitationLink)).then(
      () => {
        setError(null);
        onClose();
        setEmail("");
        setInvitationLink("");
        setIsLoading(false);
      }
    );
  };

  return (
    <div>
      <button
        onClick={handleOpenModel}
        disabled={
          stage === "Rejected" || stage === "Admitted"
            ? true
            : status === "Moved"
            ? true
            : false
        }
        className={`px-4 py-2 w-full text-sm font-medium text-white ${
           status === "Moved"
            ? "bg-gray-400 cursor-not-allowed"
            : " bg-[#0c6a0c] hover:bg-[#367a4e] dark:bg-[#1bf84b8d] dark:hover:bg-emerald-700 dark:hover:text-gray-800 cursor-pointer"
        }  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      >
        {status === "Invited" ? "Resend" : "Invite"}
      </button>
      {isModelOpen && (
        <div className="fixed top-0 left-0 inset-0 w-full h-screen bg-black bg-opacity-50 flex items-center justify-center blur-0 z-[1000]">
          <div className="relative flex items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full p-4 ">
            <form
              onSubmit={handleFormSubmit}
              className="relative border border-gray-300 rounded-lg p-4 bg-gray-500 dark:bg-gray-800 flex flex-col w-80 md:w-96"
            >
              <button
                className="absolute top-1 right-1 bg-white p-1 rounded-full"
                onClick={handleCloseModel}
              >
                <IoCloseCircleOutline className="text-red-500" />
              </button>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Trainee Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled
                  required
                />
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
                  placeholder="https://anyone.google.com"
                  id="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                  invitation link
                </label>
                <input
                  type="url"
                  placeholder="https://anyone.google.com"
                  id="url"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  value={invitationLink}
                  onChange={(e) => setInvitationLink(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="text-white bg-[#0c6a0c] dark:bg-[#56C870] hover:bg-[#4ab862] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                {isLoading ? (
                  <>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline w-4 h-4 me-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    sending...
                  </>
                ) : (
                  "send"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScheduleTechnical;
