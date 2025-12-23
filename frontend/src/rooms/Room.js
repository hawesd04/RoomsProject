import './Room.css';
import GradientText from '../assets/GradientText';
import { Home, Eye, EyeClosed } from 'lucide-react';
import { useNavigate,  } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Snowfall from 'react-snowfall';
import DivEditors from './EditableComponents'
import axios from 'axios'

function Room() {

  /* ------------------------ MODEL ------------------------ */
  const navigate = useNavigate();
  const root = document.documentElement;
  const location = useLocation();
  const room = location.state?.doorData;

  // State for gradient colors with fallback defaults
  const [primaryColor, setPrimaryColor] = useState('#ffffff');
  const [secondaryColor, setSecondaryColor] = useState('#777777');

  const [BGprimaryColor, setBGPrimaryColor] = useState('#1f2257');
  const [BGsecondaryColor, setBGSecondaryColor] = useState('#1e1f31');

  const [name, setName] = useState(room.name);
  const [PFP, setPFP] = useState(room.frameImage);
  const [pronouns, setPronouns] = useState(room.assets.pronouns);
  const [description, setDescription] = useState(room.assets.description);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customHTML, setCustomHTML] = useState(room.assets.customHTML);

  const [bgMusicUrl, setBgMusicUrl] = useState(room.assets.bgMusicUrl || '');
  const [useBGMusic, setUseBGMusic] = useState(room.assets.useBGMusic || false);
  const [musicVolume, setMusicVolume] = useState(0.10);
  const [musicImg, setMusicImg] = useState(room.assets.musicImg);
  const [musicName, setMusicName] = useState(room.assets.musicName);
  const [musicArtist, setMusicArtist] = useState(room.assets.musicArtist);

  const [passInputVisibility1, setPassInput1Visiblity1] = useState(false);
  function togglePassInputVisibility1() {
    setPassInput1Visiblity1(!passInputVisibility1)
  }

  const [useHTML, setUseHTML] = useState(room.assets.useHTML);
  const [renderSnow, setRenderSnow] = useState(room.assets.renderSnow);


  root.style.setProperty('--BG-primary-color', BGprimaryColor);
  root.style.setProperty('--BG-secondary-color', BGsecondaryColor);
  root.style.setProperty('--Primary-color', primaryColor);
  root.style.setProperty('--Secondary-color', secondaryColor);

  // console.log('Room data:', room);
  // console.log('Primary color from room:', room?.assets?.textGradColors?.primary);
  // console.log('Secondary color from room:', room?.assets?.textGradColors?.secondary);

  // TESTING FULL DIV SETUP

  /* 
    Base room config state. Holds the configuration of the entire room beyond pfp
    and description.
  */

  const [roomConfig, setRoomConfig] = useState(room.roomConfig);

  /* 
    Every available div to choose from in rendering. Each labeled div can be
    toggled based on room config. 
  */
  const availableDivs = {
    'banner-wide': {
      name: 'Wide Banner',
      description: 'Full-width banner image',
      defaultData: { 
        imageUrl: 'https://pbs.twimg.com/media/GxJLiItXoAEasfB?format=png&name=large' 
      }
    },
    'wide-text': {
      name: 'Full Width Text',
      description: 'Text spanning full width',
      defaultData: { text: '' }
    },
    'tri-text': {
      name: 'Three Column Text',
      description: 'Three text columns side by side',
      defaultData: { text1: '', text2: '', text3: '' }
    },
    'tri-text-labeled': {
      name: 'Labeled Three Column Text',
      description: 'Three text columns with labels',
      defaultData: { 
        label1: 'Label', text1: '',
        label2: 'Label', text2: '',
        label3: 'Label', text3: ''
      }
    },
    'image-text-text': {
      name: 'Image + Two Text Columns',
      description: 'Image on left, two text columns on right',
      defaultData: { imageUrl: '', text1: '', text2: '' }
    },
    'text-image-text': {
      name: 'Text + Image + Text',
      description: 'Text, image in center, text',
      defaultData: { text1: '', imageUrl: '', text2: '' }
    },
    'text-text-image': {
      name: 'Two Text + Image',
      description: 'Two text columns on left, image on right',
      defaultData: { text1: '', text2: '', imageUrl: '' }
    }
  };



  /* 
    Div Components is a variable that stores the existance of "divs" that I have
    Labeled and preset with css formatting. This is to allow users to pick and choose
    How to represent their information on the webpage. PART OF VIEW
  */
  const DivComponents = {
    'banner-wide': ({ data }) => (
      <>
        <div className="rows">
          <img className="banner-wide"
            src={data?.imageUrl || "https://pbs.twimg.com/media/GxJLiItXoAEasfB?format=png&name=large"}
            alt="Profile"
          />
        </div>
        <div className="plain-line"></div>
      </>
    ),

    'wide-text': ({ data }) => (
      <>
        <div className="rows">
          <h6 className="wide-text">
            {data?.text || '[Placeholder]'}
          </h6>
        </div>
        <div className="plain-line"></div>
      </>
    ),

    'tri-text': ({ data }) => (
      <>
        <div className="rows">
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text1 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text2 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text3 || '[Placeholder]'}
            </h6>
          </div>
        </div>
        <div className="plain-line"></div>
      </>
    ),

    'tri-text-labeled': ({ data }) => (
      <>
        <div className="rows-label">
          <div className="section-split-tri">
            <h2 className="tri-label">{data?.label1 || 'Label'}</h2>
            <h6 className="text-tri">
              {data?.text1 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <h2 className="tri-label">{data?.label2 || 'Label'}</h2>
            <h6 className="text-tri">
              {data?.text2 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <h2 className="tri-label">{data?.label3 || 'Label'}</h2>
            <h6 className="text-tri">
              {data?.text3 || '[Placeholder]'}
            </h6>
          </div>
        </div>
        <div className="plain-line"></div>
      </>
    ),

    'image-text-text': ({ data }) => (
      <>
        <div className="rows">
          <div className="section-split-tri">
            <img className="image-tri"
              src={data?.imageUrl || PFP}
              alt="Profile"
            />
          </div>
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text1 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text2 || '[Placeholder]'}
            </h6>
          </div>
        </div>
        <div className="plain-line"></div>
      </>
    ),

    'text-image-text': ({ data }) => (
      <>
        <div className="rows">
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text1 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <img className="image-tri"
              src={data?.imageUrl || PFP}
              alt="Profile"
            />
          </div>
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text2 || '[Placeholder]'}
            </h6>
          </div>
        </div>
        <div className="plain-line"></div>
      </>
    ),

    'text-text-image': ({ data }) => (
      <>
        <div className="rows">
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text1 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <h6 className="text-tri">
              {data?.text2 || '[Placeholder]'}
            </h6>
          </div>
          <div className="section-split-tri">
            <img className="image-tri"
              src={data?.imageUrl || PFP}
              alt="Profile"
            />
          </div>
        </div>
        <div className="plain-line"></div>
      </>
    )
  };

  /* ------------------------ CONTROLLER ------------------------ */
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
  const handlePrimaryColorChange = (e) => {
    setPrimaryColor(e.target.value);
  };
  const handleSecondaryColorChange = (e) => {
    setSecondaryColor(e.target.value);
  };

  const handleNameUpdate = (e) => {
    setName(e.target.value);
  };

  const handlePronounUpdate = (e) => {
    setPronouns(e.target.value);
  };

  const handlePFPUpdate = (e) => {
    setPFP(e.target.value);
  };

  const handleDescUpdate = (e) => {
    setDescription(e.target.value);
  };

    const handleCustomHTMLUpdate = (e) => {
    setCustomHTML(e.target.value);
  };

  // Handle background primary and secondary
  const handleBGPrimColorChange = (e) => {
    setBGPrimaryColor(e.target.value);
  };

  const handleBGSecColorChange = (e) => {
    setBGSecondaryColor(e.target.value);
  };

  const handleLogin = async () => {
    const passcode = (document.getElementById('pass-input')).value;

  try {
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
        body: JSON.stringify({ 
          name, 
          enteredPass: passcode  
        }),
    });

    if(response.ok) {
      console.log('Logged into room successfully!')
      setIsLoggedIn(true);
    }
    else {
      alert('incorrect password');
    }  
  }
  catch (error) {
    console.error('login failed: ', error)
    
  }
};

  // ALL OF THE EVENT HANDLERS FOR DIV EDITOR!!!! (A LOT OF THEM)

