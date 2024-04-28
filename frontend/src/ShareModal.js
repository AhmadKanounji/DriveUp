// ShareModal.js
import React, { useState } from 'react';
import './shareModal.css'; 

const ShareModal = ({ file, onClose, onShare }) => {
  const [email, setEmail] = useState('');

  const handleShare = () => {
    if (email) {
      onShare(file._id, email);
      onClose(); // Close the modal after sharing
    } else {
      alert('Please enter an email address.');
    }
  };

  return (
    <div className="share-modal-backdrop">
      <div className="share-modal-content">
        <div className="share-modal-header">
          <h3 className="share-modal-title">Share "{file.name}"</h3>
          <button onClick={onClose} className="share-modal-close">
            &times;
          </button>
        </div>
        <input
          type="email"
          className="share-modal-input"
          placeholder="Add people, groups, and calendar events"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {/* Additional fields for 'People with access' can be added here */}
        <div className="share-modal-buttons">
          <button onClick={handleShare} className="share-modal-button share-modal-button-primary">Share</button>
          <button onClick={onClose} className="share-modal-button share-modal-button-secondary">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
