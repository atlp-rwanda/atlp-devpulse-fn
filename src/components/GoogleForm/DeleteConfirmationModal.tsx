import React from 'react';
import { AiOutlineExclamation } from 'react-icons/ai'; // Ensure you have the correct import for icons

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onDelete,
}) => {
    if (!isOpen) return null; // Render nothing if modal is not open

    return (
        <div>
            <div className='fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75' />
            <div className='fixed inset-0 z-10 overflow-y-auto'>
                <div className='flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0'>
                    <div className='relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
                        <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
                            <div className='sm:flex sm:items-start'>
                                <div className='flex items-center justify-center flex-shrink-0 w-12 h-12 mx-auto bg-red-100 rounded-full sm:mx-0 sm:h-10 sm:w-10'>
                                    <AiOutlineExclamation className='w-6 h-6 text-red-600' />
                                </div>
                                <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                                    <div className='text-lg font-medium leading-6 text-gray-900'>
                                        Delete the Form
                                    </div>
                                    <div className='mt-2'>
                                        <p className='text-sm text-gray-500'>
                                            Are you sure you want to delete this item? All of the
                                            form data will be permanently removed. This action cannot be undone.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6'>
                            <button
                                type='button'
                                className='inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm'
                                onClick={onDelete}>
                                Delete
                            </button>
                            <button
                                type='button'
                                className='inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
                                onClick={onClose}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
