import React, { useState , useEffect } from 'react';
import axios from 'axios';
import './FileAdd.css';
import { RiFileUploadLine } from 'react-icons/ri';
import { Error, Success } from './Messages';

//axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.baseURL = 'https://convoagent.onrender.com'

export default function FileAdd({ namespace }) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  function handleFile(event) {
    setFile(event.target.files[0]);
    setErrorMessage(null);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!file) {
      const message = 'Please select a file';
      setErrorMessage(message);
      return;
    }

    // Check if the selected file is a PDF
    if (file.type !== 'application/pdf') {
      const message = 'Only PDF files are allowed';
      setErrorMessage(message);
      return;
    }

    // Check if the file size is less than or equal to 50MB
    if (file.size > 50 * 1024 * 1024) {
      const message = 'File size should be less than or equal to 50MB';
      setErrorMessage(message);
      return;
    }

    const data = new FormData();
    data.append('file', file);
    console.log(data);


    try {
      const response = await axios.post(`/upload/${namespace}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct Content-Type header
        },
      });
      console.log('Upload Success!');
      console.log(response.data)
      setSuccessMessage('File uploaded successfully! You can now chat with your files.'); // Set the success message
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      setErrorMessage('An error occurred while uploading the file', error);
      setSuccessMessage(null); // Clear any previous success message
    }
  };

  // Clear the error or success message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage(null);
      setSuccessMessage(null);
    }, 5000);

    return () => clearTimeout(timer);
  }, [errorMessage, successMessage]);

  return (
    <div className="file-submit">
      <form action="#" onSubmit={submitHandler}>
        <div className='combined-button'>
          <button data-testid="upload-button"> Upload </button>
          <label htmlFor="file-upload" className="new-file-upload">
            Upload file
            <RiFileUploadLine className="uploadIcon" />
            <input id="file-upload" type="file" accept="application/pdf" onChange={handleFile} />
          </label>
        </div>
      </form>

      {errorMessage && (
        <div className="popup-container" data-testid="error-message">
          <div className="popup-content">
            <Error message={errorMessage} />
          </div>
        </div>
      )}
      {successMessage && (
        <div className="popup-container">
          <div className="popup-content">
            <Success message={successMessage} />
          </div>
        </div>
      )}
    </div>
  );
}