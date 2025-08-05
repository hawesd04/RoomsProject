import './Room.css';
import GradientText from '../assets/GradientText';
import { Button, Typography } from '@mui/material';
import { Home } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios'

function Room() {
  const navigate = useNavigate();
  const root = document.documentElement;
  const location = useLocation();
  const room = location.state?.doorData;

  // State for gradient colors with fallback defaults
  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#777777');

  const [BGprimaryColor, setBGPrimaryColor] = useState('#1f2257');
  const [BGsecondaryColor, setBGSecondaryColor] = useState('#1e1f31');

  root.style.setProperty('--BG-primary-color', BGprimaryColor);
  root.style.setProperty('--BG-secondary-color', BGsecondaryColor);

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
        if (room?.assets?.bgGradColors?.primary) {
      setBGPrimaryColor(room.assets.bgGradColors.primary);
    }
    if (room?.assets?.bgGradColors?.secondary) {
      setBGSecondaryColor(room.assets.bgGradColors.secondary);
    }
  }, [room]);

  const handleBackToHallway = () => {
    navigate('/');
  };

  // Handle both gradient text color changes
  const handlePrimaryColorChange = (event) => {
    setPrimaryColor(event.target.value);
  };
  const handleSecondaryColorChange = (event) => {
    setSecondaryColor(event.target.value);
  };

  // Handle background primary and secondary
  const handleBGPrimColorChange = (event) => {
    setBGPrimaryColor(event.target.value);
  };

  const handleBGSecColorChange = (event) => {
    setBGSecondaryColor(event.target.value);
  };

  const handleSaveSettings = (event) => {
    console.log("here!")
    axios.put(`http://localhost:5000/api/updateRoom/${room._id}`, {
      name: room.name,
      frameImage: room.frameImage,
      pronouns: room.assets.pronouns,
      description: room.assets.description,
      primary: secondaryColor, 
      secondary: primaryColor,
      bgPrimary: BGprimaryColor,
      bgSecondary: BGsecondaryColor,
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
      <div className="background-custom" />
          {/* Header with back button */}
          <div className="header-nav">
            {/* Top right panel*/}
            <button onClick={handleBackToHallway} className="back-to-hallway-btn">
              <Home size={50} />
              Back to Hallway
            </button>
            
            {/*eventually a side panel for customization*/}
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

            {/* Color pickers for gradient colors */}
            <div className="color-picker-container">
              <div className="color-picker-item">
                <label htmlFor="primary-color">BG Primary Color:</label>
                <input
                  id="primary-color"
                  type="color"
                  value={BGprimaryColor}
                  onChange={handleBGPrimColorChange}
                  className="color-picker-input"
                />
              </div>
              <div className="color-picker-item">
                <label htmlFor="secondary-color">BG Secondary Color:</label>
                <input
                  id="secondary-color"
                  type="color"
                  value={BGsecondaryColor}
                  onChange={handleBGSecColorChange}
                  className="color-picker-input"
                />
              </div>
            </div>
            {/*Save Button (send customization data to database)*/}
            <button className="save-button"
              onClick={handleSaveSettings}
            >
              Save Settings
            </button>
        </div>

        {/* Main Content Display Card */}
        <div className="main-content">
          <div className="main-card-section">

            {/* Section for Name/Pronouns (Top) */}
            <div className="rows-top">
                <GradientText
                  fontSize={50}
                  colors={[primaryColor, secondaryColor, primaryColor, secondaryColor, primaryColor]}
                  animationSpeed={15}
                  showBorder={false}
                  className="gradient-text"
                >
                  {room?.name || 'Fallback'}
                </GradientText>
                <h2 className="pronouns">
                  {room.assets.pronouns}
                </h2>
              </div>

              {/* Custom DIV's Begin (PFP/DESC) */}
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
                    {room.assets.description}
                  </h6>
                </div>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>

              {/* Banner Section */}
              <div className="rows">
                  <img className="banner-wide"
                    src={"https://pbs.twimg.com/profile_banners/1094662116756336640/1706455341/1500x500"}
                    alt="Profile"
                    >
                  </img>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>

              {/* Wide Text */}
              <div className="rows">
                  <h6 className="wide-text">
                    [Placeholder]
                  </h6>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>

              {/* Tri-Text */}
              <div className="rows">
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>
              
              {/* Tri-Text, Labels */}
              <div className="rows-label">
                <div className="section-split-tri">
                  <h2 className="tri-label">Label</h2>
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <h2 className="tri-label">Label</h2>
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <h2 className="tri-label">Label</h2>
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>

              {/* Image, Text, Text */}
              <div className="rows">
                <div className="section-split-tri">
                  <img className="image-tri"
                    src={room?.frameImage}
                    alt="Profile"
                    >
                  </img>
                </div>
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>

              {/* Text, Image, Text */}
              <div className="rows">
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <img className="image-tri"
                    src={room?.frameImage}
                    alt="Profile"
                    >
                  </img>
                </div>
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>

              {/* Text, Text, Image */}
              <div className="rows">
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <h6 className="text-tri">
                    [Placeholder]
                  </h6>
                </div>
                <div className="section-split-tri">
                  <img className="image-tri"
                    src={room?.frameImage}
                    alt="Profile"
                    >
                  </img>
                </div>
              </div>

          </div>
        </div>
    </div>
  );
}

export default Room;