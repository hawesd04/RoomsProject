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


// Update the collection in the backend ----------------------------------------------------------------
router.put('/update/:id', async (req, res) => {
  console.log('Route /update/:id has been registered');
  console.log('PUT /update/:id route hit with ID:', req.params.id);
  console.log('Request body:', req.body);

  try {
    const { id } = req.params;
    const { name, frameImage} = req.body;
    
    console.log("Attempting to update with:", { name, frameImage});
    
    // Update using updateOne
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




// Start the server --------------------------------------------------------------------------------------------
app.listen(port, () => {
  console.log(`Backend server running on port: ${port}`);
});