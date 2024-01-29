import SideBar from '../Components/SideBar.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

//MUI
import '@mui/material/styles';
import { color, height } from '@mui/system';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TaskMedia from '../Components/TaskMedia.jsx';
import Typography from '@mui/material/Typography';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FlagIcon from '@mui/icons-material/Flag';
import ClearIcon from '@mui/icons-material/Clear';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//Component
import GroupCard from '../Components/GroupCard.jsx'

function Groups(){
    return(
    <>
        <SideBar />
        <div id='title-div-container'>
            <div className='title-div-card'>
            <div id='title-div-card-label-div' 
                style={{height:'2rem', width:'4rem',  borderRadius: '10px'}}
            
            >
                <CheckCircleIcon />
                <label id='title-div-card-label'>ALL</label>
            </div>
            </div>
            <div className='title-div-card'>
            <div id='title-div-card-label-div'  style={{  borderRadius: '10px'}}>
                <AddCircleIcon/>
                <label id='title-div-card-label'>WIHT PROJECT</label>
            </div>
            </div>
            <div className='title-div-card'>
            <div id='title-div-card-label-div'   style={{ borderRadius: '10px'}}>
                <PlaylistAddCheckIcon />
                <label id='title-div-card-label'  >WHITOUT PROJECT</label>
            </div>
            </div>
            <div className='title-div-card'>
            <Button variant="contained" color="primary" id='title-div-card-button'>
                CREATE NEW GROUP
            </Button>
            </div>
        </div>
        <div id='intro-task-div-general'>          
            <div id='intro-task-div'>                      
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }} id='intro-task-title'>
                Groups
              </Typography>
            </div>     
            <div id='intro-task-div-red-band'></div>
        </div>  
        <div id='div-content-general'>
            <GroupCard/>
        </div> 
    </>
    )
}

export default Groups;