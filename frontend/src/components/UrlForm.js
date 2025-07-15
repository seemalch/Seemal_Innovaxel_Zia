import React, { useState } from 'react';
import axios from 'axios';

const UrlForm = ({ onShorten }) => {
  const [url, setUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) {
      setError('Please enter a URL');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/shorten', { originalUrl: url });
      onShorten(res.data);
      setUrl('');
      setError('');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to shorten URL');
    }
  };

  return (
    <div className="container">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter a long URL"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Shorten URL</button>
      </form>
    </div>
  );
};

export default UrlForm;