import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { addMarks } from "../../redux/actions/applicationStage";
import toast from "react-hot-toast";
import Select from "react-select";
import {
  customTheme,
  darkTheme,
} from "../../pages/FilterTeainee/FilterTrainee";
import { useTheme } from "../../hooks/darkmode";
interface scoreProps {
  applicantId: string;
  stage: string;
  onClose: () => void;
}

const addApplicantScore: React.FC<scoreProps> = ({
  applicantId,
  stage,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { data, loading, success, error } = useAppSelector(
    (state) => state.AddedApplicantScore
  );
  const [score, setScore] = useState<number | null>(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [isValid, setIsValid] = useState<string>("")

  const handleOpen = () => {
    setIsModelOpen(true);
    setIsError(false);
    setErrorMsg(null);
  };

  // Close Modal and Clear State
  const handleClose = () => {
    setIsModelOpen(false);
    setScore(null);
    setIsError(false);
    setErrorMsg(null);
    onClose();
  };
  const handleAddMarks = async () => {
    if (!score) {
      setErrorMsg("Score is required");
      setIsError(true);
      return;
    }
    await dispatch(addMarks(applicantId, stage, score));
    if (success && data?.success) {
      toast.success(data?.message);
      handleClose();
    }
    if (!success && error === null) {
      setErrorMsg(error);
      setIsError(true);
    }
    setIsError(false);
  };

  useEffect(() => {
    if (success) {
      handleClose();
    }
  }, [success]);
  const handleScoreChange = (e) => {
    const input = e.target.value;

    if (e.target.value === '') {
      setScore(null);
      setIsValid("");
      return;
    }
    if (/^0\d/.test(input)) {
      setIsValid('Score cannot have leading zeros');
      return
    }
    const value = Number(input);

    if (value >= 1 && value <= 100) {
      setScore(value);
      setIsValid("");
    } else {
      setIsValid('Score must be between 1 and 100');
    }
  };
  return (
    <>
      <div>
        <button className="cursor-pointer" onClick={handleOpen}>
          Add score
        </button>
        {isModelOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center flex-col items-center z-50">
            <div className="bg-white dark:bg-[#1F2937] rounded-lg w-full max-w-md p-6">
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Add score
                </label>
                {stage === "Technical Assessment" ? (
                  <div>
                    <input
                      className="w-full p-2 border rounded-md  dark:bg-[#374151] dark:text-white dark:border-gray-600"
                      type="text"
                      placeholder="Score for the current stage"
                      value={score || ""}
                      onChange={handleScoreChange}
                    />
                    {isValid && <p className="text-red-500 mt-2">{isValid}</p>}
                  </div>
                ) : stage === "Interview Assessment" ? (
                  <Select
                    menuPlacement="auto"
                    className="w-full p-2 rounded-md  dark:text-ltb"
                    options={[
                      { value: "0", label: "0" },
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                    ]}
                    placeholder="Select score"
                    value={
                      score !== null
                        ? { value: score?.toString(), label: score?.toString() }
                        : null
                    }
                    onChange={(e) => setScore(e ? Number(e.value) : null)}
                    theme={theme ? customTheme : darkTheme}
                  />
                ) : null}
                {isError && (
                  <div className="text-red-500 text-sm">{errorMsg}</div>
                )}
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
                  className="px-4 py-2 bg-[#0c6a0c] dark:bg-[#56C870] text-white rounded-md hover:bg-[#4ab862]"
                >
                  {loading ? "Saving..." : "Next"}
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
