import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UrlForm from './components/UrlForm.js';
import UrlList from './components/UrlList.js';
import './App.css';

function App() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
// Fetch URLs on mount
  useEffect(() => {
    const fetchUrls = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/');
        setUrls(response.data);
      } catch (err) {
        if (err.response?.status === 404) {
          setUrls([]);
        } else {
          setError('Connection error. Please check your network.');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUrls();
  }, []);
  // Shorten URL handler
  const handleShorten = (newUrl) => {
    setUrls([newUrl, ...urls]);
  };
//delete URL handler
  const handleDelete = async (shortCode) => {
    try {
      await axios.delete(`http://localhost:5000/api/${shortCode}`);
      setUrls(urls.filter(url => url.shortCode !== shortCode));
    } catch (err) {
      setError('Failed to delete. Please try again.');
    }
  };

  return (
    <div className="app-container">
      {loading ? (
        <div>Loading URLs...</div>
      ) : (
        <>
          <UrlForm onShorten={handleShorten} />
          <UrlList urls={urls} onDelete={handleDelete} />
        </>
      )}
      {error && (
        <div className="error">
          {error}
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}
    </div>
  );
}

export default App;