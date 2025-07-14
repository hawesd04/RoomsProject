import './Hallway.css';
import { useState } from 'react';
import { Box, Typography } from '@mui/material'
import { useNavigate, useNavigation } from 'react-router-dom';

const Hallway = ({hallwayIndex, doors, hallwayImage}) => {
    const navigate = useNavigate();

    const handleDoorSelect = (door) => {
        console.log('selected ' + door.name);
        navigate(`/room/${door.id}`);
    };

    const onDoorHover = (door) => {
        console.log('hovering over' + door.name);
    }

    return(
        <Box>
            <div className="hallways">
                <img className="hallway-image" src={hallwayImage}></img>
                <div className="doors-container">
                    {doors.map((door, doorIndex) => (
                        <div
                            key={door.id}
                            className="door"
                            onClick={() => handleDoorSelect(door)}
                        >
                            <img
                                className='frame-image'
                                src={door.frameImage}
                            />
                            <img 
                                className="door-image" 
                                src="./HallwayAssets/doorsingle.png"
                                onMouseOver={(e) => e.target.src = './HallwayAssets/door_open_single1.png'}
                                onMouseOut={(e) => e.target.src = './HallwayAssets/doorsingle.png'}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default Hallway