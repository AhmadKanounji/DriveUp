import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = (event) => {
    event.preventDefault();
  
    if (!file) {
      alert('Please select a file first!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    // Attempt to get the token from sessionStorage first, then localStorage
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  
    if (!token) {
      alert('No authentication token found. Please sign in.');
      return;
    }
  
    fetch('/drive/files', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('File uploaded successfully!');
    })
    .catch((error) => {
      console.error('Upload error:', error);
      alert(`Upload error: ${error.message}`);
    });
  };
  

  return (
    <div>
      <h2>Upload File</h2>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
