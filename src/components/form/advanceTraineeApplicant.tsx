import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { AdvanceToNextStage } from "../../redux/actions/applicationStage";
import toast from "react-hot-toast";

interface props {
  applicantId: string;
  stage: string;
  status?: string;
  onClose: () => void;
}
const NextStageModal: React.FC<props> = ({ applicantId, stage,status, onClose }) => {
  const dispatch = useAppDispatch();
  const { data, success, loading, message,error } = useAppSelector(
    (state) => state.nextStage
  );
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState("");

  const handleAdvanceToNextStage = async (
    currentStage: string,
    comments: string
  ) => {
    const nextStage = handleNextStage(currentStage);
    await dispatch(AdvanceToNextStage(applicantId, nextStage, comments));
  };

  const stages = [
    "Shortlisted",
    "Technical Assessment",
    "Interview Assessment",
    "Admitted",
  ];

  const handleNextStage = (currentStage: string) => {
    // check the current stage of applicant and see if it is exist in the list then determine the next stage from the list
    const currentIndex = stages.indexOf(currentStage);
    const nextIndex = currentIndex + 1;
    const nextStage = stages[nextIndex];
    return nextStage;
  };
  useEffect(() => {
    if(success && !error){
      setIsOpen(false);
      onClose()
    }
  },[success,data]);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        disabled = {stage === "Rejected" || stage === "Admitted" ? true : status === "Moved" ? true : false}
        className={`px-4 py-2 text-sm font-medium text-white ${stage === "Rejected" || stage === "Admitted" ? "bg-gray-400 cursor-not-allowed" :  status === "Moved"? "bg-gray-400 cursor-not-allowed" : " bg-[#0c6a0c] hover:bg-[#367a4e] dark:bg-green dark:hover:bg-emerald-200 cursor-pointer"}  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
      >
        Advance
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center flex-col items-center z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-center mb-6 dark:text-white">
              Application Cycle Next Stage
            </h2>

            <div className="space-y-4">
              <div>
                <h1 className="dark:text-white text-lg">
                  The next stage is <span className="text-lg font-bold text-[#0c6a0c] dark:text-[#4ab862]">{handleNextStage(stage)}</span>
                </h1>
              </div>
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Please provide a comments
                </label>
                <textarea
                  className="w-full p-2 border rounded-md h-24 resize-none bg-white dark:bg-[#374151] dark:text-white dark:border-gray-600"
                  placeholder="Add any comments..."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => {setIsOpen(false); onClose()}}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAdvanceToNextStage(stage, comments)}
                className="px-4 py-2 bg-[#0c6a0c] dark:bg-[#56C870] text-white rounded-md hover:bg-[#4ab862]"
              >
                {loading ? "Saving...": "Next"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextStageModal;
