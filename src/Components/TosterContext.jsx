import React, { createContext, useState, useContext, useEffect } from 'react';
const ToastContext = createContext();
export const UseToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ show: false, message: "", color:"" });

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  return (
    <ToastContext.Provider value={{ toast, setToast }}>
      {children}
      {toast.show && (
<div className={`fixed top-5 right-5  ${toast.color} text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in max-w-xs text-center text-sm font-medium transform transition-transform duration-300 ease-out ${toast.show ? 'translate-x-0' : 'translate-x-full'}`}>
  {toast.message}
</div>
      )}
    </ToastContext.Provider>
  );
};