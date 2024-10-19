/* eslint-disable */
import React from 'react';

interface WarningModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const WarningModal: React.FC<WarningModalProps> = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0  flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white border dark:border-gray-500 dark:bg-dark-bg rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-600">Warning: Irreversible Action</h3>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          {message}
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-md"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-md"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default WarningModal;
