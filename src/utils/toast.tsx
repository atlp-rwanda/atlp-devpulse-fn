import { toast, ToastOptions } from 'react-toastify';

export const showSuccessToast = (message: string) => {
  toast.success(message);
};

export const showErrorToast = (message: string) => {
  toast.error(message);
};

export const toastOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  className: "small-toast",
  bodyClassName: "small-toast-body",
  style: {
    background: "#01acf0",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "10px",
    fontSize: "0.875rem",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
  },
};
