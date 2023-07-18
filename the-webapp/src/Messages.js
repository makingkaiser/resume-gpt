import React from 'react';
import './Messages.css';

export const Error = ({ message }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
    </div>
  );
};

export const Success = ({ message }) => {
  return (
    <div className="success-message">
      <p>{message}</p>
    </div>
  );
};
