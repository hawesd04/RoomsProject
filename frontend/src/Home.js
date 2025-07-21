import Hallway from './Hallway';
import axios from "axios";
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Button, Typography } from '@mui/material'
import './Home.css';

function Home() {

  const [initialDoors, setInitialDoors] = useState('');  
  const [devMode, setDevMode] = useState(false);
  const [correctPass, setCorrectPass] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
    .then(response => {
      setInitialDoors(response.data);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        // pix if you see this thats really damn funny lmao
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

  
  const handleCreateRoom = () => {
  }



  function chunkArray(arr, chunkSize) {
    const chunks = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      const chunk = arr.slice(i, i + chunkSize);
      chunks.push(chunk);
    }
    return chunks;
  }
  const doorsInHall = chunkArray(initialDoors, 5)
  console.log(doorsInHall)



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
                  hallwayIndex={index}
                  devMode={devMode}
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
