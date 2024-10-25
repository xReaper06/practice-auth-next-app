import React, { ReactNode, useEffect, useState } from 'react';

type FormAlertsTypes = {
  className: string;
  children: ReactNode;
};

const FormAlerts: React.FC<FormAlertsTypes> = ({ className, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false); // Hide the alert after 3 seconds
    }, 3000);
    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <div
      role="alert"
      className={`fixed top-0 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      } ${className}`}
      style={{
        zIndex: 1000,
        maxWidth: '90%', // Ensures responsiveness for smaller screens
        width: '400px', // Default width on larger screens
        margin: '10px',
        transition: 'opacity 0.5s, transform 0.5s',
      }}
    >
      <div className="text-white p-4 flex items-center justify-between">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-2">{children}</span>
      </div>
    </div>
  );
};

export default FormAlerts;
