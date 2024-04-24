import React, { useState, useEffect } from 'react';

function RecentFiles() {
  const [recentFiles, setRecentFiles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRecentFiles();
  }, []);

  const fetchRecentFiles = () => {
    // Replace with your actual authentication token retrieval logic
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

  const accessFile = (fileId) => {
    // Replace with your actual file access endpoint
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
      // Handle the file download here
      // For testing purposes, we just refetch the recent files
      fetchRecentFiles();
    })
    .catch(error => {
      setError(error.message);
    });
  };

  return (
    <div>
      <h1>Recent Files</h1>
      {error && <p>Error: {error}</p>}
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
