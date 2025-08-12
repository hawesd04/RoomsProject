import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoomCreator.css';

function Room() {
  const [roomName, setRoomName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');

  const navigate = useNavigate();

  const handleBackToHallway = () => {
    console.log('Navigating back to hallway');
    navigate(`/`);
  };

  const handleSubmit = () => {
    console.log('Submitting room data:', { roomName, profileUrl });
    const img = new Image();
    img.src = profileUrl
    // load image to check validity
    img.onload = () => {
      if (roomName !== null && roomName.trim() !== "") {
      axios.post(`http://localhost:5000/api/create`, {
        name: roomName,
        frameImage: profileUrl 
      })
      .then(response => {
        console.log('Door created successfully:', response.data);
        handleBackToHallway();
      })
      .catch(error => {
        console.error("Error creating door:", error);
        alert('Failed to create door');
      });
    }
    };  
    // If Image link is invalid, use fallback image
    img.onerror = function() {
      if (roomName !== null && roomName.trim() !== "") {
      axios.post(`http://localhost:5000/api/create`, {
        name: roomName,
        frameImage: 'https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg'
      })
      .then(response => {
        console.log('Door created successfully:', response.data);
        handleBackToHallway();
      })
      .catch(error => {
        console.error("Error creating door:", error);
        alert('Failed to create door');
      });
    }
    }
  };

  return (
    <div className="room-creator">
      {/* Background decoration */}
      <div className="background-decoration" />
      
      {/* Header with back button */}
      <div className="header-nav">
        <button onClick={handleBackToHallway} className="back-to-hallway-btn">
          <Home size={50} />
          Back to Hallway
        </button>
      </div>

      {/* Main content */}
      <div className="main-content">
        <div className="content-container">
          {/* Left arrow */}
          <button className="chevron-btn left-chevron">
            <ChevronLeft size={40} />
          </button>

          {/* Main Section */}
          <div className="main-card">
            {/* Top highlight */}
            <div className="card-highlight" />
            
            <div className="card-content">
              {/* Header text */}
              <div className="header-text">
                <h1 className="main-title">
                  It's time to build a room!
                </h1>
                <p className="subtitle">
                  To begin, please enter the following data
                </p>
              </div>

              {/* Form fields */}
              <div className="form-container">
                <div className="form-field">
                  <h3 className="field-label">
                    Enter a Name
                  </h3>
                  <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    placeholder="Room name"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <h3 className="field-label">
                    Enter a URL for a Profile Picture
                  </h3>
                  <input
                    type="url"
                    value={profileUrl}
                    onChange={(e) => setProfileUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="form-input"
                  />
                </div>
              </div>

              {/* Submit button */}
              <button onClick={handleSubmit} className="submit-btn">
                Create Room
              </button>
            </div>
          </div>

          {/* Right arrow */}
          <button className="chevron-btn right-chevron">
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;