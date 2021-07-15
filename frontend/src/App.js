import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Modal from '@material-ui/core/Modal';
import ReactMarkdown from 'react-markdown'
import Backdrop from '@material-ui/core/Backdrop';
import Popup from './Popup';

function App() {
  const {desktopApi} = window;
  const [newReleaseData, setNewReleaseData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showReleaseNotes, setShowReleaseNotes] = useState(false);
  useEffect(() => {
    desktopApi.receive("update_available", (data) => {
      setNewReleaseData(data);
      setShowPopup(true);
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
       <Modal open={showReleaseNotes} BackdropComponent={Backdrop}>
          <ReactMarkdown>{newReleaseData?.releaseNotes}</ReactMarkdown>
        </Modal>
      {showPopup && <Popup popupCloseHandler={() => setShowPopup(false)} 
       downloadURL = {newReleaseData.downloadURL}
       releaseNotesClickHandler = {() => {
         setShowReleaseNotes(true);
         setShowPopup(false);
        }}
      />}
    </div>
  );
}

export default App;
