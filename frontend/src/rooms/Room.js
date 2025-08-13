import './Room.css';
import GradientText from '../assets/GradientText';
import { Button, Typography } from '@mui/material';
import { Home } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

  root.style.setProperty('--BG-primary-color', BGprimaryColor);
  root.style.setProperty('--BG-secondary-color', BGsecondaryColor);

  // console.log('Room data:', room);
  // console.log('Primary color from room:', room?.assets?.textGradColors?.primary);
  // console.log('Secondary color from room:', room?.assets?.textGradColors?.secondary);

  // TESTING FULL DIV SETUP

  /* 
    Base room config state. Holds the configuration of the entire room beyond pfp
    and description.
  */

  const [roomConfig, setRoomConfig] = useState({
    enabledDivs: ['wide-text'],
    divData: {
      'wide-text': {
        text: 'Wide Text Customization',
      }
    }
  });

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

  /* 
    Div Components is a variable that stores the existance of "divs" that I have
    Labeled and preset with css formatting. This is to allow users to pick and choose
    How to represent their information on the webpage. PART OF VIEW
  */
  const DivEditors = {
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
        <div className="profile-info-cont">
          <label htmlFor="widetext-input">Wide Text:</label>
          <textarea
            className="widetext-input"
            placeholder='Enter whatever you would like :)'
            id="widetext-input"
            value={roomConfig.divData['wide-text']?.text || ''}
            onChange={handleWideTextChange}
          />
        </div>
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

  // Handle background primary and secondary
  const handleBGPrimColorChange = (e) => {
    setBGPrimaryColor(e.target.value);
  };

  const handleBGSecColorChange = (e) => {
    setBGSecondaryColor(e.target.value);
  };

  // ALL OF THE EVENT HANDLERS FOR DIV EDITOR!!!! (A LOT OF THEM)

  const handleWideTextChange = (e) => {
    setRoomConfig(prev => ({
      ...prev,
      divData: {
        ...prev.divData,
        'wide-text': {
          ...prev.divData['wide-text'],
          text: e.target.value
        }
      }
    }));
  }




  const handleSaveSettings = (event) => {
    axios.put(`http://localhost:5000/api/updateRoom/${room._id}`, {
      name: name,
      frameImage: PFP,
      pronouns: pronouns,
      description: description,
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

  /* ------------------------ DRAGGING LOGIC ------------------------ */
  // const draggables = document.querySelectorAll('.available');
  // const containers = document.querySelectorAll('.current-container', '.sample-container');

  // draggables.forEach(draggable => {
  //   draggable.addEventListener('dragstart', () => {
  //     draggable.classList.add('dragging')
  //   })

  //   draggable.addEventListener('dragend', () => {
  //     draggable.classList.remove('dragging')
  //   })
  // })

  // containers.forEach(container => {
  //   container.addEventListener('dragover', () => {
  //     const draggable = document.querySelector('.dragging')
  //     console.log(/*I need the name of the draggable to insert into the enabledDivs*/)
  //   })
  // })

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
    if (!draggedItem) return;

    // split dragged into its carried key and source
    const {key, source} = draggedItem;

    if (targetContainer === 'enabled') {
      // Adding dragged to the enabled divs
      if (source === 'available') {
        setRoomConfig(prev => ({
          ...prev,
          enabledDivs: [...prev.enabledDivs, key]
        }));
      }
    } else if (targetContainer === 'available') {
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

              {/* Color pickers for gradient colors */}
              <h1 className="profile-editor-text">Profile Editor</h1>
              <div class="plain-line-editor"></div>
              <h3 className="text-grad-text">Text Gradient</h3>
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
              <h3 className="bg-grad-text">Background Gradient</h3>
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

              <h3 className="profile-custom">Profile Customization</h3>
              <div className="profile-info-cont">
                <label htmlFor="name-input">Name:</label>
                <input
                  id="name-input"
                  value={name}
                  onChange={handleNameUpdate}
                >
                </input>
                <label htmlFor="pronoun-input">Pronouns:</label>
                <input
                  id="pronoun-input"
                  value={pronouns}
                  onChange={handlePronounUpdate}
                >
                </input>
                <label htmlFor="pfp-input">Profile Picture:</label>
                <input
                  placeholder='https://website.com/image-link'
                  id="pfp-input"
                  value={PFP}
                  onChange={handlePFPUpdate}
                >
                </input>
                <label htmlFor="desc-input">Bio/Description:</label>
                <textarea
                  className="desc-input"
                  placeholder='Enter whatever you would like :)'
                  id="desc-input"
                  value={description}
                  onChange={handleDescUpdate}
                >
                </textarea>
              </div>
              <div class="plain-line-editor"></div>

              {/* THIS IS WHERE THE DIV ARRAY VIEWER WILL GO */}
              <h3 className="profile-custom">Additional Options</h3>
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
                const DivEditor = DivEditors[divId];
                const divData = roomConfig.divData[divId];
                
                const isSelected = (divId===selectedDiv)
                
                return (
                  isSelected ? (
                  <DivEditor
                    key={`${divId}-${index}`}
                    data={divData}
                  /> ) : null
                );
              })}


              {/*Save Button (send customization data to database)*/}
              <button className="save-button"
                onClick={handleSaveSettings}
              >
                Save Settings
              </button>
            </div>
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
    </div>
  );
}

export default Room;