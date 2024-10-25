import React, { useEffect, useState } from "react";
import { useAppDispatch,useAppSelector } from "../../hooks/hooks";
import { AdvanceToNextStage } from "../../redux/actions/applicationStage";
import toast from "react-hot-toast";

interface props {
  applicantId: string;
}
const NextStageModal:React.FC<props> = ({applicantId}) => {
  const dispatch = useAppDispatch();
  const {data,success,loading,message} = useAppSelector((state)=> state.nextStage)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStage, setSelectStage] = useState("");
  const [comments,setComments] = useState("");

  const handleAdvanceToNextStage = async(nextStage:string,comments:string) =>{
    await dispatch(AdvanceToNextStage(applicantId,nextStage,comments));
  }

  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-green rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer mr-2"
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
                <label className="block text-sm mb-2 dark:text-white">
                  Next Stage
                </label>
                <select
                  className="w-full p-2 border rounded-md bg-white dark:bg-[#374151] dark:text-white dark:border-gray-600"
                  defaultValue=""
                  value={selectedStage}
                  onChange={(e) => setSelectStage(e.target.value)}
                >
                  <option value="" disabled>
                    Select next stage
                  </option>
                  <option value="Shortlisted">Shortlisted</option>
                  <option value="Technical Assessment">Technical Assessment</option>
                  <option value="Interview Assessment">Interview Assessment</option>
                  <option value="Admitted">Admitted</option>
                </select>
              </div>
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Comments
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
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAdvanceToNextStage(selectedStage,comments)}
                className="px-4 py-2 bg-[#56C870] text-white rounded-md hover:bg-[#4ab862]"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NextStageModal;
