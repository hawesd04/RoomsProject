import './Hallway.css';
import { useState } from 'react';
import { Box, Typography } from '@mui/material'
import { useNavigate, useNavigation } from 'react-router-dom';
/*
    Hallway Class

    @param hallwayIndex
        the index of the hallway that we are controlling
    @param doors
        the door data of the hallway at curr index
    @param hallwayImage
        the rendered hallway image
*/
const Hallway = ({hallwayIndex, doors, hallwayImage}) => {
    // navigation const (use to navigate routes)
    const navigate = useNavigate();

    // selects and navigates to a doors route
    const handleDoorSelect = (door) => {
        console.log('selected ' + door.name);
        navigate(`/room/${door.id}`);
    };

    // door hover listener
    const onDoorHover = (door) => {
        console.log('hovering over' + door.name);
    }

    // display hallway assets and functionality
    return(
        <Box>
            <div className="hallways">
                {/* Hallway Render */}
                <img className="hallway-image" src={hallwayImage}></img>
                {/* Doors in the hallway */}
                <div className="doors-container">
                    {doors.map((door, doorIndex) => (
                        <div
                            // displays doors and handles selection
                            key={door.id}
                            className="door"
                            onClick={() => handleDoorSelect(door)}
                        >   {/* User PFP Image */}
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