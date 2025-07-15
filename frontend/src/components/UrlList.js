import React, { useState, useEffect } from 'react';

const UrlList = ({ urls, onDelete, onVisit }) => {
  const [localUrls, setLocalUrls] = useState(urls);
  const [copiedUrl, setCopiedUrl] = useState(null);

  // Sync with parent URLs
  useEffect(() => {
    setLocalUrls(urls);
  }, [urls]);

  const copyToClipboard = (text, shortCode) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(shortCode);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const handleLinkClick = async (shortCode) => {
    try {
      // Optimistic UI update
      setLocalUrls(prevUrls => 
        prevUrls.map(url => 
          url.shortCode === shortCode 
            ? { ...url, accessCount: (url.accessCount || 0) + 1 } 
            : url
        )
      );

      // Open in new tab
      window.open(`http://localhost:5000/api/${shortCode}`, '_blank');
      
      // Notify parent component
      if (onVisit) onVisit(shortCode);
      
    } catch (err) {
      console.error('Error tracking visit:', err);
    }
  };

  if (!localUrls.length) {
    return (
      <div className="container url-list">
        <p className="no-urls-message">No shortened URLs yet. Create one above!</p>
      </div>
    );
  }

  return (
    <div className="container url-list">
      <h3>Your Short URLs</h3>
      <ul>
        {localUrls.map((url) => (
          <li key={url.shortCode} className="url-item">
            <div className="url-info">
              <div className="url-display">
                <a
                  href={`http://localhost:5000/api/${url.shortCode}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(url.shortCode);
                  }}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="short-url"
                >
                  {`http://localhost:5000/api/${url.shortCode}`}
                </a>
                <span className="original-url">→ {url.originalUrl}</span>
              </div>
              <div className="url-actions">
                <button 
                  onClick={() => copyToClipboard(
                    `http://localhost:5000/api/${url.shortCode}`,
                    url.shortCode
                  )}
                  className={`action-btn copy-btn ${copiedUrl === url.shortCode ? 'copied' : ''}`}
                >
                  {copiedUrl === url.shortCode ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={() => onDelete(url.shortCode)}
                  className="action-btn delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="url-stats">
              <p><span>Visits:</span> {url.accessCount || 0}</p>
              <p><span>Created:</span> {new Date(url.createdAt).toLocaleString()}</p>
              {url.updatedAt && (
                <p><span>Last accessed:</span> {new Date(url.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UrlList;