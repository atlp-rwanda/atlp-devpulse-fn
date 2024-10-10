import React, { useState } from "react";

const RulesModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Button to open the modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-primary dark:bg-green-500 rounded-md py-2 px-4 text-white font-medium transition-opacity duration-200"
      >
        Google Form Rules
      </button>

      {/* Modal overlay and content */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center flex-col items-center z-50">
          <div className="bg-dark-frame-bg p-6 rounded-lg shadow-lg max-w-lg">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-600 hover:text-gray-800 float-right font-bold text-xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-[#165a62]">
              Google Form Creation Rules
            </h2>
            <div className="max-h-96 overflow-y-auto">
              <ol className="list-decimal list-inside space-y-2">
                <li>
                  <strong>Use the Correct Entry IDs for Dynamic Fields</strong>
                  <p>
                    Every form must contain a field for <strong>USERID</strong>{" "}
                    , <strong>USEREMAIL</strong> and <strong>JOBTITLE</strong> linked as query parameters in
                    the form URL.
                  </p>
                </li>
                <li>
                  <strong>Field Placement</strong>
                  <p>
                    Ensure that the fields for <strong>USERID</strong>,{" "}
                    <strong>USEREMAIL</strong> and <strong>JOBTITLE</strong> are correctly positioned.
                  </p>
                </li>
                <li>
                  <strong>Ensure All Required Fields Are Present</strong>
                  <p>
                    Include necessary fields and make the dynamic fields
                    required.
                  </p>
                </li>
                <li>
                  <strong>How to create pre-filled Google form link</strong>
                  <p>
                    <ol className="list-decimal list-inside space-y-2">
                      <li>
                        <strong>Select the desired fields</strong>
                        <p>
                          Select the fields you want to include in the
                          pre-filled link. Make sure to include the fields for{" "}
                          <strong>USERID</strong>
                          , <strong>USEREMAIL</strong> and <strong>JOBTITLE</strong>
                        </p>
                      </li>
                      <li>
                        <strong>Select the desired URL format</strong>
                        <p>
                          Go to the form editor. Click on the three dots in the
                          top-right and select “Get pre-filled link.”
                        </p>
                      </li>
                      <li>
                        <strong>
                          Select the field that will hold the user ID or email
                        </strong>
                        <p>
                          Example: <code>userID</code> with value of{" "}
                          <code>USERID</code> , <code>Email</code> with value
                          of <code>USEREMAIL</code> and <code>Job Title</code> with value of <code>JOBTITLE</code>
                        </p>
                      </li>
                      <li>
                        <strong>
                          Copy link & paste into{" "}
                          <code>Google form link field</code>
                        </strong>
                        <p>Click on “Get link” and copy the generated link.</p>
                      </li>
                    </ol>
                  </p>
                </li>
              </ol>
            </div>
            {/* Close modal button */}
            <button
              onClick={() => setIsOpen(false)}
              className="mt-6 w-full bg-primary dark:bg-[#56C870] text-white py-2 px-4 rounded-md hover:bg-primary transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesModal;
