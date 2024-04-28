// design done by Mohamad Ramadan in testbranch2 in the github//
import React, { useState, useEffect } from 'react';
import Popup from './components/Popup';
import { useNavigate } from 'react-router-dom';
import UploadPopup from './UploadPopup';
import './recentfiles.css';
import ShareModal from './ShareModal';
import './contextMenu.css';


function RecentFiles() {
  const navigate = useNavigate();
  const [recentFiles, setRecentFiles] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPopup, setShowPopup] = useState(false)
  const [showUploadPopup, setShowUploadPopup] = useState(false);;
  const [error, setError] = useState('');
  const [contextMenu, setContextMenu] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetchRecentFiles();
    fetchUserProfile();
    const handleGlobalClick = (e) => {
      if (contextMenu && e.target.closest('.custom-context-menu') === null) {
        setContextMenu(null);
      }
    };
    if (contextMenu) {
      window.addEventListener('click', handleGlobalClick);
    }
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [contextMenu]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  
  const shareFile = async (fileId, emailToShareWith) => {
    try {
      const token = sessionStorage.getItem('token');
      const response = await fetch(`/drive/files/${fileId}/share`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailToShareWith }),
      });

      const data = await response.json();
      if (response.ok) {
        // Handle successful sharing
        alert('File shared successfully!');
        refreshFiles(); // Refresh the list of files
      } else {
        // Handle errors, like user not found or file already shared
        alert(data.message);
      }
    } catch (error) {
      // Handle network errors
      console.error('Share error:', error);
      alert('Failed to share the file.');
    }
  };
  

  const handleSearch = (event) => {
    event.preventDefault();
    navigate(`/drive/search?query=${encodeURIComponent(searchTerm)}`);
  };
  const handleContextMenu = (event, file) => {
    event.preventDefault();
    setSelectedFile(file);
    setContextMenu({
      mouseX: event.clientX - 2,
      mouseY: event.clientY - 4,
    });
  };

  

  const handleShareClick = () => {
    if (selectedFile) {
      setShowShareModal(true);
    }
    setContextMenu(null);
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
      <div>
      <button onClick={() => setShowUploadPopup(true)}>New</button>
      {showUploadPopup && (
      <UploadPopup onClose={() => setShowUploadPopup(false)} onUploadSuccess={refreshFiles} />
    )}
      {}
    </div>
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
      <div className="file-list">
      {recentFiles.map((file) => (
    <div
      className="file-item"
      key={file._id}
      onContextMenu={(e) => handleContextMenu(e, file)} 
    >
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
{contextMenu && (
  <ul
    className="custom-context-menu"
    style={{
      position: 'fixed',
      top: `${contextMenu.mouseY}px`,
      left: `${contextMenu.mouseX}px`,
    }}
  >
    <li >Open with</li>
    <li >Download</li>
    <li >Rename</li>
    <li >Make a copy</li>
    <li onClick={handleShareClick}>Share</li>
    <li >Organize</li>
    <li >File information</li>
    <li >Move up to trash</li>
    <li >Not a helpful suggestion</li>
  </ul>
  
)}
{showShareModal && (
        <ShareModal
        file={selectedFile}
        onShare={shareFile}
        onClose={() => setShowShareModal(false)}
      />
      )}
      
    </div>
  );
}

export default RecentFiles;
