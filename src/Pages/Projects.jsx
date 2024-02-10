import SideBar from '../Components/SideBar.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//MUI
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';

//Component
import ProjectMinimized from '../Components/ProjectMinimized.jsx';
import { API_BASE_URL, API_ENDPOINTS_TASK, API_ENDPOINTS_GROUPS, API_ENDPOINTS_PROJECTS } from '../Configs.js';

function Projects(){

  const projectTest ={
    idProject:0,
    projectName:'Name',
    projectColor:'black'
  }
    return(
    <>
        <SideBar/>
        <div id='title-div-container'>
        <div className='title-div-card'>
          <div id='title-div-card-label-div' className='red-gradient-xl'
            style={{height:'2rem', width:'4rem',  borderRadius: '10px'}}
            
          >
            <CheckCircleIcon style={{color:'white'}}/>
            <label id='title-div-card-label' style={{color:'black'}}>ALL</label>
          </div>
        </div>
        <div className='title-div-card'>
          <div id='title-div-card-label-div'  className='red-gradient-xl' style={{  borderRadius: '10px'}}>
            <AddCircleIcon style={{color:'black'}}/>
            <label id='title-div-card-label'  style={{color:'black'}}>GROUPS</label>
          </div>
        </div>      
        <div className='title-div-card'>
          <Button variant="contained" color="primary" id='title-div-card-button'>
            CREATE NEW PROJECT
          </Button>
        </div>
      </div>
      <div id='filters-div-container'>        
        <ProjectMinimized projectName = {'Name'} projectColor={'yellow'} idProject={1}/>
      </div>
        
        
    </>
    )
}

export default Projects;