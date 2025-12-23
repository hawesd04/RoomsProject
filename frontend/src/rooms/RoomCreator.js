import { useState } from 'react';
import { ChevronLeft, ChevronRight, Home, Eye, EyeClosed } from 'lucide-react';
import GradientText from '../assets/GradientText';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RoomCreator.css';

function Room() {

  const root = document.documentElement;
  const url = "https://pogchat-suite.onrender.com"

  const [roomName, setRoomName] = useState('');
  const [passcode1, setPasscode1] = useState('');
  const [passcode2, setPasscode2] = useState('');
  const [secret, setSecret] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [pronouns, setPronouns] = useState('');
  const [description, setDescription] = useState('');

  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#777777');

  const [BGprimaryColor, setBGPrimaryColor] = useState('#1f2257');
  const [BGsecondaryColor, setBGSecondaryColor] = useState('#1e1f31');

  const [isCreating, setIsCreating] = useState(false);

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
    if (nextpage >= 6 ) {
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

  const [passInputVisibility1, setPassInput1Visiblity1] = useState(false);
  const [passInputVisibility2, setPassInput1Visiblity2] = useState(false);
  const [secretInputVisibility, setSecretInputVisibility] = useState(false);

  function togglePassInputVisibility1() {
    setPassInput1Visiblity1(!passInputVisibility1)
  }

  function togglePassInputVisibility2() {
    setPassInput1Visiblity2(!passInputVisibility2)
  }

  function toggleSecretInputVisibility() {
    setSecretInputVisibility(!secretInputVisibility)
  }

  const handleSubmit = async () => {
    console.log('Submitting room data:', { roomName, profileUrl });
    
    if (passcode1!==passcode2) {
      alert("passwords dont match")
      console.log("passwords dont match")
      return;
    }

    setIsCreating(true);
    try {
    const response = await fetch(url + `/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ 
          name: "creationcode",
          enteredPass: secret  
        }),
      });

      if(!response.ok) {
        alert('incorrect secret code');
        return;
      }  
    }
    catch (error) {
      console.error('room creation failed: ', error)
      return;
    }
    finally {
      setIsCreating(false);
    }


    axios.post(url + `/api/auth/hashnew`, {
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
      axios.post(url + `/api/create`, {
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
      axios.post(url + `/api/create`, {
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
      {/* Background */}
      <div className="background-custom" />

      <>
        {isCreating && (
          <div className="loading-overlay">
            <div className="spinner"></div>
            <h6>Creating room...</h6>
          </div>
        )}
      </>
      
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
                {currPage}/5
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
                      type={passInputVisibility1 ? "text" : "password"}
                      value={passcode1}
                      onChange={(e) => setPasscode1(e.target.value)} 
                      placeholder="Password"
                      className="form-input"
                    />
                    <button 
                      className="toggle-password"
                      onClick={togglePassInputVisibility1}
                      >
                        {passInputVisibility1 ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                    </button>
                  </div>
                  <div className="form-field">
                    <h3 className="field-label">Re-Enter the password *</h3>
                    <input
                      id="pass-input2"
                      type={passInputVisibility2 ? "text" : "password"} 
                      value={passcode2}
                      onChange={(e) => setPasscode2(e.target.value)}
                      placeholder="Password"
                      className="form-input"
                    />
                    <button 
                      className="toggle-password2"
                      onClick={togglePassInputVisibility2}
                      >
                        {passInputVisibility2 ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                    </button>
                  </div>
                </div>
              )}
              {/* Page 5 */}
              {currPage === 5 && (
                <div className="form-container">
                  <div className="form-field">
                    <h3 className="field-label">To make sure only pogchat members can create rooms, we have
                      a secret passcode that we all know and love dearly. Provide this key to finish creating
                      your room!
                    </h3>
                  </div>
                  <div className="form-field">
                    <h3 className="field-label">Enter the secret room creation code:</h3>
                    <input
                      id="secret-input"
                      type={secretInputVisibility ? "text" : "password"} 
                      value={secret}
                      onChange={(e) => setSecret(e.target.value)}
                      placeholder="secret code"
                      className="form-input"
                    />
                    <button 
                      className="toggle-secret"
                      onClick={toggleSecretInputVisibility}
                      >
                        {secretInputVisibility ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                    </button>
                  </div>
                  {/* Submit button */}
                  <button 
                    onClick={handleSubmit} 
                    disabled={isCreating}
                    className="submit-btn"
                  >
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