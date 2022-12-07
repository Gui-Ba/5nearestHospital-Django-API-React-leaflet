import React, { Component,useState } from 'react';
import {Button, TextField, Box, Container} from '@mui/material';
import './App.css';
import MyMap from './Components/Maps'


const App = () => {

    const [dataLatLng, setDataLatLng] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");

    const parentToChild = () => {
      setDataLatLng({lat,lng});
    }
    const handleSubmit = (e) => {
      parentToChild()
      e.preventDefault();
      console.log(`coordonnées passée`); 
  }

    return (
      
      <Container maxWidth="sm">
        <h2> 5 hopitaux les plus proches</h2>
        <h4> Paris : latitude = 48.866667    longitude = 2.333333 </h4>
        <h4> Strasbourg : latitude =  48.5734053    longitude = 7.7521113 </h4>
        <Box component="form"
               sx={{'& .MuiTextField-root': { m: 1, width: '25ch' }}} onSubmit = {handleSubmit}  >
        <TextField  label="Latitude" onChange = {(e) => setLat(e.target.value)} value = {lat}></TextField> 
        <TextField label="Longitude" onChange = {(e) => setLng(e.target.value)} value = {lng}></TextField>
        <Button variant="contained" type = 'submit'>Chercher  </Button>
        </Box>
         
       

        <MyMap parentToChild={dataLatLng} />;
       </Container>
    )
    
  }



export default App;
