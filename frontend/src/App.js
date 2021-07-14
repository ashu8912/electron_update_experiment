import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';

function App() {
  const {desktopApi} = window;
  const [version, setVersion] = useState('');
  
  useEffect(() => {
    desktopApi.receive("app_version", (version) => {
      console.log(version);
      setVersion(version);
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          App version is  <code>{version}</code> 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
