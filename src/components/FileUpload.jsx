import React, { useRef } from 'react';
import './FileUpload.css';

const FileUpload = ({ label, onUpload, loading, fileLoaded }) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  const handleElectronUpload = async () => {
    if (window.electronAPI) {
      const result = await window.electronAPI.selectFile();
      if (result) {
        // Convert array back to Uint8Array then to File-like object
        const uint8Array = new Uint8Array(result.data);
        const blob = new Blob([uint8Array], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        const file = new File([blob], result.name, {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        });
        onUpload(file);
      }
    } else {
      // Fallback to regular file input
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".xlsx,.xls"
        style={{ display: 'none' }}
      />
      <button
        className={`upload-button ${fileLoaded ? 'loaded' : ''}`}
        onClick={handleElectronUpload}
        disabled={loading}
      >
        {loading ? (
          <span className="loading-spinner">⏳</span>
        ) : fileLoaded ? (
          <span className="success-icon">✓</span>
        ) : (
          <span className="upload-icon">📁</span>
        )}
        <span className="button-text">
          {loading ? 'Loading...' : fileLoaded ? `${label} ✓` : label}
        </span>
      </button>
    </div>
  );
};

export default FileUpload;
