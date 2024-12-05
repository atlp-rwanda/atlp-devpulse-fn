import { MdClose, MdErrorOutline } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

const ViewExternalDocumentsModal = ({ show, onClose, fileUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const isImage = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'].some((ext) =>
    fileUrl?.endsWith(ext)
  );
  const isPdf = fileUrl?.endsWith('.pdf');

  useEffect(() => {
    if (fileUrl) {
      setIsLoading(true);
      setLoadError(false);

      if (isImage) {
        const img = new Image();
        img.onload = () => setIsLoading(false);
        img.onerror = () => {
          setIsLoading(false);
          setLoadError(true);
        };
        img.src = fileUrl;
      } else if (isPdf) {
        const xhr = new XMLHttpRequest();
        xhr.open('HEAD', fileUrl, true);
        xhr.onload = () => {
          if (xhr.status === 200) {
            setIsLoading(false);
          } else {
            setIsLoading(false);
            setLoadError(true);
          }
        };
        xhr.onerror = () => {
          setIsLoading(false);
          setLoadError(true);
        };
        xhr.send();
      } else {
        setIsLoading(false);
        setLoadError(true);
      }
    }
  }, [fileUrl, isImage, isPdf]);

  if (!show) return null;

  const hasMissingParams = !fileUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-red-500 hover:text-red-400"
        >
          <MdClose size={24} />
        </button>

        {hasMissingParams ? (
          <div className="text-center">
            <MdErrorOutline size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-red-500 mb-2">
              Missing Information
            </h2>
            <p className="text-gray-300">
              It seems some required details are missing. Please ensure you have
              provided a file URL.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex justify-center items-center h-[500px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-[#56C870]"></div>
          </div>
        ) : loadError ? (
          <div className="text-center">
            <MdErrorOutline size={48} className="text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-red-500 mb-2">
              File Loading Error
            </h2>
            <p className="text-gray-300">
              Unable to load the file. Please check the URL and try again.
            </p>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-semibold text-[#56C870] mb-4">
              Document Preview
            </h2>
            {isPdf ? (
              <embed
                src={fileUrl}
                type="application/pdf"
                width="100%"
                height="500px"
                className="rounded-lg shadow-lg"
              />
            ) : isImage ? (
              <img
                src={fileUrl}
                alt="Image Preview"
                className="w-full max-h-[500px] object-contain rounded-lg shadow-lg"
              />
            ) : (
              <div className="text-center text-red-500">
                Unsupported file type
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

ViewExternalDocumentsModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  fileUrl: PropTypes.string,
};

export default ViewExternalDocumentsModal;
