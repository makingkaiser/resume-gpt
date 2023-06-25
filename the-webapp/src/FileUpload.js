import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileUpload.css';

axios.defaults.baseURL = 'https://convoagent.onrender.com';
//axios.defaults.baseURL = 'http://localhost:5000';

export default function FileUpload({ onNamespaceUpdate }) {
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);


  function handleFile(event) {
    setFile(event.target.files[0]);
    setErrorMessage(null);
  }

  useEffect(() => {
    if (file !== null) {
      console.log('Updated file:', file);
    }
  }, [file]); // Run the effect whenever the value of 'file' changes

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!file) {
      const message = 'No file selected';
      //console.error(message);
      setErrorMessage(message);
      return;
    }
  
    // Check if the selected file is a PDF
    if (file.type !== 'application/pdf') {
      const message = 'Only PDF files are allowed';
    
      setErrorMessage(message);
      return;
    }
  
    const data = new FormData();
    data.append('file', file);
    console.log(data);
  
    const namespace = file.name.split('.').slice(0, -1).join('.'); // Extract filename without extension
  
    try {
      const response = await axios.post(`/upload/${namespace}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the correct Content-Type header
        },
      });
      console.log('Upload Success!');
      console.log(response.data);
      onNamespaceUpdate(response.data.namespace || namespace); // Pass the namespace value to the onNamespaceUpdate function
      setSuccessMessage('File uploaded successfully! You can now chat with your files.'); // Set the success message
      setErrorMessage(null); // Clear any previous error message
    } catch (error) {
      //console.error('Error', error);
      //console.error('The process failed at this stage');
      setErrorMessage('An error occurred while uploading the file', error);
      setSuccessMessage(null); // Clear any previous success message
    }
  };
  

  return (
    <div className="upload">
      <form action="#" onSubmit={submitHandler}>
      <h1><label htmlFor="file-input">Upload your PDF file</label></h1>
        
        <input id="file-input" type="file" accept="application/pdf" onChange={handleFile} />
        <button>Upload</button>
        {errorMessage && <p className="error">{errorMessage}</p>}
        {successMessage && <p className="success">{successMessage}</p>}
      </form>
    </div>
  );
}