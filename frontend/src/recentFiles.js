import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import { useNavigate } from 'react-router-dom';

function RecentFiles() {
  const navigate = useNavigate();
  const [recentFiles, setRecentFiles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentFiles();
    fetchUserProfile();
  }, []);
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/drive/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const fetchRecentFiles = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    fetch('/drive/recent-files', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch recent files');
      }
      return response.json();
    })
    .then(data => {
      setRecentFiles(data);
    })
    .catch(error => {
      setError(error.message);
    });
  };

  const fetchUserProfile = () => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    fetch('/auth/user_profile', { 
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => response.json())
    .then(data => {
      setUserProfile(data); 
    })
    .catch(error => {
      setError(error.message);
    });
  };

  const accessFile = (fileId) => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');

    fetch(`/drive/files/${fileId}/download`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to access file');
      }
      fetchRecentFiles();
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <div className="page-container">
      <h1>Welcome to DriveUp</h1>
      
      {error && <p>Error: {error}</p>}
      {userProfile && (
        <div className='profile-container' onClick={togglePopup}>
        <img
          src={`http://localhost:3000/${userProfile.profileImage}`} alt="Profile"
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            objectFit: 'cover',
            position: 'absolute', 
            top: '10px',
            right: '10px',
          }}
        />
        </div>
      )}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search files"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {showPopup && <Popup userProfile={userProfile} onClose={togglePopup} />}
      <ul>
        {recentFiles.map(file => (
          <li key={file._id}>
            {file.name} - Last Accessed: {file.lastAccessed}
            <button onClick={() => accessFile(file._id)}>Access</button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}

export default RecentFiles;
