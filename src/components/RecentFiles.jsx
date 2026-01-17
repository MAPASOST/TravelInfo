import React from 'react';
import './RecentFiles.css';

const RecentFiles = ({ recentFiles, onSelect, onClear, type }) => {
  if (!recentFiles || recentFiles.length === 0) {
    return null;
  }

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="recent-files">
      <div className="recent-files-header">
        <h3>Recent {type} Files</h3>
        <button className="clear-button" onClick={onClear} title="Clear recent files">
          ×
        </button>
      </div>
      <div className="recent-files-list">
        {recentFiles.map((file, index) => (
          <div
            key={index}
            className="recent-file-item"
            onClick={() => onSelect(file)}
            title={file.path}
          >
            <div className="file-icon">📄</div>
            <div className="file-info">
              <div className="file-name">{file.name}</div>
              <div className="file-timestamp">{formatDate(file.timestamp)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentFiles;
