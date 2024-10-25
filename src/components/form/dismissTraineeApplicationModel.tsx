import { useState } from "react";

const DismissTraineeApplicant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 cursor-pointer ml-2"
      >
        Dismiss
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1F2937] rounded-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold text-center mb-6 dark:text-white">
              Condirm Dismissal
            </h2>

            <div className="space-y-4 ">
              <div>
                <label className="block text-sm mb-2 dark:text-white">
                  Are you sure you want to dismiss [Applicant's Name] from the
                  [Program Name]? This action is irreversible.
                </label>
                <textarea
                  className="w-full p-2 border rounded-md resize-none bg-white dark:bg-[#374151] dark:text-white dark:border-gray-600"
                  placeholder="Reasons"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-center space-x-3">
              <button
                onClick={() => setIsOpen(false)}
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
