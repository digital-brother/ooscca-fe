import ReactDOM from 'react-dom/client';
import React, {useCallback, useState} from 'react';
import { useDropzone } from 'react-dropzone';
import './index.css';

const dragAndDropContainer = {
  borderRadius: '6px',
  backgroundColor: 'rgba(222, 226, 230, 1)',
  border: '1px solid rgba(173, 181, 189, 1)',
  display: 'flex',
  minHeight: '110px',
  maxWidth: '380px',
  flexDirection: 'column',
};

const textStyle = {
  fontWeight: 'bold',
  textAlign: 'center',
};

const browseStyle = {
  color: 'purple',
};

export default function MyComponent(props) {
  const [image, setImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('image/')) {
      setImage(file); // Update the state with the new image
    } else {
      alert('Please upload only image files.');
    }
  }, []);

  const confirmRemoveImage = () => {
    setImage(null);
    setModalOpen(false); // Close modal on confirmation
  };

  const askRemoveImage = (event) => {
    event.stopPropagation(); // Prevent the file dialog from opening
    setModalOpen(true); // Show confirmation modal
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 5242880 // 5MB in bytes
  });

  const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <p>Are you sure you want to delete the file?</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onClose}>No</button>
        </div>
      </div>
    );
  };

  if (image && isModalOpen === false) {
    return (
      <div style={dragAndDropContainer} {...getRootProps()}>
        <div>
          <img
            src={URL.createObjectURL(image)}
            alt="Preview"
            style={{ width: '100%', height: 'auto' }}
          />
          <button onClick={askRemoveImage}>Remove Image</button>
        </div>
      </div>
    );
  } else if (image && isModalOpen === true) {
      return (
        <div style={dragAndDropContainer}>
          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onConfirm={confirmRemoveImage}
          />
        </div>
      );
  } else {
    return (
      <div style={dragAndDropContainer} {...getRootProps()}>
        <div className="dropzone">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={textStyle}>Drop the file here...</p>
          ) : (
            <p style={textStyle}>
              Drop your logo file here or <span style={browseStyle}>browse</span>
            </p>
          )}
        </div>
      </div>
    );
  }
}
