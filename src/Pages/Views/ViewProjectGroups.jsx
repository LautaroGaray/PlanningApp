import SideBar from '/src/Components/SideBar.jsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

//MUI
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Typography from '@mui/material/Typography';

//Component
import GroupCard from '/src/Components/GroupCard.jsx'
import ProjectMinimized from '/src/Components/ProjectMinimized.jsx';
import { API_BASE_URL, API_ENDPOINTS_TASK, API_ENDPOINTS_GROUPS, API_ENDPOINTS_PROJECTS } from '/src//Configs.js';

function ViewProjectGroups(){
    const navigate = useNavigate();
  const endpointConfig = API_ENDPOINTS_PROJECTS.find(
    (endpoint) => endpoint.name === 'GetAllProjectGroups'
  ).endpoint;
  const [allProjects, setallProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [selectedName, setSelectedName] =useState('none')
  const [groups, setGroups]=useState([]);
  const [projectColor, setProjectColor] = useState('white');

  const checkSelectedProject= async ()=>{
    let project = localStorage.getItem('Project')
    if(project){            
        let parsed = JSON.parse(project);      
        localStorage.removeItem('Project');         
        setSelectedProject(parsed);          

        //cargar datos del project y todos los groups    
        setSelectedName(parsed.pName);
        setProjectColor(parsed.pColor);
        getProjectGroups(parsed.pName);
    }
  }
  const getProjectGroups = async(projectName)=>{
    if(!selectedProject){
        return;
    }    
        try{
            let result = await axios.get(
                `${API_BASE_URL}${endpointConfig}?projectName=${projectName}`
            );
                console.log(JSON.stringify(result));
            if(result.status != 200){
                alert(result);
                return;
            }
            setGroups(result.data.Data);
        }
        catch(err){
            console.log(JSON.stringify(err))
            alert(JSON.stringify(err));
        }
    }
    
    
const handleAll=()=>{   
    navigate('/Projects')
}
  const handleCreateProject = ()=>{    
    navigate('/Projects/CreateProject');
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
    checkSelectedProject();
  }, [])
    return(
    <>
        <SideBar/>
        <div id='title-div-container'>
        <div className='title-div-card'>
          <div id='title-div-card-label-div' className=''  onClick={handleAll}
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
      <h2 style={{marginLeft:'1rem'}}>{selectedName}</h2>  
      <div id='filters-div-container-projectsGroups' style={{
        background: `linear-gradient(${projectColor}, rgba(255, 255, 255, 1)), ${projectColor}`,
        height:'60vh',
        display:'flex',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',    
        overflow:'scroll'  
           
        }}>
            
        {Array.isArray(groups) && groups?( 
                    groups.map(group =>                      
                    <div id='card-group-general'>                    
                        <GroupCard group={group}/>
                    </div>
                    )
            
                ):(<span>whitout groups</span>)}
        </div>
        <div id='filters-div-container-projectsNoGroups'>

        </div>       
      </div>        
    </>
    )

}

export default ViewProjectGroups;