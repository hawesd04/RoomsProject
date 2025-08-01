import './Room.css';
import GradientText from '../assets/GradientText';
import ColorPicker from '../assets/ColorPicker';
import { Button, Typography } from '@mui/material';
import { Home } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

function Room() {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.doorData;

  // State for gradient colors with fallback defaults
  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#777777');

  console.log('Room data:', room);
  console.log('Primary color from room:', room?.assets?.textGradColors?.primary);
  console.log('Secondary color from room:', room?.assets?.textGradColors?.secondary);

  // Update colors when room data is available
  useEffect(() => {
    if (room?.assets?.textGradColors?.primary) {
      setPrimaryColor(room.assets.textGradColors.primary);
    }
    if (room?.assets?.textGradColors?.secondary) {
      setSecondaryColor(room.assets.textGradColors.secondary);
    }
  }, [room]);

  const handleBackToHallway = () => {
    navigate('/');
  };

  // Handle color changes
  const handlePrimaryColorChange = (event) => {
    setPrimaryColor(event.target.value);
  };

  const handleSecondaryColorChange = (event) => {
    setSecondaryColor(event.target.value);
  };

  const handleSaveSettings = (event) => {
    console.log("here!")
    axios.put(`http://localhost:5000/api/update/${room._id}`, {
      name: room.name,
      frameImage: room.frameImage,
      primary: secondaryColor, 
      secondary: primaryColor
    })
      .then(response => {
        console.log("Successfully updating room:");
    })
      .catch(error => {
        console.error("Error updating room:", error);
    });
  };

  return (
    <div className="Room">
          {/* Header with back button */}
          <div className="header-nav">
            <button onClick={handleBackToHallway} className="back-to-hallway-btn">
              <Home size={50} />
              Back to Hallway
            </button>
            
            {/* Color pickers for gradient colors */}
            <div className="color-picker-container">
              <div className="color-picker-item">
                <label htmlFor="primary-color">Primary Color:</label>
                <input
                  id="primary-color"
                  type="color"
                  value={primaryColor}
                  onChange={handlePrimaryColorChange}
                  className="color-picker-input"
                />
              </div>
              <div className="color-picker-item">
                <label htmlFor="secondary-color">Secondary Color:</label>
                <input
                  id="secondary-color"
                  type="color"
                  value={secondaryColor}
                  onChange={handleSecondaryColorChange}
                  className="color-picker-input"
                />
              </div>
            </div>

            <button
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>



        </div>
        <div className="main-content">
          <div className="main-card">
            <div className="rows-top">
                <GradientText
                  fontSize={50}
                  colors={[primaryColor, secondaryColor, primaryColor]}
                  animationSpeed={3}
                  showBorder={false}
                  className="gradient-text"
                >
                  {room?.name || 'Sample Name'}
                </GradientText>
                <h2 className="pronouns">
                  He / Him
                </h2>
              </div>
              <div className="rows">
                <div className="section-split">
                  <img className="image"
                    src={room?.frameImage}
                    alt="Profile"
                    >
                  </img>
                </div>
                <div className="section-split">
                  <h6 className="description">
                    Hi my name is dylan, I am a 21 year old computer science major from blacksburg virginia! I am the worlds #1 autumn enthusiest.
                  </h6>
                </div>
              </div>

              <div className="rows">
                {/* You can add more content here */}
              </div>

              <div className="rows">
                {/* You can add more content here */}
              </div>
          </div>
        </div>
    </div>
  );
}

export default Room;