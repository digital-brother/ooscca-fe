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

function MyComponent(props) {
  const [image, setImage] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0];
    if (file) {
      setImage(file); // Update the state with the new image
    }
  }, []);

  const confirmRemoveImage = () => {
    setImage(null);
    setModalOpen(false); // Close modal on confirmation
  };

  const removeImage = () => {
    setModalOpen(true); // Show confirmation modal
  };

  const askRemoveImage = (event) => {
    event.stopPropagation(); // Prevent the file dialog from opening
    setModalOpen(true); // Show confirmation modal
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: 5242880 // 5MB in bytes
  });

  const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
    if (!isOpen) return null;

    return (
      <div className="modal">
        <div className="modal-content">
          <p>Are you sure you want to delete the file?</p>
          <button onClick={onClose}>No</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={dragAndDropContainer} {...getRootProps()}>
        {image ? (
          <div>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              style={{ width: '100%', height: 'auto' }}
            />
            <button onClick={askRemoveImage}>Remove Image</button>
          </div>
        ) : (
          <div className="dropzone">
            <input {...getInputProps()} />
            {isDragActive ? (
              <p>Drop the file here...</p>
            ) : (
              <p>Drag 'n' drop an image here, or click to select an image</p>
            )}
          </div>
        )}
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={confirmRemoveImage}
      />
    </>
  );
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyComponent />);
