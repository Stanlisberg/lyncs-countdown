import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showSuccessToast = (message: any) => {
  toast.success(message, {
    position: "bottom-left",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export const showErrorToast = (message: any) => {
  toast.error(message, {
    position: "bottom-left",
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

const ToastProvider = () => {
  return <ToastContainer />;
};

export default ToastProvider;
