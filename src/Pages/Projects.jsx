import SideBar from '../Components/SideBar.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//MUI
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';

//Component
import ProjectMinimized from '../Components/ProjectMinimized.jsx';
import { API_BASE_URL, API_ENDPOINTS_TASK, API_ENDPOINTS_GROUPS, API_ENDPOINTS_PROJECTS } from '../Configs.js';

function Projects(){
  const navigate = useNavigate();
  const endpointConfig = API_ENDPOINTS_PROJECTS.find(
    (endpoint) => endpoint.name === 'GetAllProject'
  ).endpoint;
  const [allProjects, setallProjects] = useState([]);
  const projectTest ={
    idProject:0,
    projectName:'Name',
    projectColor:'black'
  }

  const handleCreateProject = ()=>{
    navigate('/Projects/CreateProject');
  }

  const handleProjectGroups = ()=>{
    navigate('/Projects/ProjectsGroups')
  }

  const getAllProjects = async()=>{
    try{
      const response = await axios.get(
        `${API_BASE_URL}${endpointConfig}`        
      );
      if (response.status === 200) {
        console.log()
        setallProjects(response.data.Data);
      } else if (response.status === 400) {
       alert(response.status);
      } else {
        alert('Error en la solicitud: Estado HTTP ' + response.status);
      }

    }catch(err){
      alert(err);
    }
  }

  useEffect(()=>{
    getAllProjects();
  }, [])
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
          <div id='title-div-card-label-div'  className='' style={{  borderRadius: '10px'}} onClick={handleProjectGroups}>
            <AddCircleIcon style={{color:'black'}}/>
            <label id='title-div-card-label'  style={{color:'black'}}>GROUPS</label>
          </div>
        </div>      
        <div className='title-div-card'  onClick={handleCreateProject}>
          <Button variant="contained" color="primary" id='title-div-card-button'>
            CREATE NEW PROJECT
          </Button>
        </div>
      </div>
      <div id='intro-task-div-general'>          
            <div id='intro-task-div' style={{marginTop:'30px'}}>                      
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }} id='intro-task-title'>
                Projects
              </Typography>
            </div>     
            <div id='intro-task-div-red-band'></div>
        </div>         
      <div id='filters-div-container'> 
      {/* Iterar sobre allProjects y crear un componente ProjectMinimized por cada uno */}
      {allProjects.map((project) => (
          <ProjectMinimized            
            projectName={project.projectName}
            projectColor={project.projectColor}
          
          />
        ))}       
       
      </div>        
    </>
    )
}

export default Projects;