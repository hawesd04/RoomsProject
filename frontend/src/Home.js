import Hallway from './Hallway';
import axios from "axios";
import { useState, useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Typography } from '@mui/material';
import './Home.css';

function Home() {

  const [initialDoors, setInitialDoors] = useState('');  

  useEffect(() => {
    axios.get("http://localhost:5000/api/data")
    .then(response => {
      setInitialDoors(response.data);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                />
                ))}
            </div>
          </div>
  );
}

export default Home;
