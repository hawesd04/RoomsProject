import './Hallway.css';
import { useState } from 'react';
import { Box, Typography } from '@mui/material'

const Hallway = ({rooms, isLatest}) => {

    const assets = [
        './HallwayAssets/Hallway1.png',
        './HallwayAssets/Hallway2.png',
        './HallwayAssets/Hallway3.png',
        './HallwayAssets/Hallway4.png',
        './HallwayAssets/Hallway5.png',
        './HallwayAssets/Hallway6.png',
    ];

    const bg = Math.floor(rooms.length/5);
    const numDoors = Math.floor(rooms.length%5)
    console.log("bg index set to:" + bg);
    console.log("remainder set to:" + numDoors);

    return(
        <Box>
            <div className="hallways">
                <img className="hallway-image" src={assets[bg]}></img>
                <img className="door-image" src={"./HallwayAssets/door.png"}></img>
            </div>
        </Box>
    );
};

export default Hallway