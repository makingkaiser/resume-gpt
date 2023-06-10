import './App.css';
import SubmitUserQuery from './SubmitUserQuery';
import FileUpload from './FileUpload';
import Login from './Login';
import { useState } from 'react';

function App() {
  const queryChangeHandler = (event) => {
    console.log(event.target.value);
  }


  return (
    <div>
      <div>
        <FileUpload />
      </div>
      <div>
        <SubmitUserQuery/>
      </div>
    </div>
  );
}

export default App;
