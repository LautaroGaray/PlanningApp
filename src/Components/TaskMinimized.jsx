import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

//MUI
import AssignmentIcon from '@mui/icons-material/Assignment';
import FlagIcon from '@mui/icons-material/Flag';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';

//Components
import Agents from './Agents.jsx';

//css
import '../css/GroupCard.css'

import ColorService from '../../dist/Logics/ColorsService.js'



function TaskMinimized({task}){
const [badgeColor, setBadgeColor]= useState('');
const [flagColor, setFlagColor] = useState('');



        const handleStatusColor = (status)=>{            
            let colorService = new ColorService();
            let result = colorService.GetStatus(status);                    
            setBadgeColor(result);             
        }

        const handleFlagColor = (priority)=>{
            let colorService = new ColorService();
            let result = colorService.GetPriority(priority);                    
            setFlagColor(result.FlagColor);         
        }

        useEffect(() => {
            handleStatusColor(task.status);
            handleFlagColor(task.priority)
          }, [])

    return(
        <>
        <div id='card-content-body'>
             <div id='div-genetal-container-data-group'style={{borderColor:flagColor?flagColor:'black'}}>
                <div id='div-general-conainer-title-group'>
                    <AssignmentIcon />
                    <Typography variant="subtitle2" style={{ fontWeight: 'bold', color: 'black' }}>
                    {task.id} - {task.name}
                    </Typography>                     
                </div>
                <div id='div-general-container-body-group'>
                    <FlagIcon style={{color:flagColor}}/>
                     <Badge
                        color={badgeColor}
                        badgeContent={task.status === '99+'?100:task.status}
                        overlap="circular"                       
                        sx={{ cursor: 'pointer' }}   
                        >
                        <span style={{ visibility: 'hidden' }}>{task.status}</span>
                    </Badge>                      
                     <Agents agent={task.agent}/>        
                </div>
            </div>
        </div>
        </>
    )
}

export default TaskMinimized;