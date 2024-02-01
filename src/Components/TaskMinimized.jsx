import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS_GROUPS, API_ENDPOINTS_TASK } from '/src/Configs.js';

// MUI
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

import axios from 'axios';


// Components
import Agents from './Agents.jsx';

// CSS
import '../css/GroupCard.css';

import ColorService from '../../public/Logics/ColorsService.js';

function TaskMinimized({ task , deleteGroup = false, group = null}) {
  const [badgeColor, setBadgeColor] = useState('');
  const [flagColor, setFlagColor] = useState('');
  const [showDescription, setShowDescription] = useState(false);
  const endpointConfigUpdateTaskGroup =  API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'TaskUpdateGroup').endpoint;

  const handleStatusColor = (status) => {
    let colorService = new ColorService();
    let result = colorService.GetStatus(status);
    setBadgeColor(result);
  };

  const handleFlagColor = (priority) => {
    let colorService = new ColorService();
    let result = colorService.GetPriority(priority);
    setFlagColor(result.FlagColor);
  };

  const showDescriptionPopup = () => { 
    setShowDescription(true);   
  };

  const hideDescriptionPopup = () => {
    setShowDescription(false);
  };
const onClickGroupDelete = async(taskId)=>{
  if(deleteGroup){
      let result = await axios.put(`${API_BASE_URL}${endpointConfigUpdateTaskGroup}?id=${taskId}&idGroup=${0}`);  
      if(result.status === 200){    
        if(group){
          localStorage.setItem('groupTask',JSON.stringify(group) )  
        }            
          window.location.reload();
      }
  }
}
  useEffect(() => {
    handleStatusColor(task.status);
    handleFlagColor(task.priority);
  }, []);

  return (
    <>
      <div id='card-content-body'>
        <div id='div-genetal-container-data-group' style={{ borderColor: flagColor ? flagColor : 'black' }}>
          <div id='div-general-conainer-title-group'>
            <AssignmentIcon onClick={showDescriptionPopup} style={{cursor:'pointer'}}/>
            <Typography variant="subtitle2" style={{ fontWeight: 'bold', color: 'black' }}>
              {task.id} - {task.name}
            </Typography>
          </div>
          <div id='div-general-container-body-group'>
            <FlagIcon style={{ color: flagColor }} />
            <Badge
              color={badgeColor}
              badgeContent={task.status === '99+' ? 100 : task.status}
              overlap="circular"
              sx={{ cursor: 'pointer' }}
            >
              <span style={{ visibility: 'hidden' }}>{task.status}</span>
            </Badge>
            <Agents agent={task.agent} />    
            <div id='delete-group'>
              {deleteGroup?
                ( <Button onClick={() => onClickGroupDelete(task.id)}>
                    <ClearIcon />
                  </Button> 
                ):(
                  <span></span>
                  )}   
            </div>                 
            <div>                       
          </div>
          </div>
        </div>
      </div>
      <Dialog open={showDescription} onClose={hideDescriptionPopup} >
        <div>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: 'black' }}>
            {task.id} - {task.name}
          </Typography>
          <Typography variant="body1" style={{ color: 'black' }}>
            {task.description}
          </Typography>
          <Button onClick={hideDescriptionPopup} color="primary">
            OK
          </Button>
        </div>
      </Dialog>
    </>
  );
}

export default TaskMinimized;
