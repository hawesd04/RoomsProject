import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import './App.css';
import Room from './Room';
/*
  This is the main launcher for the full application. It sets up all web routes you can navigate to.
*/
function App() {

  // Return for main app. Includes all possible web-routes
  return (
    <BrowserRouter>
      <Routes>
        {/* Route for the Home element*/}
        <Route path="/" element={<Home />} />
        {/* Route for each room element*/}
        <Route path="/room/:id" 
          element={<Room />} />
        {/* Route for the room-creator element*/}
        <Route path="/create-new" element={<RoomCreator />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
