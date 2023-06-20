import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileUpload.css';

axios.defaults.baseURL = 'http://localhost:5000';

export default function FileUpload({ onNamespaceUpdate }) {
  const [file, setFile] = useState(null);

  function handleFile(event) {
    setFile(event.target.files[0]);
  }

  useEffect(() => {
    if (file !== null) {
      console.log('Updated file:', file);
    }
  }, [file]); // Run the effect whenever the value of 'file' changes

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!file) {
      console.log('No file selected');
      return;
    }
  
    // Check if the selected file is a PDF
    if (file.type !== 'application/pdf') {
      console.log('Only PDF files are allowed');
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
    } catch (error) {
      console.error('Error', error);
      console.error('The process failed at this stage');
    }
  };
  

  return (
    <div className="upload">
      <form action="#" onSubmit={submitHandler}>
        <h1>Upload your PDF file</h1>
        <input type="file" accept="application/pdf" onChange={handleFile} />
        <button>Upload</button>
      </form>
    </div>
  );
}
