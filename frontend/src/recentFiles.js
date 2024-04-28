import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure this is correctly written and saved
import Popup from './components/Popup';
import UploadPopup from './UploadPopup';
import './recentfiles.css';


function RecentFiles() {
  const navigate = useNavigate();
  const [recentFiles, setRecentFiles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false)
  const [showUploadPopup, setShowUploadPopup] = useState(false);;
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
  const refreshFiles = () => {
    fetchRecentFiles(); 
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

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    setUserProfile(null);
    navigate('/signin');
  };



  return (
    <div className="page-container">
<header className="header">
      <Link to="recentFiles" className="logo">
        <img src="/DriveUp-logo.jpeg" alt="DriveUp Logo" />
      </Link>
      {userProfile && (
        <div className='profile-header'>
          <img
            src={`http://localhost:3000/${userProfile.profileImage}`} 
            alt="Profile"
            className="profile-icon"
          />
          <button onClick={handleLogout} className="logout-button">Log Out</button>
        </div>
      )}
      {!userProfile && (
        <Link to="/signin" className="signin-link">Sign In</Link>
      )}
    </header>
<div className="main-content">

      <h1>Welcome to DriveUp</h1>
      
      {error && <p>Error: {error}</p>}
      {/* {userProfile && (
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
      )} */}
      <div>
      <button onClick={() => setShowUploadPopup(true)}className='new-file-button'>New File</button>
      {showUploadPopup && (
      <UploadPopup onClose={() => setShowUploadPopup(false)} onUploadSuccess={refreshFiles} />
    )}
      {}
    </div>
      <form onSubmit={handleSearch} className='search-bar'>
        <input
          type="text"
          placeholder="Search files"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit" className='search-button'>Search</button>
      </form>
      {showPopup && <Popup userProfile={userProfile} onClose={togglePopup} />}
      <div className="file-list">
  {recentFiles.map(file => (
    <div className="file-item" key={file._id}>
      <div className="file-name">{file.name}</div>
      <div className="file-date">Modified on {new Date(file.uploadDate).toLocaleDateString()}</div>

      <div className="file-owner">
        {file.owner.profileImage && (
          <img
            src={`http://localhost:3000/${file.owner.profileImage}`} 
            alt={`${file.owner.username}'s icon`} 
            className="owner-icon"
          />
        )}
        {file.owner.username} 
      </div>

      <div className="file-location">{file.location}</div>
    </div>
  ))}
</div>
</div>

      
<footer className="footer">
<div className="footer-content">
  <p>DriveUp</p>
  <div className="social-media-icons">
    <a href="https://instagram.com"><img src="/instagram.png" alt="Instagram"/></a>
    <a href="https://twitter.com"><img src="/twitter.png" alt="Twitter"/></a>
    <a href="https://youtube.com"><img src="/youtube.png" alt="YouTube"/></a>
    <a href="https://linkedin.com"><img src="/linkedin.png" alt="LinkedIn"/></a>
  </div>
</div>
</footer>


</div>
  );



}

export default RecentFiles;
