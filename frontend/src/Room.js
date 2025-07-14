import './Room.css';
import { Button, Typography } from '@mui/material'
import { useNavigate, useNavigation } from 'react-router-dom';

function Room() {
  const navigate = useNavigate();

  const handleBackToHallway = () => {
    navigate('/');
  };
  return (
    <div className="Room">
        <div className="header">
            <Typography
            fontSize={30}
            sx={{
                color: 'white',
            }}>
                Temporary Placeholder (smile)
            </Typography>
            <Button
                className ="button"
                onClick={handleBackToHallway}
                sx={{ 
                    mt: 2,
                    width: 100,
                    color: 'white',
                    backgroundColor: '#141420'
                }}
                >
                    Back to Hallway
            </Button>
        </div>
    </div>
  );
}

export default Room;
