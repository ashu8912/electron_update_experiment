import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';

function App() {
  const {desktopApi} = window;

  useEffect(() => {
    desktopApi.receive("update_available", (data) => {
      console.log(data);
    })
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
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
