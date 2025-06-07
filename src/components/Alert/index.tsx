import './alert.css';
import { useEffect } from 'react';

interface ToastAlertProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Alert: React.FC<ToastAlertProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-alert">
      <span className="toast-message">{message}</span>
      <button onClick={onClose} className="toast-close">×</button>
    </div>
  );
};

export default Alert;