const handlers = {
  handleWideTextChange: (e) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'wide-text': { ...prev.divData['wide-text'], text: e.target.value }
      }
    }));
  },

  handleBannerChange: (e) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'banner-wide': { ...prev.divData['banner-wide'], imageUrl: e.target.value }
      }
    }));
  },

  handleTriTextChange: (field, value) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'tri-text': { ...prev.divData['tri-text'], [field]: value }
      }
    }));
  },

  handleLabelTriTextChange: (field, value) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'tri-text-labeled': { 
          ...prev.divData['tri-text-labeled'], 
          [field]: value 
        }
      }
    }));
  },

  handleITTChange: (field, value) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'image-text-text': { 
          ...prev.divData['image-text-text'], 
          [field]: value 
        }
      }
    }));
  },

  handleTITChange: (field, value) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'text-image-text': { 
          ...prev.divData['text-image-text'], 
          [field]: value 
        }
      }
    }));
  },

  handleTTIChange: (field, value) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'text-text-image': { 
          ...prev.divData['text-text-image'], 
          [field]: value 
        }
      }
    }));
  },

  // Add more handlers...
};




  const handleSaveSettings = () => {
    axios.put(`http://localhost:5000/api/updateRoom/${room._id}`, {
      name: name,
      frameImage: PFP,
      pronouns: pronouns,
      description: description,
      primary: secondaryColor, 
      secondary: primaryColor,
      bgPrimary: BGprimaryColor,
      bgSecondary: BGsecondaryColor,
      roomConfig: roomConfig,
      renderSnow: renderSnow,
      useHTML: useHTML,
      customHTML: customHTML,
      useBGMusic: useBGMusic,
      bgMusicUrl: bgMusicUrl,
      musicArtist: musicArtist,
      musicName: musicName,
      musicImg: musicImg,
    })
      .then(response => {
        console.log("Successfully updating room:");
    })
      .catch(error => {
        console.error("Error updating room:", error);
    });
  };

  const handleToggleHTML = () => {
    setUseHTML(!useHTML);
  }
  const handleToggleSnow = () => {
    setRenderSnow(!renderSnow);
  }

  const handleToggleMusic = () => {
    setUseBGMusic(!useBGMusic);
  }

  const handleRemoveRoom = () => {
            if (window.confirm('Are you sure you want to delete this room?')) {
              axios.delete(`http://localhost:5000/api/delete/${room._id}`).then(response => {
                  console.log('Room deleted:', response.data);
                  
              })
                  .catch(error => {
                      console.error("Error deleting room:", error);
                      alert('Failed to delete room');
              });
              axios.delete(`http://localhost:5000/api/auth/delete/${room.name}`).then(response => {
                  console.log('Auth deleted: ', response.data)
              })
              .catch(error => {
                      console.error("Error deleting auth:", error);
                      alert('Failed to delete auth');
              })
              handleBackToHallway();
              }
              else {
                return;
              }
  }

  /* ------------------------ DRAGGING LOGIC ------------------------ */
  const [draggedItem, setDraggedItem] = useState(null);

  // pick up an item and start drag
  const handleDragStart = (e, key, source) => {
    console.log('dragstart')
    setDraggedItem({key, source});
    e.dataTransfer.effectAllowed = 'move';
  };

  // while dragging an item over a container
  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  // if you drop a dragged item
  const handleDrop = (e, targetContainer) => {
    // get rid of stupid ass default drop block symbol
    e.preventDefault();
    console.log("drop triggered")

    // edge case to manage if you are stupid and whats dropped is not the proper item
    if (!draggedItem) {
      console.log("returned")
      return;
    }
    // split dragged into its carried key and source
    const {key, source} = draggedItem;


    if (targetContainer === 'enabled') {
      console.log('dropped in enabled')
      // Adding dragged to the enabled divs
      if (source === 'available') {
        setRoomConfig(prev => ({
          ...prev,
          enabledDivs: [...prev.enabledDivs, key]
        }));
      }
    } else if (targetContainer === 'available') {
      console.log('dropped in available')
      // Removing dragged from the enabled divs
      if (source === 'enabled') {
        setSelectedDiv(null);
        setRoomConfig(prev => ({
          ...prev,
          enabledDivs: prev.enabledDivs.filter(divKey => divKey !== key)
        }));
      }
    }
  }

  /* Selection View */
  const [selectedDiv, setSelectedDiv] = useState(null);
  const handleSelectDiv = (e, targetContainer) => {
    if (selectedDiv===targetContainer) {
      setSelectedDiv(null);
      console.log('deselected div')
    }
    else {
      setSelectedDiv(targetContainer)
      console.log('selected div: ' + selectedDiv)
    }
  }

  /* ------------------------ VIEW ------------------------ */
  return (
    <div className="Room">
      <div className="background-custom" />

        {/* Background Music */}
        {useBGMusic && bgMusicUrl && (
          <audio
            src={bgMusicUrl}
            autoPlay
            loop
            volume={musicVolume}
            ref={(audio) => {
              if (audio) audio.volume = musicVolume;
            }}
          />
        )}
        <div className="mp">
          <label className="label">Volume: {(musicVolume * 100).toFixed(0)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={musicVolume}
            onChange={(e) => setMusicVolume(Number(e.target.value))}
            style={{ width: "100%" }}
          />
          <div className="music-row">
            <img 
              className = "music-img"
              src={musicImg}
            />
            <div className="song-artist">
              <label className ="label-song"> {musicName}</label>
              <label className ="label-artist"> {musicArtist}</label>
            </div>

          </div>
          
        </div>

          {/* Header with back button */}
          <div className="header-nav">
            {/* Top right panel*/}
            <button onClick={handleBackToHallway} className="back-to-hallway-btn">
              <Home size={30} />
              Back to Hallway
            </button>
          </div>
          <div className="edit-panel-container">
            <div className="edit-panel-trigger">⚙️</div>  
            <div className="edit-panel">
              <h1 className="profile-editor-text">Profile Editor</h1>
              
              {/* Password Section */}
              {isLoggedIn === false && (
                <div className="logged-out">
                  <div className="pass-info-cont">
                    <label htmlFor="pass-input">Enter Your Passcode:</label>
                    <input
                      type= {passInputVisibility1 ? "text" : "password"}
                      id="pass-input"
                    ></input>
                    <button 
                      className="toggle-roompass"
                      onClick={togglePassInputVisibility1}
                      >
                        {passInputVisibility1 ? <Eye></Eye> : <EyeClosed></EyeClosed>}
                    </button>
                    
                  </div>
                  {/*Enter Passcode Button (send customization data to database)*/}
                  <button className="enter-code-button"
                    onClick={handleLogin}
                  >
                    Enter Password
                  </button>
                </div>
              )}

              {isLoggedIn=== true && (
                <div className="logged-in">
                  {useHTML===false && (
                    <div className="html-toggle">
                    {/* Color pickers for gradient colors */}
                    <div class="plain-line-editor"></div>
                    <h3 className="section-label">Text Gradient</h3>
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
                    <div class="plain-line-editor"></div>
                    <h3 className="section-label">Background Gradient</h3>
                    {/* Color pickers for gradient colors */}
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
                    <div class="plain-line-editor"></div>

                    <h3 className="section-label">Profile Customization</h3>
                    <div className="profile-info-cont">
                      <label className="prof-label" htmlFor="name-input">Name:</label>
                      <input
                        id="name-input"
                        value={name}
                        onChange={handleNameUpdate}
                      >
                      </input>
                      <label className="prof-label" htmlFor="pronoun-input">Pronouns:</label>
                      <input
                        id="pronoun-input"
                        value={pronouns}
                        onChange={handlePronounUpdate}
                      >
                      </input>
                      <label className="prof-label" htmlFor="pfp-input">Profile Picture:</label>
                      <input
                        placeholder='https://example.com/image-link'
                        id="pfp-input"
                        value={PFP}
                        onChange={handlePFPUpdate}
                      >
                      </input>
                      <label className="prof-label" htmlFor="desc-input">Bio/Description:</label>
                      <textarea
                        className="desc-input"
                        placeholder='Enter whatever you would like :)'
                        id="desc-input"
                        value={description}
                        onChange={handleDescUpdate}
                      >
                      </textarea>
                      <label className="prof-label">Background Music URL:</label>
                      <input
                        type="text"
                        placeholder="https://example.com/song.mp3"
                        value={bgMusicUrl}
                        onChange={(e) => setBgMusicUrl(e.target.value)}
                      />
                      <label className="prof-label">Music Icon URL:</label>
                      <input
                        type="text"
                        placeholder="https://example.com/song.png"
                        value={musicImg}
                        onChange={(e) => setMusicImg(e.target.value)}
                      />
                      <label className="prof-label">Song Name:</label>
                      <input
                        type="text"
                        placeholder="Song"
                        value={musicName}
                        onChange={(e) => setMusicName(e.target.value)}
                      />
                      <label className="prof-label">Artist:</label>
                      <input
                        type="text"
                        placeholder="Artist"
                        value={musicArtist}
                        onChange={(e) => setMusicArtist(e.target.value)}
                      />
                    </div>
                    <div class="plain-line-editor"></div>

                    {/* THIS IS WHERE THE DIV ARRAY VIEWER WILL GO */}
                    <h3 className="section-label">Additional Options</h3>
                    <div className="div-editor-container">
                      <div className="sample-container">
                        <h2>Available</h2>
                          <div 
                            className='available-divs'
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'available')}  
                          >


                            {Object.entries(availableDivs).map(([key, value], index) => {   
                              return (
                                <h4 
                                key={key} 
                                className="available" 
                                draggable="true" 
                                onDragStart={(e) => handleDragStart(e, key, 'available')}
                                >
                                  {value.name}
                                </h4>
                              );
                            })}


                          </div>
                        </div>
                      <div className="current-container">
                        <h2>In Use</h2>
                          <div 
                            className='enabled-divs'
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, 'enabled')}
                            style={{ 
                              minHeight: '500px', 
                            }}
                          >


                            {roomConfig.enabledDivs.map((key, index) => {
                              const divInfo = availableDivs[key];

                              const isSelected = (key === selectedDiv)
                              return (
                                <h4 
                                onClick={(e) => handleSelectDiv(e, key)}
                                key={`${key}-${index}`} 
                                className="enabled" 
                                draggable="true" 
                                onDragStart={(e) => handleDragStart(e, key, 'enabled')}
                                style = {{
                                  backgroundColor: isSelected ? "#00000036" : "#ffffff21"
                                }}
                                >
                                  {divInfo?.name}
                                </h4>
                              );
                            })}


                          </div>
                      </div>

                    </div>
                    <div class="plain-line-editor"></div>

                      {/* Render Selected Divs */}
                      {roomConfig.enabledDivs.map((divId, index) => {
                        const isSelected = (divId === selectedDiv);
                        
                        if (!isSelected) return null;
                        
                        const DivEditor = DivEditors[divId];
                        
                        return DivEditor ? (
                          <DivEditor
                            key={`${divId}-${index}`}
                            roomConfig={roomConfig}
                            handlers={handlers}
                          />
                        ) : null;
                        
                      })}
                </div>)}

                {/*Save Button (send customization data to database)*/}
                <h3 className="section-label">Advanced Options</h3>
                <div className="profile-info-cont">
                  <div className="text-row">
                    <h6 className="text-row-text">Remove Room: </h6>
                    <button 
                      className="editor-remove-button"
                      onClick={handleRemoveRoom}
                      >
                        🗑️
                      </button>
                  </div>
                  <div className="text-row">
                    <h6 className="text-row-text">Toggle Snowfall: </h6>
                    <button 
                      className="editor-html-button"
                      onClick={handleToggleSnow}
                      sx={{
                        backgroundColor: renderSnow ? "blue" :"green"
                      }}
                      >
                        {renderSnow ? "✔":"✘"}
                      </button>
                    </div>
                    <div className="text-row">
                    <h6 className="text-row-text">Toggle BG Music: </h6>
                    <button 
                      className="editor-html-button"
                      onClick={handleToggleMusic}
                      sx={{
                        backgroundColor: useBGMusic ? "blue" :"green"
                      }}
                      >
                        {useBGMusic ? "✔":"✘"}
                      </button>
                    </div>
                  <div className="text-row">
                    <h6 className="text-row-text">Use Custom HTML: </h6>
                    <button 
                      className="editor-html-button"
                      onClick={handleToggleHTML}
                      sx={{
                        backgroundColor: useHTML ? "blue" :"green"
                      }}
                      >
                        {useHTML ? "✔":"✘"}
                      </button>
                    </div>
                  { useHTML === true && (
                    <div className="profile-info-cont">
                      <br></br><label className="prof-label" htmlFor="desc-input">Custom HTML:</label>
                      <textarea
                        className="html-input"
                        placeholder='Enter your HTML code here'
                        id="html-input"
                        value={customHTML}
                        onChange={handleCustomHTMLUpdate}
                      >
                      </textarea>

                  </div>)}
                </div>
                <h3 className="section-label">Save Settings</h3>
                <button className="save-button"
                  onClick={handleSaveSettings}
                  >
                    Save Settings
                </button>
              </div>
              )}
            </div>
          </div>



        {/* ------------------------------ Custom HTML iFRAME Below Editor ----------------------------- */}
        {useHTML === true && (
          <iframe 
            className="html-overlay" 
            sandbox="allow-scripts"
            srcDoc={customHTML}
          />
        )}


        {/* --------------------------------- Main Content Display Card -------------------------------- */}
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
                  {name || '[Placeholder]'}
                </GradientText>
                <h2 className="pronouns">
                  {pronouns}
                </h2>
              </div>

              {/* PFP and Desc Base */}
              <div className="rows">
                <div className="section-split">
                  <img className="image"
                    src={PFP}
                    alt="Profile"
                    >
                  </img>
                </div>
                <div className="section-split">
                  <h6 className="description">
                    {description}
                  </h6>
                </div>
              </div>

              {/* Plain Line for Separation */}
              <div class="plain-line"></div>
              {/* Render Selected Divs */}
              {roomConfig.enabledDivs.map((divId, index) => {
                const DivComponent = DivComponents[divId];
                const divData = roomConfig.divData[divId];
                
                if (!DivComponent) return null;
                
                return (
                  <DivComponent
                    key={`${divId}-${index}`}
                    data={divData}
                  />
                );

              })}
          </div>
        </div>
        {renderSnow === true && (
          <Snowfall className="snow"></Snowfall>
        )}
    </div>
  );
}

export default Room;