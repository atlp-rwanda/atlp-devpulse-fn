import React from 'react';
import CustomModal from './customModal';
import { Application } from './RecentForms';

interface ViewApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
    application: Application | null;
    jobPostTitle: string;
}

const ViewApplicationModal: React.FC<ViewApplicationModalProps> = ({
    isOpen,
    onClose,
    application,
    jobPostTitle,
}) => {
    if (!application) return null;

    return (
        <CustomModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Update Application Modal"
            className="fixed inset-0 z-50 flex items-center justify-center"
        >
            <div className='p-6 rounded-lg shadow-lg dark:bg-dark-tertiary w-[500px] text-gray-100 transition-transform transform'>
                <h2 className='pb-2 mb-4 text-xl font-semibold border-b border-gray-600'>Job Application Details</h2>
                <p className='mb-2'>
                    <strong className='text-lg'>Title: </strong> {application.title}
                </p>
                <p className='mb-4'>
                    <strong className='text-lg'>Description: </strong>{application.description}
                </p>
                <p className='mb-2'>
                    <strong className='text-lg'>Link:</strong>
                    <a
                        href={application.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-400 hover:underline'
                    >
                        {application.link}
                    </a>
                </p>
                <p>
                    <strong className='text-lg'>Job Post:</strong> {jobPostTitle}
                </p>
                <div className="flex justify-end">
                    <button
                        type='button'
                        onClick={onClose}
                        className='px-4 py-2 mr-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300'
                    >
                        Close
                    </button>
                </div>
            </div>
        </CustomModal>
    );
};

export default ViewApplicationModal;
