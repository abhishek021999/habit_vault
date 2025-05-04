import React from 'react';

const LoadingSpinner = ({ size = 'md', fullScreen = false }) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  const containerClass = fullScreen 
    ? 'd-flex justify-content-center align-items-center min-vh-100'
    : 'd-flex justify-content-center align-items-center';

  return (
    <div className={containerClass}>
      <div className={`spinner-border text-primary ${sizeClasses[size]}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner; 