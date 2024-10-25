import React, { useState } from "react";
import { useAppDispatch,useAppSelector } from "../../hooks/hooks";
import { addMarks } from "../../redux/actions/applicationStage";
import toast from "react-hot-toast";
interface scoreProps {
  applicantId: string;
  stage: string;
  onClose: () => void;
}

const addApplicantScore: React.FC<scoreProps> = ({ applicantId, stage, onClose }) => {
  const dispatch = useAppDispatch();
  const {data, loading,success, error} = useAppSelector((state)=> state.AddedApplicantScore)
  const [score, setScore] = useState<number>();
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [Error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setIsModelOpen(false);
    onClose();
  }
  const handleAddMarks = async() =>{
    if (!score) {
      setError("Score is required");
      setIsError(true);
      return;
    }
    await dispatch(addMarks(applicantId,stage,score))
    if(success && data?.success){
      toast.success(data?.message);
      setIsModelOpen(false);
      onClose();
    }
    if(!success && error === null){
      setError(error);
      setIsError(true)
    }
    setIsError(false);
  }
  return (
    <>
      <div>
        <button className="cursor-pointer" onClick={() => setIsModelOpen(true)}>
          Add score
        </button>
        {isModelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center flex-col items-center z-50">
            <div className="bg-white dark:bg-[#1F2937] rounded-lg w-full max-w-md p-6">
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Score
                </label>
                <input
                  className="w-full p-2 border rounded-md bg-white dark:bg-[#374151] dark:text-white dark:border-gray-600"
                  type="text"
                  placeholder="Score for the current stage"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                />
                {
                  isError && (
                    <div className="text-red-500 text-sm">{Error}</div>
                  )
                }
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleAddMarks()}
                  className="px-4 py-2 bg-[#56C870] text-white rounded-md hover:bg-[#4ab862]"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default addApplicantScore;
