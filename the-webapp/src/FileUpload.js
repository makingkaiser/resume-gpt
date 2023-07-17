import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';
import {RiFileUploadLine} from 'react-icons/ri';
import {ReactComponent as ReactLogo} from './orbit.svg';
// document.addEventListener('DOMContentLoaded', () => {

//   const text = "This is a ChatGPT-like typing effect ,simulating human typing with random delays and a blinking cursor. It also supports multiline text and ensures the cursor is displayed at the end of the last output character.";
//   const typewriter = document.getElementById('typewriter');
//   const words = text.split(/\s+/);
//   let index = 0;

//   function type() {
//     if (index < words.length) {
//       typewriter.innerHTML = words.slice(0, index + 1).join(' ') + '<span class="blinking-cursor">|</span>';
//       index++;
//       setTimeout(type, Math.random() * 100 + 50);
//     } else {
//       typewriter.innerHTML = words.join(' ') + '<span class="blinking-cursor">|</span>';
//     }
//   }

//   // start typing
//   type();
//});
axios.defaults.baseURL = 'http://localhost:5000';
//axios.defaults.baseURL = 'https://convoagent.onrender.com'
export default function FileUpload({ onNamespaceUpdate }) {
  const [file, setFile] = useState(null);
  const [namespace, setNamespace] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [label, setLabel] = useState('Upload a file...'); // Define label state here
  

  function handleFile(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setErrorMessage(null);
      setSuccessMessage(null);
      setLabel(selectedFile.name);
    } else {
      setFile(null);
      setErrorMessage(null);
      setSuccessMessage(null);
      setLabel('Upload a file...');
    }
}

function handleCancel() {
    setFile(null);
    setErrorMessage(null);
    setSuccessMessage(null);
    setLabel('Upload a file...');
}

  function handleNamespace(event) {
    setNamespace(event.target.value);
    setErrorMessage(null);
  }

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!file && !namespace) {
      const message = 'Please select a file or enter a namespace';
      setErrorMessage(message);
      return;
    }

    if (file && namespace) {
      const message = 'Please select either a file or enter a namespace, not both';
      setErrorMessage(message);
      return;
    }

    if (file) {
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
        setErrorMessage('An error occurred while uploading the file', error);
        setSuccessMessage(null); // Clear any previous success message
      }
    } else if (namespace) {
      try {
        const response = await axios.post(`/namespacevalidity/${namespace}`);
        console.log(response.data);
        if (response.data === 1) {
          onNamespaceUpdate(namespace); // Pass the namespace value to the onNamespaceUpdate function
          setSuccessMessage('Namespace submitted successfully!'); // Set the success message
          setErrorMessage(null); // Clear any previous error message
        } else {
          setErrorMessage('Please enter a valid namespace');
          setSuccessMessage(null);
        }
      } catch (error) {
        setErrorMessage('An error occurred while checking the namespace validity', error);
        setSuccessMessage(null); // Clear any previous success message
      }
    }
  };

  return (
    <div className="landing-page">

  <div className="logo">
    <ReactLogo />
  </div>
  <h1 className="heading">Welcome to OrbitAI! </h1>
  <div className="intro">
    <div id="typewriter"></div>
<p className="intro-paragraph">OrbitAI is your second brain in the cloud. Designed for understanding unstructured information.<br/>Ask questions, upload additional documents for orbitAI to learn, <br/> and share your customized chatbot through namespaces. </p>  </div>
  <div className="upload">
    <form action="#" onSubmit={submitHandler}>
      <h2>Upload your PDF file (Max 50MB) or enter an existing namespace!</h2>
      <label htmlFor="file-upload" className="custom-file-upload">
        <RiFileUploadLine className="upload-icon" />
        {label}
      </label>
      <input id="file-upload" type="file" accept="application/pdf" onChange={handleFile} />
      {file && (
        <div className="file-actions">
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <input type="text" placeholder="Enter an existing namespace..." value={namespace} onChange={handleNamespace} />
      <button style={{ fontWeight: 'bold' }}>Start!</button>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
    </form>
</div>
</div>
  );
}