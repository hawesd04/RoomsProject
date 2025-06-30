import './Hallway.css';
import { useState } from 'react';
import { Box, Typography } from '@mui/material'

const Hallway = ({hallwayIndex, doors, hallwayImage}) => {

    const handleDoorSelect = (door) => {
        console.log('selected ' + door.name);
        // will implement routing logic
    };

    const onDoorHover = (door) => {
        console.log('hovering over' + door.name);
    }

    const assets = [
        './HallwayAssets/Hallway1.png',
        './HallwayAssets/Hallway2.png',
        './HallwayAssets/Hallway3.png',
        './HallwayAssets/Hallway4.png',
        './HallwayAssets/Hallway5.png',
        './HallwayAssets/Hallway6.png',
    ];

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