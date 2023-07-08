import React, { useState } from 'react';
import './App.css';
import FileUpload from './FileUpload';
import ChatBox from './ChatComponent';

function App() {
  const [namespace, setNamespace] = useState(null);

  const handleNamespaceUpdate = (newNamespace) => {
    setNamespace(newNamespace);
  };

  return (
    <div className="App">
      {namespace && <ChatBox namespace={namespace} />}
      {!namespace && <FileUpload onNamespaceUpdate={handleNamespaceUpdate} />}
    </div>
  );
}

export default App;