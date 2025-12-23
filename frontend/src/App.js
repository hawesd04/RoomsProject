import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './Home';
import Room from './rooms/Room';
import RoomCreator from './rooms/RoomCreator';
import About from './About';
import './App.css';
/*
  This is the main launcher for the full application. It sets up all web routes you can navigate to.
*/
function App() {

  // Return for main app. Includes all possible web-routes
  return (
    <BrowserRouter>
      <div className="background-decoration" />
      <Routes>
        {/* Route for the Home element*/}
        <Route path="/" element={<Home />} />
        {/* Route for each room element*/}
        <Route path="/room/:name" 
          element={<Room />} />
        {/* Route for the room-creator element*/}
        <Route path="/create-new" element={<RoomCreator />} />

        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
