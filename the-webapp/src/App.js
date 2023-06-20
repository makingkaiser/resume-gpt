import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import SubmitUserQuery from './SubmitUserQuery';

function App() {
  const [namespace, setNamespace] = useState('');

  const handleNamespaceUpdate = (newNamespace) => {
    setNamespace(newNamespace);
  };

  return (
    <div className='App'>
      <FileUpload onNamespaceUpdate={handleNamespaceUpdate} />
      <SubmitUserQuery namespace={namespace} onNamespaceUpdate={handleNamespaceUpdate} />
    </div>
  );
}

export default App;
