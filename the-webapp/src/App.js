import './App.css';
import GenerateButton from './GenerateButton';
import FileUpload from './FileUpload';

function App() {
  return (
    <div className="App">
      <FileUpload/>
      <input type ="text" placeholder='Ask me anything'/>
      <GenerateButton/>
    </div>
  );
}

export default App;
