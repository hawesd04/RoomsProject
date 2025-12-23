import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import axios from 'axios';
import './Home.css';

function About() {

  const navigate = useNavigate();

  const handleBackToHallway = () => {
    console.log('Navigating back to hallway');
    navigate(`/`);
  };

  return (
    <div className="temp">
        <background></background>
        {/* Header with back button */}
        <div className="header-nav">
            <button onClick={handleBackToHallway} className="back-to-hallway-btn">
            <Home size={50} />
            Back to Hallway
            </button>
        </div>

        <div className="about-cont">=
            <h2>pogchat 🔥🔥💯</h2>
            <img
                src={"./pogfish_transparent.png"}
            >
            </img>
        </div>
    </div>
  );
}

export default About;