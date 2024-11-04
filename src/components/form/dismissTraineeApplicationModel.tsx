import React,{ useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { AdvanceToNextStage } from "../../redux/actions/applicationStage";

type props ={
  applicantId: string;
  applicantName: string;
  stage: string;
  status?: string;
  onClose: () => void;
}
const DismissTraineeApplicant: React.FC<props> = ({applicantId,applicantName,stage, status, onClose}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState("");
  const dispatch = useAppDispatch();
  const { data, success, loading, message,error } = useAppSelector(
    (state) => state.nextStage
  );
  const handleDismiss = async () => {
    await dispatch(AdvanceToNextStage(applicantId, "Dismissed", comments));
    setIsOpen(false);
  };

  useEffect(()=>{
    if(success && data?.success){
      setIsOpen(false);
      onClose();
    }
  }, [success, data]);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        disabled = {stage === "Dismissed" || stage === "Admitted" ? true : status === "Moved" || status === "Dismissed" ? true : false}
        className={`px-4 py-2 text-sm font-medium text-white ${stage === "Dismissed" || stage === "Admitted" ? "bg-gray-400 cursor-not-allowed" : status === "Moved" || status === "Dismissed" ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 cursor-pointer"} w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
      >
        Dismiss
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-center mb-6 dark:text-white">
              Confirm Dismissal
            </h2>

            <div className="space-y-4 ">
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Are you sure you want to dismiss <span className="text-red-600 italic">{applicantName}</span> from the
                  program? This action is irreversible.
                </label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none bg-white dark:bg-[#374151] dark:text-white dark:border-gray-600"
                  placeholder="Reasons"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => {setIsOpen(false); onClose()}}
                className="px-4 py-2 border border-cg rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={ handleDismiss}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DismissTraineeApplicant;
