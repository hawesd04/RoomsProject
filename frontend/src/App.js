import Hallway from './Hallway';
import { Typography } from '@mui/material';
import './App.css';

function App() {

  const arr = [1,2,3,4,5,6,7,8]
  return (
    <div className="App">
      <div className="container">
        <h2>
          Pogchat House
        </h2>
        <Hallway
          rooms = {arr}
          />
      </div>
    </div>
  );
}

export default App;
