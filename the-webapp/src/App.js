import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import FileUpload from './FileUpload';
import ChatBox from './ChatComponent';

function App() {
  const [namespace, setNamespace] = useState('aboutkaiser');

  const handleNamespaceUpdate = (newNamespace) => {
    setNamespace(newNamespace);
  };

  useEffect(() => {
    const handleBeforeUnload = async () => {
      try {
        await axios.delete('/api/delete-memory');
      } catch (error) {
        console.error(error);
      }
    };

    handleBeforeUnload(); // Call the function immediately

    return () => {
      handleBeforeUnload(); // Call the function when the component unmounts
    };
  }, []);

  useEffect(() => {
    const handleBeforeUnload = async (event) => {
      event.preventDefault();
      event.returnValue = ''; // Required for Chrome

      try {
        await axios.delete('/api/delete-memory');
      } catch (error) {
        console.error(error);
      }
    };

  window.addEventListener('beforeunload', handleBeforeUnload);

  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}, []);
  return (
    <div className="App">
      {<ChatBox namespace={namespace} />}
    
    </div>
  );
}

export default App;