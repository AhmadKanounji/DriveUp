import React , { useState } from 'react';
import '../PopupStyles.css';

const Popup = ({ userProfile,onClose }) => {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const token = sessionStorage.getItem('token') || localStorage.getItem('token');

  const handleFileUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('profileImage', selectedFile);

      fetch('/auth/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` 
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        onClose(); 
        
      })
      .catch(error => {
        console.error('Error uploading new profile picture:', error);
      });
    }
  };
  return (
    <div className="popup-backdrop">
      <div className="popup-content">
      {userProfile.profileImage && (
          <img
          src={`http://localhost:3000/${userProfile.profileImage}`}
            alt={`${userProfile.username}'s profile`}
            className="popup-profile-image"
          />
        )}
        <div className="user-details">
          <p>{userProfile.email}</p>
          <p>Hi, {userProfile.username}!</p>
        </div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleFileUpload}>Upload New Picture</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Popup;
