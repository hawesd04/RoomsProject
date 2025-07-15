import Hallway from './Hallway';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Typography } from '@mui/material';
import './Home.css';

function Home() {

  const arr = [1,2,3,4,5,6,7,8]
  const initialDoors = [
    {id: 1, name: "Dylan", frameImage: "https://pbs.twimg.com/profile_images/1944815664855711745/4XjudRZF_400x400.jpg"},
    {id: 2, name: "Jet", frameImage: "https://pbs.twimg.com/profile_images/1898293802613231616/hKOr1r65_400x400.jpg"},
    {id: 3, name: "Logan", frameImage: "https://pbs.twimg.com/profile_images/1934489235513651202/m7MZGMMs_400x400.jpg"},
    {id: 4, name: "Pix", frameImage: "https://pbs.twimg.com/profile_images/1934499004676808704/oX8TAhxI_400x400.jpg"},
    {id: 5, name: "Grass", frameImage: "https://pbs.twimg.com/profile_images/1908309534977789953/8Y7czFOm_400x400.jpg"},
    {id: 6, name: "Leah", frameImage: "https://pbs.twimg.com/profile_images/1934212733987426304/Kquvecal_400x400.jpg"},
    {id: 7, name: "Nick", frameImage: "https://pbs.twimg.com/profile_images/1921558507758690304/5EId1kyd_400x400.jpg"},
    {id: 8, name: "Will", frameImage: "https://pbs.twimg.com/profile_images/1940904137035558912/-jLaSiHg_400x400.jpg"},
    {id: 9, name: "Travis", frameImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMA0IzyE9eaVhP-_WElH_cAKVJ6dkU8w4_7w&s"},
    {id: 10, name: "Eli", frameImage: "https://pbs.twimg.com/profile_images/1923140412719452160/8k7MIDgL_400x400.jpg"},
    {id: 11, name: "April", frameImage: "https://pbs.twimg.com/profile_images/1848669429053136896/5Qf8j5Zg_400x400.jpg"},
    {id: 12, name: "Naomi", frameImage: "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"},
    {id: 13, name: "Alex", frameImage: "https://pbs.twimg.com/profile_images/1945143961984647168/oRxs60o1_400x400.jpg"},
  ]
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
