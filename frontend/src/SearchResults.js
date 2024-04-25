import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function SearchResults() {
  const [results, setResults] = useState([]);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState('');
  const query = searchParams.get('query');

  useEffect(() => {
    const token = sessionStorage.getItem('token') || localStorage.getItem('token');
  
    if (query && token) {
      fetch(`/drive/search?query=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Server responded with status ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.files)) {
          setResults(data.files);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(error => {
        console.error('Search failed:', error);
        setError(error.toString());
      });
    }
  }, [query]);
  

  return (
    <div>
      <h2>Search Results</h2>
      {error && <p>Error: {error}</p>}
      <ul>
        {results.map((file) => (
          <li key={file._id}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
}
export default SearchResults;