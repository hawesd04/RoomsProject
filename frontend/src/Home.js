import Hallway from './Hallway';
import axios from "axios";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Typography } from '@mui/material'
import VariableProximity from './assets/VariableProximity';
import Snowfall from 'react-snowfall'
import './Home.css';

const url = "https://pogchat-suite.onrender.com"
const localhost = "http://localhost:5000/api/data"
/*
  Website Homepage, this is where you view the hallways and all parts of the web page!
  This is essentially "the top" of the program, the file highest up in the heirarchy,
  besides App which just holds the routes.

  Includes the text at the top labeled 'Pogchat House'
  Then an array map of hallway objects (Object Oriented Programming) each
  containing 5 of the doors from the database

  The database array is spliced into sets of 5 doors and they're sent individually
  into each hallway. The number of hallways increases with number of doors in the database.

  DevMode useState boolean toggles devmode options like image editing, text editing, and data removal
  CorrectPass useState boolean saves that you entered the correct password once, so you don't have to
  enter it every time you toggle devmode afterwards.
*/
function Home() {

  // States are a type of variable in React that hold and modify constants (Data that cannot change)
  // the data itself is the first (blue) variable, and the method to update it is the second (yellow) 
  // the initial state of value of that variable is defined in useState([CONTENTS])

  // For instance, the initial state of the doors is an empty string
  // the initial state of devMode is FALSE, so its off by default
  const [initialDoors, setInitialDoors] = useState('');  
  const [devMode, setDevMode] = useState(false);
  const [correctPass, setCorrectPass] = useState(false);

  const [musicVolume, setMusicVolume] = useState(0.10);
  const root = document.documentElement;
  root.style.setProperty('--Secondary-color', "#af1c3cff");

  const navigate = useNavigate();

  /*
    Grabs the data from the database and sets the initial door list with each door
  */
  useEffect(() => {
    axios.get(url + `/api/data`)
    .then(response => {
      setInitialDoors(response.data);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  /*
    Sends the updated data back to the backend from wherever this
    method is called from. Basically, if you update a name or profile picture,
    the updated version is sent here and populated properly from the top down.

    This method is called deeper in hallway.js and others to update content
    in the backend
  */
  const updateDoor = (doorID, updatedData) => {
      setInitialDoors(newDoors => 
          newDoors.map(door => 
              door._id === doorID 
                  ? { ...door, ...updatedData }
                  : door
          )
      );
  };

  const removeDoor = (doorID) => {
    setInitialDoors(newDoors =>
      newDoors.filter(door => door._id !== doorID)
    );
  };


  /*
    Toggles on and off Dev Mode!

    Includes passcode system
  */
  const handleDevModeToggle = async () => {
    if (correctPass === true) {
      if (devMode === true) {
        setDevMode(false);
      }
      else {
        setDevMode(true);
      }
    }
    else {
      let userInput = prompt("Enter the dev passcode: ");
      if (userInput !== null && userInput !== "") {
        try {
        const response = await fetch(url + `/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
            body: JSON.stringify({ 
              name: "master",
              enteredPass: userInput  
            }),
          });

          if(!response.ok) {
            alert('incorrect dev password');
            return;
          }
          else {
            setDevMode(true)
            setCorrectPass(true)
          }
        }
        catch (error) {
          console.error('devmode login failed: ', error)
          return;
        }
      }
      else {
        alert("you did not enter a passcode");
      }
    }
  };


  // const handleRemModeToggle = () => {
  // }

  /*
    Method that will reroute to the room creator whenever I make it
  */
  const handleCreateRoom = () => {
    //NAVIGATE TO room-creator
    console.log('creating new room');
    navigate(`/create-new`);
  }

  const handleHome = () => {
    //NAVIGATE TO home
    console.log('navigating home');
    navigate(`/`);
  }

  const handleAbout = () => {
    //NAVIGATE TO /about
    console.log('navigating to about');
    navigate(`/about`);
  }


  // Splits the door array into defined chunks
  function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }

  // calls chunkarray with size of 5, (5 doors per hallway)
  const doorsInHall = chunkArray(initialDoors, 5)

  const containerRef = useRef(null);

  /* 
  RETURN METHOD for HOME 
  
  Everything the user can VISUALLY see in the frontend. 
  */
  return (
    
          <div className="home-container">
            <div className="background" />
            {/* Background Music */}
            <audio
              src={"https://files.catbox.moe/5tdluv.mp3"}
              autoPlay
              loop
              volume={musicVolume}
              ref={(audio) => {
                if (audio) audio.volume = musicVolume;
              }}
            />
          <div className="mp-home">
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
          </div>
            <div className="container">
              <div className="menu-bar">
                <div className="menu-left">
                  <Button
                      className ="button"
                      onClick={handleHome}
                      sx={{ 
                          width: 30,
                          color: 'white',
                          scale: 1.5,
                          textTransform: 'none',
                          fontSize: 14,
                          backgroundColor: '#ffffff00'
                      }}
                      >
                          Home
                  </Button>
                  <Button
                      className ="button"
                      onClick={handleAbout}
                      sx={{ 
                          width: 40,
                          color: 'white',
                          scale: 1.5,
                          textTransform: 'none',
                          fontSize: 14,
                          backgroundColor: '#ffffff00'
                      }}
                      >
                          About
                  </Button>
                </div>
                <div className = "menu-right">
                  <Button
                      className ="button"
                      onClick={handleDevModeToggle}
                      sx={{ 
                          width: 150,
                          color: 'white',
                          scale: 1.5,
                          textTransform: 'none',
                          fontSize: 14,
                          backgroundColor: devMode ? 'green' : '#ffffff00'
                      }}
                      >
                          Toggle Developer
                  </Button>
                  
                  <Button
                      className ="button"
                      onClick={handleCreateRoom}
                      sx={{ 
                          width: 150,
                          color: 'white',
                          scale: 1.5,
                          textTransform: 'none',
                          fontSize: 14,
                          backgroundColor: '#ffffff00'
                      }}
                      >
                          Create New Room
                  </Button>
                </div>
              </div>
              <div className="webpage-title-cont"
                ref={containerRef}
                style={{position: 'relative'}}
                >
                  <VariableProximity
                    label={'Welcome to The Hotel!'}
                    className={'webpage-title'}
                    fromFontVariationSettings="'wght' 600, 'opsz' 12"
                    toFontVariationSettings="'wght' 1200, 'opsz' 40"
                    containerRef={containerRef}
                    radius={200}
                    falloff='linear'
                  />
                </div>
              <div className="hallways-home-cont">
                {doorsInHall.map((hall, index) => (
                  <Hallway
                    hallwayImage={`./HallwayAssets/Hallway${index + 1}.png`}
                    doors={hall}
                    devMode={devMode}
                    onUpdateDoor={updateDoor}
                    onRemoveDoor={removeDoor}
                  />
                  ))}
                </div>
            </div>
            <Snowfall className="snow"></Snowfall>
          </div>
  );
}

export default Home;
