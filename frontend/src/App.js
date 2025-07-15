import Hallway from './Hallway';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import { Typography } from '@mui/material';
import './App.css';
import Room from './Room';

function App() {

  // return for main app, includes all possible web routes
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:id" 
          element={<Room />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
