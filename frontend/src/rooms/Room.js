import './Room.css';
import GradientText from '../assets/GradientText'
import { Button, Typography } from '@mui/material'
import { Home } from 'lucide-react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

function Room() {
  const navigate = useNavigate();

  const location = useLocation();
  const room = location.state?.doorData;

  console.log(room);

  const handleBackToHallway = () => {
    navigate('/');
  };
  return (
    <div className="Room">
          {/* Header with back button */}
          <div className="header-nav">
            <button onClick={handleBackToHallway} className="back-to-hallway-btn">
              <Home size={50} />
              Back to Hallway
            </button>
        </div>
        <div className="main-content">
          <div className="main-card">
            <div className="rows">
                <GradientText
                  fontSize={50}
                  colors={["#ff7640ff", "#fff940ff", "#ff7640ff"]}
                  animationSpeed={3}
                  showBorder={false}
                
                  className="gradient-text"
                >
                  {room.name}
                </GradientText>
                <h2>
                  He / Him
                </h2>
              
              </div>
              <div className="rows">
                <div className="section-split">
                  <img className="image"
                    src={room.frameImage}
                    >
                  </img>
                </div>
                <div className="section-split">
                  <h6>
                    Textfield
                  </h6>
                </div>

              </div>

              <div className="rows">

                
              </div>

              <div className="rows">

                
              </div>

          </div>
        </div>
    </div>
  );
}

export default Room;
