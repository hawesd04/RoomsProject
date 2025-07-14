import Hallway from './Hallway';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Typography } from '@mui/material';
import './Home.css';

function Home() {

  const arr = [1,2,3,4,5,6,7,8]
  const doors = [
    {id: 1, name: "Dylan", frameImage: "https://pbs.twimg.com/profile_images/1944549213594906624/F-NaDixt_400x400.jpg"},
    {id: 2, name: "Jet", frameImage: "https://pbs.twimg.com/profile_images/1898293802613231616/hKOr1r65_400x400.jpg"},
    {id: 3, name: "Logan", frameImage: "https://pbs.twimg.com/profile_images/1934489235513651202/m7MZGMMs_400x400.jpg"},
    {id: 4, name: "Pix", frameImage: "https://pbs.twimg.com/profile_images/1934499004676808704/oX8TAhxI_400x400.jpg"},
    {id: 5, name: "Grass", frameImage: "https://pbs.twimg.com/profile_images/1908309534977789953/8Y7czFOm_400x400.jpg"},
  ]
  return (
          <div className="App">
            <div className="container">
              <h2>
                Pogchat House
              </h2>
              <Hallway
                hallwayImage={"./HallwayAssets/Hallway1.png"}
                doors={doors}
                hallwayIndex={0}
                />
              <Hallway
                hallwayImage={"./HallwayAssets/Hallway2.png"}
                doors={doors}
                hallwayIndex={0}
                />
                      <Hallway
                hallwayImage={"./HallwayAssets/Hallway3.png"}
                doors={doors}
                hallwayIndex={0}
                />
              <Hallway
                hallwayImage={"./HallwayAssets/Hallway4.png"}
                doors={doors}
                hallwayIndex={0}
                />
                        <Hallway
                hallwayImage={"./HallwayAssets/Hallway5.png"}
                doors={doors}
                hallwayIndex={0}
                />
              <Hallway
                hallwayImage={"./HallwayAssets/Hallway6.png"}
                doors={doors}
                hallwayIndex={0}
                />
                        <Hallway
                hallwayImage={"./HallwayAssets/Hallway1.png"}
                doors={doors}
                hallwayIndex={0}
                />
              <Hallway
                hallwayImage={"./HallwayAssets/Hallway2.png"}
                doors={doors}
                hallwayIndex={0}
                />
            </div>
          </div>
  );
}

export default Home;
