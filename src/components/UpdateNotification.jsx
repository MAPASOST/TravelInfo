import React from 'react';
import './UpdateNotification.css';

const UpdateNotification = ({ message, action, actionLabel }) => {
  return (
    <div className="update-notification">
      <span className="update-icon">🔄</span>
      <span className="update-message">{message}</span>
      {action && (
        <button className="update-action" onClick={action}>
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default UpdateNotification;
