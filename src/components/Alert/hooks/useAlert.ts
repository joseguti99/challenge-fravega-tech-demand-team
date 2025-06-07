import { useState } from "react";

interface ToastState {
  isVisible: boolean;
  message: string;
}

interface UseToastReturn {
  isVisible: boolean;
  message: string;
  showToast: (msg: string) => void;
  hideToast: () => void;
}

const useAlert = (): UseToastReturn => {
  const [toastState, setToastState] = useState<ToastState>({
    isVisible: false,
    message: ''
  });

  const showToast = (msg: string): void => {
    setToastState({
      message: msg,
      isVisible: true
    });
  };

  const hideToast = (): void => {
    setToastState(prev => ({
      ...prev,
      isVisible: false
    }));
  };

  return {
    isVisible: toastState.isVisible,
    message: toastState.message,
    showToast,
    hideToast
  };
};

export default useAlert;