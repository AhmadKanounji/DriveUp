import React from 'react';

const Popup = ({ userProfile,onClose }) => {
  return (
    <div className="popup-backdrop">
      <div className="popup-content">
        <button onClick={onClose}>Close</button>
        {/* Content of your popup: user details, manage account link, etc. */}
        <div className="user-details">
          <p>{userProfile.email}</p>
          <p>Hi, {userProfile.username}!</p>
        </div>
        <button>Manage your Account</button>
      </div>
    </div>
  );
};

export default Popup;
