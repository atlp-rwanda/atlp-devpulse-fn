import React from 'react';
import Modal from 'react-modal';

const defaultStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '500px',
  },
};

function CustomModal({
  isOpen,
  onRequestClose,
  contentLabel,
  children,
  customStyles = {},
  className = '',
}) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{ ...defaultStyles, ...customStyles }}
      contentLabel={contentLabel}
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      className="fixed inset-0 z-50 flex items-center justify-center "
    >
      <div className={` ${className}`}>
        {children}
      </div>
    </Modal>
  );
}

export default CustomModal;
