import SideBar from '../Components/SideBar.jsx';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS_GROUPS } from '/src/Configs.js';
import axios from 'axios';

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

//Css
import '../css/Groups.css'

function Groups(){
    const navigate = useNavigate();
    const [groupsData, setGroupsData] = useState([])
    const endpointConfig = API_ENDPOINTS_GROUPS.find((endpoint) => endpoint.name === 'GetAllGroup').endpoint;

    const handleCreateGroup =() =>{
        navigate('/Groups/CreateGroups')
    }
    const handleTaskGroup =()=>{
        navigate('/Groups/ManageTasks')
    }
    const getAllData = async()=>{
        try{
            let result = await axios.get(`${API_BASE_URL}${endpointConfig}`);            
            if(result.status === 200){
                console.log(JSON.stringify(result.data.Data))
                setGroupsData(result.data.Data);
            }
        }catch(err){
            console.log(err);
        }
    }

    
    useEffect(() => {
         getAllData();
      }, []);

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
            <div id='title-div-card-label-div'  style={{  borderRadius: '10px'}} onClick={handleTaskGroup}>
                <AddCircleIcon/>
                <label id='title-div-card-label'>TASKS</label>
            </div>
            </div>
            <div className='title-div-card'>
            <div id='title-div-card-label-div'   style={{ borderRadius: '10px'}}>
                <PlaylistAddCheckIcon />
                <label id='title-div-card-label'  >WHITOUT PROJECT</label>
            </div>
            </div>
            <div className='title-div-card'>
            <Button variant="contained" color="primary" id='title-div-card-button' onClick={handleCreateGroup}>
                CREATE NEW GROUP
            </Button>
            </div>
        </div>
        <div>
               <br></br> 
               <br></br> 
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
            {Array.isArray(groupsData) && groupsData?( 
                groupsData.map(group =>                      
                   <div id='card-group-general'>                    
                     <GroupCard group={group}/>
                   </div>
                )
           
            ):(<span></span>)}
           
        </div> 
    </>
    )
}

export default Groups;