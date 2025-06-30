import Hallway from './Hallway';
import { Typography } from '@mui/material';
import './App.css';

function App() {

  const arr = [1,2,3,4,5,6,7,8]
  const doors = [
    {id: 1, name: "Dylan", frameImage: "frame1.png"},
    {id: 2, name: "Jet", frameImage: "frame2.png"},
    {id: 3, name: "Logan", frameImage: "frame3.png"},
    {id: 4, name: "Pix", frameImage: "frame4.png"},
    {id: 5, name: "Grass", frameImage: "frame5.png"},
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

export default App;
