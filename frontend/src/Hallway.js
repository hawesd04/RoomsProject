import './Hallway.css';
import { Box, Typography, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const url = "https://pogchat-suite.onrender.com"
// const localhost = "http://localhost:5000/api/data"

/*
    Hallway Class

    @param hallwayIndex
        the index of the hallway that we are controlling
    @param doors
        the door data of the hallway at curr index
    @param hallwayImage
        the rendered hallway image
*/
const Hallway = ({ devMode, doors, hallwayImage, onUpdateDoor, onRemoveDoor }) => {
    // navigation const (use to navigate routes)
    const navigate = useNavigate();

    // selects and navigates to a doors route
    const handleDoorSelect = (door) => {
        console.log('selected ' + door.name);
        navigate(`/room/${door.name}`, { state: { doorData: door } });
    };

    const handleRemoveRoom = (door) => {

        if (window.confirm('Are you sure you want to delete this door?')) {
            axios.delete(url + `/api/delete/${door._id}`).then(response => {

                console.log('Door deleted:', response.data);
                onRemoveDoor(door._id);
            })
                .catch(error => {
                    console.error("Error deleting door:", error);
                    alert('Failed to delete door');
                });
            }
            axios.delete(url + `/api/auth/delete/${door.name}`).then(response => {
            })
            .catch(error => {
                    console.error("Error deleting auth:", error);
                    alert('Failed to delete auth');
        })
    };

    const handleFrameSwap = (door) => {
        console.log('swapping profile picture for ' + door.name)
        let userInput = prompt("enter a url for the profile image: ")
        const img = new Image();
        img.src = userInput
        img.onload = () => {
            // Dimensions are available here
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            console.log(`Image dimensions: ${width}x${height}`);
            if (width / height !== 1) {
                alert("image dimensions are not 1:1 (square)");
            }
            else {
                // CODE TO PUSH REQUEST NEW IMAGE TO DATABASE

                axios.put(url + `/api/update/${door._id}`, {
                    name: door.name,
                    frameImage: userInput
                })
                    .then(response => {
                        // Use the updated document from the backend response
                        onUpdateDoor(door._id, response.data);
                    })
                    .catch(error => {
                        console.error("Error updating door:", error);
                    });
            }
        };

        img.onerror = function() {
        // This code executes when an error occurs during image loading
        console.error("Image failed to load!");
            axios.put(url + `/api/update/${door._id}`, {
                name: door.name,
                frameImage: "https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg"
            })
            .then(response => {
                // Use the updated document from the backend response
                onUpdateDoor(door._id, response.data);
                })
                    .catch(error => {
                    console.error("Error updating door:", error);
                });
        };
    };

    const handleNameSwap = (door) => {
        console.log('swapping name picture for ' + door.name)
        let userInput = prompt("enter a new name for this room: ")
        if (userInput !== null && userInput !== "") {

            axios.put(url + `/api/update/${door._id}`, {
                name: userInput,
                frameImage: door.frameImage,
            })
                .then(response => {
                    // Use the updated document from the backend response
                    onUpdateDoor(door._id, response.data);
                })
                .catch(error => {
                    console.error("Error updating door:", error);
                });
        }
    }

    // display hallway assets and functionality
    return (
        <Box className="hallways-container">
            <div className="hallways">
                {/* Hallway Render */}
                <img className="hallway-image" src={hallwayImage} alt="hey"></img>
                {/* Doors in the hallway */}
                <div className="doors-container">
                    {doors.map((door, doorIndex) => (
                        <div
                            // displays doors and handles selection
                            key={door.id}
                            className="door"

                        >
                            {/* Remove Button */}
                            {devMode && (
                                <Button
                                    className="remove-button"
                                    onClick={() => handleRemoveRoom(door)}
                                    sx={{
                                        fontSize: 17,
                                        position: 'absolute',
                                        color: 'white',
                                        scale: 1.5,
                                        backgroundColor: '#14142061'
                                    }}
                                >
                                    🗑️
                                </Button>
                            )}
                            {/* User PFP Image */}
                            <img
                                onClick={devMode ? () => handleFrameSwap(door) : null}
                                className='frame-image'
                                src={door.frameImage}
                                alt="hey"
                            />
                            {/* Name Text */}
                            <Typography
                                className='name-text'
                                textAlign={'center'}
                                height={'18%'}
                                onClick={devMode ? () => handleNameSwap(door) : null}
                                sx={{
                                    color: 'white',
                                    textAlign: 'center',
                                    fontSize: door.name.length > 12 ? '20px' :
                                        door.name.length > 7 ? '25px' : '30px',
                                    padding: '0.5rem',
                                    wordWrap: 'break-word',
                                    overflow: 'hidden',
                                }}>
                                {door.name}
                            </Typography>
                            {/* Door Image */}
                            <img
                                className="door-image"
                                src="./HallwayAssets/doorsingle.png"
                                onMouseOver={(e) => devMode ? null : e.target.src = './HallwayAssets/door_open_single1.png'}
                                onMouseOut={(e) => devMode ? null : e.target.src = './HallwayAssets/doorsingle.png'}
                                onClick={devMode ? null : () => handleDoorSelect(door)}
                                alt="hey"
                                style={{
                                    cursor: devMode ? 'not-allowed' : 'pointer',
                                    opacity: devMode ? 0.5 : 1
                                }}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Box>
    );
};

export default Hallway