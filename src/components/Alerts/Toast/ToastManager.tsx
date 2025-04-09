import { useEffect, useState } from "react";
import ToastPortal from "./ToastPortal";

const ToastManager = () => {
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    (window as any).dispatchToast = (msg: string) => {
      setToasts((prev) => [...prev, msg]);
      setTimeout(() => {
        setToasts((prev) => prev.slice(1));
      }, 3000);
    };
  }, []);

  return (
    <ToastPortal>
      {toasts.map((msg, index) => (
        <div
          key={index}
          className="toast align-items-center text-bg-dark show mb-2"
          role="alert"
        >
          <div className="d-flex">
            <div className="toast-body">{msg}</div>
          </div>
        </div>
      ))}
    </ToastPortal>
  );
};

export default ToastManager;
