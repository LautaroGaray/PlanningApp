import React, { useEffect, useState } from 'react';
import SideBar from '../../Components/SideBar.jsx';
import { useNavigate } from 'react-router-dom';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { API_BASE_URL, API_ENDPOINTS_GROUPS, API_ENDPOINTS_TASK } from '/src/Configs.js';
import axios from 'axios';

import '../../css/GroupXTasks.css'
import GroupCard from '../../Components/GroupCard.jsx';
import TaskMinimized from '../../Components/TaskMinimized.jsx';

function GroupXTasks() {
    const endpointConfig = API_ENDPOINTS_GROUPS.find((endpoint) => endpoint.name === 'GetAllGroup').endpoint;
    const endpointConfigTask = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'GetAllTask').endpoint;
    const endpointConfigUpdateTaskGroup =  API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'TaskUpdateGroup').endpoint;
    const [groups, setGroups] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState('');  
    const [filteredGroups, setFilteredGroups] = useState([]); 
     
    const navigate = useNavigate();  
  
    const handleLanding=()=>{
        var local = localStorage.getItem('groupTask');
        if(local){            
            setSelectedGroup(JSON.parse(local));            
            localStorage.removeItem('groupTask');
        }
    }
    const handleCreateGroup = () => {
        navigate('/Groups/CreateGroups');
    }
    const handleAll =()=>{
        navigate('/Groups')
    }

    const handleGroupChange = (event) => {   
       var groupSelected = groups.find(x => x.id === event.target.value);       
        setSelectedGroup(groupSelected);
    }

    const handleSearchChange = (event) => {        
        const searchText = event.target.value.toLowerCase();
        const filteredGroups = groups.filter(group => group.name.toLowerCase().includes(searchText));
        setFilteredGroups(filteredGroups);
    }
    const handleButtonClick = async (taskId) => {            
        if(taskId && selectedGroup){
            await handleUpdateGroup(selectedGroup.id, taskId)   
        }        
       
    };
    const handleUpdateGroup =async (idgroup, id)=>{
        let result = await axios.put(`${API_BASE_URL}${endpointConfigUpdateTaskGroup}?id=${id}&idGroup=${idgroup}`);  
        if(result.status === 200){
            getAllData();         
            localStorage.setItem('groupTask', JSON.stringify(selectedGroup));
            //window.location.reload();
        }
    }


    const getAllData = async()=>{
        try{
            let result = await axios.get(`${API_BASE_URL}${endpointConfig}`);            
            if(result.status === 200){
                setGroups(result.data.Data);
                let tasksResult = await axios(`${API_BASE_URL}${endpointConfigTask}`);               
                if(tasksResult.status === 200){
                    console.log(JSON.stringify(tasksResult.data.Data))
                    setTasks(Array.isArray(tasksResult.data.Data) ? tasksResult.data.Data : []);
                    let newTasks = tasksResult.data.Data.filter(x => x.idGroup == 0 || x.idGroup == '0');       
                    if(Array.isArray(newTasks)){
                        setTasks(newTasks ? newTasks : []);
                    }
                    else if(newTasks){
                        setTasks(newTasks ? [newTasks] : []);
                    }               
                    
                }
            }

        }catch(err){
            console.log(err);
        }
    }    
   
    useEffect(() => {
        getAllData();
        handleLanding();        
     }, []);

    return (
        <>
            <SideBar />
            <div id='title-div-container'>
                <div className='title-div-card'>
                    <div id='title-div-card-label-div' style={{ height: '2rem', width: '4rem', borderRadius: '10px' }} onClick={handleAll}>
                        <CheckCircleIcon />
                        <label id='title-div-card-label'>ALL</label>
                    </div>
                </div>
                <div className='title-div-card'>
                    <div id='title-div-card-label-div' style={{ borderRadius: '10px' }}>
                        <AddCircleIcon />
                        <label id='title-div-card-label'>TASKS</label>
                    </div>
                </div>
                <div className='title-div-card'>
                    <div id='title-div-card-label-div' style={{ borderRadius: '10px' }}>
                        <PlaylistAddCheckIcon />
                        <label id='title-div-card-label'>WITHOUT PROJECT</label>
                    </div>
                </div>
                <div className='title-div-card'>
                    <Button variant="contained" color="primary" id='title-div-card-button' onClick={handleCreateGroup}>
                        CREATE NEW GROUP
                    </Button>
                </div>
            </div>
            <div id='div-filters-groupTasks'>
                <div id='div-filters-groupTasks-title'>
                    Select
                </div>
                <div id='div-filters-groupTasks-ddl'>                
                    <Select
                        labelId="dropdown-label"
                        id="dropdown"
                        value={selectedGroup}                        
                        onChange={handleGroupChange}
                    >                        
                        {Array.isArray(groups) && groups? (
                            groups.map((group) => (
                                <MenuItem key={group.name} value={group.id}>
                                    {group.name}
                                </MenuItem>
                                ))
                        ):(
                            <span></span>
                        )}
                    </Select>
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
            <div id='div-general-content-groupTask'>
                <div className='div-general-content-groupTask-card'>
                            {selectedGroup?(
                                <GroupCard group={selectedGroup} deleteGroup={true}/>
                            ):(
                                <span>No data.. </span>
                            )}
                </div>
                <div className='div-general-content-groupTask-card'>
                    <div id='div-general-content-groupTask-card-tasks'>
                        {Array.isArray(tasks) && tasks.length > 0 ? (
                            tasks.map(t => (
                                <div className='taskxButton'>
                                    <TaskMinimized task={t}/>
                                    <Button onClick={() => handleButtonClick(t.id)}>Add</Button>
                                </div>                                
                            ))
                        ) : (
                            <span>No tasks data...</span>
                        )}
                    </div>                    
                </div>
            </div>
        </>
    );
}

export default GroupXTasks;
