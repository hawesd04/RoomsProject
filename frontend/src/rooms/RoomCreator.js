import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import GradientText from '../assets/GradientText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoomCreator.css';

function Room() {

  const root = document.documentElement;

  const [roomName, setRoomName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [description, setDescription] = useState('');

  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#777777');

  const [BGprimaryColor, setBGPrimaryColor] = useState('#1f2257');
  const [BGsecondaryColor, setBGSecondaryColor] = useState('#1e1f31');

  console.log(BGsecondaryColor)
  root.style.setProperty('--BG-primary-color', BGprimaryColor);
  root.style.setProperty('--BG-secondary-color', BGsecondaryColor);

  const [currPage, setCurrPage] = useState(1);

  const navigate = useNavigate();

  const handleBackToHallway = () => {
    console.log('Navigating back to hallway');
    navigate(`/`);
  };

  const handlePageRight = () => {
    let nextpage = parseInt(currPage) + 1
    console.log('Curr page: ' + currPage + ", page right triggered");
    if (nextpage >= 5 ) {
      return;
    }
    setCurrPage(nextpage);

  }

    const handlePageLeft = () => {
    let nextpage = parseInt(currPage) - 1
    console.log('Curr page: ' + currPage + ", page left triggered");
    if (nextpage <= 0 ) {
      return;
    }
    setCurrPage(nextpage);

  }

  const handlePrimaryColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };
  const handleSecondaryColorChange = (e) => {
    setSecondaryColor(e.target.value);
  };
  const handleBGPrimColorChange = (e) => {
    setBGPrimaryColor(e.target.value);
  };

  const handleBGSecColorChange = (e) => {
    setBGSecondaryColor(e.target.value);
  };

  const handleSubmit = () => {
    console.log('Submitting room data:', { roomName, profileUrl });

    const passcode1 = (document.getElementById('pass-input1')).value;
    const passcode2 = (document.getElementById('pass-input2')).value;
    
    if (passcode1!==passcode2) {
      alert("passwords dont match")
      console.log("passwords dont match")
      return;
    }

    axios.post(`http://localhost:5000/api/auth/hashnew`, {
      name: roomName,
      password: passcode1,
    })
    .then(response => {
      console.log('password hashed successfully', response.data)
    })
    .catch(error => {
      console.log('password hashing error')
      return;
    })


    const img = new Image();
    img.src = profileUrl
    // load image to check validity
    img.onload = () => {
      if (roomName !== null && roomName.trim() !== "") {
      axios.post(`http://localhost:5000/api/create`, {
        name: roomName,
        frameImage: profileUrl ,
        pronouns: pronouns,
        description: description,
        primary: secondaryColor, 
        secondary: primaryColor,
        bgPrimary: BGprimaryColor,
        bgSecondary: BGsecondaryColor,
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
      <div className="background-custom" />
      
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
          <button 
            className="chevron-btn left-chevron"
            onClick={handlePageLeft}
          >
            <ChevronLeft size={40} />
          </button>

          {/* Main Section */}
          <div className="main-card">
            {/* Top highlight */}
            <div className="card-highlight" />
            
            <div className="card-content">
              <h2 className="page-num">
                {currPage}/4
              </h2>


              {/* Header text */}
              <div className="header-text">
                <h1 className="main-title">
                  It's time to build a room!
                </h1>
                <p className="subtitle">
                  To begin, please fill out the sections below
                </p>
              </div>

              {/* Page 1 */}
              {currPage === 1 && (
                <div className="form-container">
                  <div className="form-field">
                    <h3 className="field-label">Enter a Name</h3>
                    <input
                      type="text"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                      placeholder="Room name"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <h3 className="field-label">Enter a URL for a Profile Picture</h3>
                    <input
                      type="url"
                      value={profileUrl}
                      onChange={(e) => setProfileUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="form-input"
                    />
                  </div>
                </div>
              )}
              {/* Page 2 */}
              {currPage === 2 && (
                <div className="form-container">
                  <div className="form-field">
                    <h3 className="field-label">Enter your Pronouns</h3>
                    <input
                      type="text"
                      value={pronouns}
                      onChange={(e) => setPronouns(e.target.value)}
                      placeholder="he/him, she/her, they/them, etc."
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <h3 className="field-label">Enter a Bio or Description</h3>
                    <textarea
                      type="url"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              )}
              {/* Page 3 */}
              {currPage === 3 && (
                <div className="form-container">
                  <h3 className="text-grad-text">Text Gradient</h3>
                  <div className="form-row">
                    <div className="grad-text-box">
                      <GradientText
                                      fontSize={28}
                                      colors={[primaryColor, secondaryColor, primaryColor, secondaryColor, primaryColor]}
                                      animationSpeed={15}
                                      showBorder={false}
                                      className="cr-gradient-text"
                                    >
                                      {roomName || '[Placeholder]'}
                      </GradientText>
                      </div>
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
                  </div>
              <h3 className="bg-grad-text">Background Gradient</h3>
              <div className="form-row">
                <div className="gradient-box">
                  </div>
                  
                {/* Color pickers for gradient colors */}
                <div className="form-row">
                  <div className="color-picker-container">
                    <div className="color-picker-item">
                      <label htmlFor="primary-color">Primary Color:</label>
                        <input
                          id="primary-color"
                          type="color"
                          value={BGprimaryColor}
                          onChange={handleBGPrimColorChange}
                          className="color-picker-input"
                        />
                     </div>
                    <div className="color-picker-item">
                      <label htmlFor="secondary-color">Secondary Color:</label>
                      <input
                        id="secondary-color"
                        type="color"
                        value={BGsecondaryColor}
                        onChange={handleBGSecColorChange}
                        className="color-picker-input"
                      />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              )}
              {/* Page 4 */}
              {currPage === 4 && (
                <div className="form-container">
                  <div className="form-field">
                    <h3 className="field-label">Enter a password *</h3>
                    <input
                      id="pass-input1"
                      type="text"
                      placeholder="Password"
                      className="form-input"
                    />
                  </div>
                  <div className="form-field">
                    <h3 className="field-label">Re-Enter the password *</h3>
                    <input
                      id="pass-input2"
                      type="text"
                      placeholder="Password"
                      className="form-input"
                    />
                  </div>
                  {/* Submit button */}
                  <button onClick={handleSubmit} className="submit-btn">
                    Create Room
                  </button>
                </div>
              )}

            </div>
          </div>

          {/* Right arrow */}
          <button 
            className="chevron-btn right-chevron"
            onClick={handlePageRight}
          >
            <ChevronRight size={40} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Room;