import Hallway from './Hallway';
import axios from "axios";
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Button, Typography } from '@mui/material'
import './Home.css';
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

  /*
    Grabs the data from the database and sets the initial door list with each door
  */
  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
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
  const updateDoor = (doorId, updatedData) => {
      setInitialDoors(prevDoors => 
          prevDoors.map(door => 
              door._id === doorId 
                  ? { ...door, ...updatedData }
                  : door
          )
      );
  };


  /*
    Toggles on and off Dev Mode!

    Includes passcode system
  */
  const handleDevModeToggle = () => {
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
        if (userInput == "temp") {
          setDevMode(true);
          setCorrectPass(true);
        }
        else {
          alert("incorrect passcode");
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
  console.log(doorsInHall)


  /* 
  RETURN METHOD for HOME 
  
  Everything the user can VISUALLY see in the frontend. 
  */
  return (
          <div className="App">
            <div className="container">
              <h2>
                Pogchat House
              </h2>
              {doorsInHall.map((hall, index) => (
                <Hallway
                  hallwayImage={`./HallwayAssets/Hallway${index + 1}.png`}
                  doors={hall}
                  devMode={devMode}
                  onUpdateDoor={updateDoor}
                />
                ))}
              <div className='lower-row'>
                <Button
                    className ="button"
                    onClick={handleDevModeToggle}
                    sx={{ 
                        mt: 2,
                        width: 100,
                        color: 'white',
                        scale: 1.5,
                        backgroundColor: devMode ? 'green' : '#141420'
                    }}
                    >
                        Toggle DevMode
                </Button>
                <Button
                    className ="button"
                    onClick={handleCreateRoom}
                    sx={{ 
                        mt: 2,
                        width: 100,
                        color: 'white',
                        scale: 1.5,
                        backgroundColor: '#141420'
                    }}
                    >
                        Create New Room
                </Button>
                {/* <Button
                    className ="button"
                    onClick={handleRemModeToggle}
                    sx={{ 
                        mt: 2,
                        width: 100,
                        color: 'white',
                        scale: 1.5,
                        backgroundColor: '#141420'
                    }}
                    >
                        Remove Room
                </Button> */}
              </div>
            </div>
          </div>
  );
}

export default Home;
