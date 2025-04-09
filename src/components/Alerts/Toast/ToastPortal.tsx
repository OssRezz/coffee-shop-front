import { createPortal } from "react-dom";
import { useEffect, useState } from "react";

const ToastPortal = ({ children }: { children: React.ReactNode }) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const toastRoot = document.createElement("div");
    toastRoot.className = "toast-container";
    document.body.appendChild(toastRoot);

    setContainer(toastRoot);
    return () => {
      document.body.removeChild(toastRoot);
    };
  }, []);

  if (!container) return null;
  return createPortal(children, container);
};

export default ToastPortal;
