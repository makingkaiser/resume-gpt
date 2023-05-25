import './App.css';
import SubmitUserQuery from './SubmitUserQuery';
import FileUpload from './FileUpload';

function App() {
  const queryChangeHandler = (event) => {
    console.log(event.target.value);}

  return (
    <div className="App">
      <FileUpload/>

      <SubmitUserQuery/>
    </div>
  );
}

export default App;
