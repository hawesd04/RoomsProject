const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Doormodel = require('./doormodel');

// Initialize express app
const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

mongoose.connect(`mongodb+srv://hawesd04:nPut8NB01gOFe0Vt@roomsproject.o9axxi1.mongodb.net/RoomData`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log(`Connection to database RoomsProject successful`);
  return mongoose.connection.db.listCollections().toArray();
})
.catch(error => {
  console.error('Database connection error:', error);
});

// Migrate old data with new datapoints when necessary
// visit localhost:5000/api/migrate to trigger changes in database
app.get('/api/migrate', async (req, res) => {
  try {
    const result = await Doormodel.updateMany(
      { assets: { $exists: true } },
      { 
        $set: { 
          "assets": {
            "pronouns": "he/him",
            "description": "[placeholder]",
            "textGradColors": {
              "primary": "#ffffff",
              "secondary": "#777777"
            }
          }
        }
      }
    );
    
    res.json({ 
      success: true, 
      message: `Updated ${result.modifiedCount} documents` 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// API routes -------------------------------------------------------------------------------------------
const router = express.Router();
app.use('/api', router);

// Get all doors from the database ----------------------------------------------------------------------
router.get('/data', async (req, res) => {
    try {
      console.log("Get request for all data");
      const data = await Doormodel.find({});
      res.status(200).json(data);
    } 
    catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ message: error.message });
    }
});


// Update a DOOR in the backend ----------------------------------------------------------------
router.put('/update/:id', async (req, res) => {
  console.log('Route /update/:id has been registered');
  console.log('PUT /update/:id route hit with ID:', req.params.id);
  console.log('Request body:', req.body);

  try {
    const { id } = req.params;
    const { name, frameImage} = req.body;
    
    console.log("Attempting to update with:", { name, frameImage});
    
    // actually update one of the instances in the collection
    const result = await Doormodel.updateOne(
      { _id: id },
      { 
        $set: {
          'name': name,
          'frameImage': frameImage,
        }
      }
    );

    console.log("Update result:", result);
    
    // Fetch updated
    const updatedCollection = await Doormodel.findById(id);
    
    console.log("Updated document:", updatedCollection);
    res.status(200).json(updatedCollection);
  } 
  catch (error) 
  {
    console.error("Error updating collection:", error);
    res.status(500).json({ message: error.message });
  }
});



// Update a ROOM in the backend ----------------------------------------------------------------
router.put('/updateRoom/:id', async (req, res) => {
  console.log('Route /updateRoom/:id has been registered');
  console.log('PUT /updateRoom/:id route hit with ID:', req.params.id);
  console.log('Request body:', req.body);

  try {
    const { id } = req.params;
    const { name, frameImage, pronouns, primary, secondary, bgPrimary, bgSecondary, description, roomConfig} = req.body;
    
    console.log("Attempting to update with:", { primary, secondary, bgPrimary, bgSecondary, pronouns, description, roomConfig});
    
    // actually update one of the instances in the collection
    const result = await Doormodel.updateOne(
      { _id: id },
      { 
        $set: {
          'name': name,
          'frameImage': frameImage,
          'assets': {
            'pronouns': pronouns,
            'description': description,
            textGradColors: {
              primary: primary,
              secondary: secondary
            },
            bgGradColors: {
              primary: bgPrimary,
              secondary: bgSecondary
            }
          },
          'roomConfig': roomConfig  
        }
      }
    );

    console.log("Update result:", result);
    
    // Fetch updated
    const updatedCollection = await Doormodel.findById(id);
    
    console.log("Updated document:", updatedCollection);
    res.status(200).json(updatedCollection);
  } 
  catch (error) 
  {
    console.error("Error updating collection:", error);
    res.status(500).json({ message: error.message });
  }
});



// Delete a door in the backend ----------------------------------------------------------------
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log("Attempting to delete door with ID:", id);
    
    // Delete a door in the collection
    const result = await Doormodel.deleteOne({ _id: id });
    
    console.log("Delete result:", result);
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Door not found' });
    }
    
    res.status(200).json({ 
      message: 'Door deleted successfully',
      deletedId: id 
    });
  } 
  catch (error) {
    console.error("Error deleting door:", error);
    res.status(500).json({ message: error.message });
  }
});


// Create a door in the backend ----------------------------------------------------------------
router.post('/create', async (req, res) => {
  try {
    const { name, frameImage, pronouns, primary, secondary, bgPrimary, bgSecondary, description} = req.body;
    
    console.log("Attempting to create door with:", { name, frameImage });
    
    // Create new door object
    const newDoor = new Doormodel({
      name: name || 'New Room', // Default name if not provided
      frameImage: frameImage || 'https://www.wolflair.com/wp-content/uploads/2017/01/placeholder.jpg', // Default image if not provided
      assets: {
        pronouns: pronouns || 'they/them',
        description: description || '[placeholder]',
        textGradColors: {
          primary: primary || '#ffffff',
          secondary: secondary || '#777777'
        },
        bgGradColors: {
          primary: bgPrimary || '#1f2257',
          secondary: bgSecondary || '#1e1f31'
        }
      }
    });
    
    // Save to database
    const savedDoor = await newDoor.save();
    
    console.log("Created door:", savedDoor);
    
    res.status(201).json(savedDoor);
  } 
  catch (error) {
    console.error("Error creating door:", error);
    res.status(500).json({ message: error.message });
  }
});


// Start the server --------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Backend server running on port: ${port}`);
});