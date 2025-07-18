import React, { useState } from 'react';
import { Button, Card, TextField, Typography } from '@mui/material';
import axios from 'axios'; // To make HTTP requests

function BattalionEntry() {
  // Define state variables for each field
  const [battalionId, setBattalionId] = useState('');
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [headquarters, setHeadquarters] = useState('');
  const [colonel, setColonel] = useState('');
  const [numberOfSoldiers, setNumberOfSoldiers] = useState('');

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Prepare the data to be sent to the backend
      const battalionData = {
        battalion_id: battalionId,
        name: name,
        location: location,
        headquarters: headquarters,
        colonel: colonel,
        number_of_soldiers: numberOfSoldiers,
      };
  
      // Send a POST request to the backend
      const response = await axios.post('http://localhost:3000/manager/addBattalion', battalionData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
  
      // Handle the response
      if (response.status === 200) {
        alert('Battalion added successfully!');
        // Optionally clear the form after successful submission
        setBattalionId('');
        setName('');
        setLocation('');
        setHeadquarters('');
        setColonel('');
        setNumberOfSoldiers('');
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate entry
        alert('Battalion with this ID already exists!');
      } else {
        console.error('Error submitting the form:', error);
        alert('Error adding the battalion');
      }
    }
  };
  

  return (
    <div className="entry-container">
      <Typography variant="h3" gutterBottom>
        Enter the Battalion Details Here
      </Typography>

      <Card variant="outlined" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
        <TextField
          label="Battalion ID"
          variant="outlined"
          fullWidth
          value={battalionId}
          onChange={(e) => setBattalionId(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Location"
          variant="outlined"
          fullWidth
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Headquarters"
          variant="outlined"
          fullWidth
          value={headquarters}
          onChange={(e) => setHeadquarters(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Colonel"
          variant="outlined"
          fullWidth
          value={colonel}
          onChange={(e) => setColonel(e.target.value)}
          style={{ marginBottom: '10px' }}
        />
        <TextField
          label="Number of Soldiers"
          variant="outlined"
          fullWidth
          value={numberOfSoldiers}
          onChange={(e) => setNumberOfSoldiers(e.target.value)}
          style={{ marginBottom: '20px' }}
        />

        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          fullWidth
        >
          Submit
        </Button>
      </Card>
    </div>
  );
}

export default BattalionEntry;
