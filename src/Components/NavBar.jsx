import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import EventNoteIcon from '@mui/icons-material/EventNote';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import plogo from '../Images/plogo.jpg'
import { borderRadius, height } from '@mui/system';
const NavBar = () => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleMenuClick = () => {
    setCalendarOpen(!calendarOpen);
  };

  const handleDateChange = (date) => {
    // Aquí puedes manejar la lógica cuando la fecha cambia
    console.log('Nueva fecha seleccionada:', date);
    setCalendarOpen(false);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#212121' }}>
        <Toolbar onClick={handleMenuClick}>
          <IconButton edge="start" color="inherit" aria-label="menu" >
            <MenuIcon />
          </IconButton>
          <EventNoteIcon style={{ marginRight: '10px', fontSize: '2rem', color: 'white' }} />
          <div style={{ flexGrow: 1 }} id='none'/>
          {/*<Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>
            Planning Manager
           </Typography>*/}
           <img src={plogo} alt='Logo' style={{height:'4rem' , borderRadius:'50px'}}></img>
        </Toolbar>
      </AppBar>

      {calendarOpen && (
        <div style={{ position: 'absolute', top: '80px', right: '20px', zIndex: 1 }}>
          <DatePicker selected={new Date()} onChange={handleDateChange} />
        </div>
      )}
    </>
  );
};

export default NavBar;
