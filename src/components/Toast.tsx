import { memo, useEffect } from "react";
import { createPortal } from "react-dom";

import "../scss/toast.scss";

const Toast = ({
  message,
  onClose,
  duration = 3000,
}: {
  message: string;
  duration?: number;
  onClose: (...args: any[]) => any;
}) => {
  useEffect(() => {
    setTimeout(() => {
      onClose();
    }, duration);
  }, [duration, onClose]);

  return createPortal(
    <div className="toast">
      <div className="toast-message">{message}</div>
    </div>,
    document.getElementById("toastContainer")!
  );
};

export default memo(Toast);
