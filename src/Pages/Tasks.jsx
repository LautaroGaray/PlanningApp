import React, { useEffect, useState } from 'react';
import SideBar from '../Components/SideBar.jsx';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Badge from '@mui/material/Badge';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import FlagIcon from '@mui/icons-material/Flag';
import ClearIcon from '@mui/icons-material/Clear';
import '@mui/material/styles';
import { API_BASE_URL, API_ENDPOINTS_TASK } from '../Configs.js';
import axios from 'axios';
import '../css/Task.css';
import Agent from '../Components/Agents.jsx'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Input from '@mui/material/Input';
import '@mui/material/styles';
import ApiService from '../../public/Logics/ApiService.js'
import EditableCell from '../Components/EditableCell.jsx';
import AgentCard from '../Components/AgentCard.jsx'
import LocalStorage from '../../dist/Logics/LocalStorage.js';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import TaskMedia from '../Components/TaskMedia.jsx';
import Typography from '@mui/material/Typography';
import '../css/Generals.css'
import { color, height } from '@mui/system';

function Tasks() {
  const navigate = useNavigate();
  const [arrayTasks, setArrayTasks] = useState([]);
  const uniqueAgents = [...new Set(arrayTasks.map((task) => task.agent))];
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState();
  const [selectedArrayTask, setSelectedArrayTask]=useState([])  
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedTaskIdForPriority, setSelectedTaskIdForPriority] = useState(null);
    //gestionar el menú desplegable
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [open, setOpen] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [descriptionFilter, setDescriptionFilter] = useState('');
  const [openFilter, setOpenFilter]=useState(false);
  const [allFIlter, setAllFilter] = useState(null);
  

  const endpointConfig = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'GetAllTask').endpoint;
  const endpointConfigStatus = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'TaskUpdateStatus').endpoint;
  const endpointConfigDelete = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'DeleteTask').endpoint;
  const endpointConfigDescription= API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'TaskUpdateDescription').endpoint;
  const endpointConfigPriority = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'TaskUpdatePriority').endpoint;
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const fetchData = async (endpoint) => {   
    console.log(API_BASE_URL,endpointConfig)
    try{
      let apiService = new ApiService();
      let result =  await axios.get(`${API_BASE_URL}${endpointConfig}`);      
    //let result = await apiService.GetData(API_BASE_URL,endpointConfig);  
    
     setArrayTasks(result.data.Data)

    }catch(err){
      console.log(err);
    }
    
  };
  const updateStatus = async (actualId, newStatus) => {   
    let apiService = new ApiService();
    let result = await apiService.PutData(API_BASE_URL,`${endpointConfigStatus}?id=${actualId}&status=${newStatus}`)
    if(result){
      fetchData(endpointConfig);
      handleClose();
    }
  };
  const updatePriority = async (actualId, priority) => {  
    
    let apiService = new ApiService();
    let result = await apiService.PutData(API_BASE_URL, `${endpointConfigPriority}?id=${actualId}&priority=${priority}`)
    fetchData(endpointConfig);
    
  };
  const deleteStatus = async(actualId)=>{   
    let apiService = new ApiService();
    let result = await apiService.Delete(API_BASE_URL,`${endpointConfigDelete}?id=${actualId}`)
    if(result){
      fetchData(endpointConfig);
    }
  }

  

  const headers = [
    { label: '', attribute: 'icon' },
    { label: 'ID Group', attribute: 'idGroup' },
    { label: 'ID Project', attribute: 'idProject' },
    { label: 'ID', attribute: 'id' },
    { label: 'Name', attribute: 'name' },
    { label: 'Description', attribute: 'description' },
    { label: 'Status', attribute: 'status' },
    { label: 'Priority', attribute: 'priority' },
    { label: 'Date Add', attribute: 'dateAdd' },
    { label: 'Date Modified', attribute: 'dateModified' },
    { label: 'Agent', attribute: 'agent' },
    { label: '', attribute: 'deleteIcon' }, // Nueva columna para el icono de eliminar
  ];

  const getStatusColor = (status) => {
    const numericStatus = parseInt(status, 10);    
    if (numericStatus >= 0 && numericStatus < 20) {
      return 'blue-cell'; 
    } else if (numericStatus >= 20 && numericStatus <= 60) {
      return 'red-cell'; 
    } else if (numericStatus > 60 && numericStatus <= 100) {
      return 'green-cell'; 
    } else {
      return 'default-cell'; 
    }
  };

  const  handleDescriptionSave = async(taskId, newDescription)=>{
    let data ={
      id: parseInt(taskId),
      Description: newDescription,
      Status:0
    }
    
    let apiService = new ApiService();
    let result = await apiService.PutDataWhitBody(API_BASE_URL,`${endpointConfigDescription}`, data)
  }
  const handleCreateNewTaskClick = () => {
    navigate('/Tasks/CreateTask');
  };

  const handleDeleteTaskClick = (taskId) => {
    deleteStatus(taskId);
  };
  const handleTaskClose = async (taskId, status) => {
    try {
       updateStatus(taskId, status == 100?0:100)      
    } catch (error) {
      console.error('Error al cerrar la tarea:', error);
    }
  };
 
  const handleAssigmentRow = async () => {
   
  }
  const handleAssignmentIconClick = async(taskId) => {      
   let localStorage = new LocalStorage();
   return await localStorage.SaveOrClearItem(taskId,taskId);
  };
  const handlePrioritySelect = async (priority) => {
    setSelectedPriority(priority);
    await updatePriority(selectedTaskIdForPriority, priority); 
    handlePriorityClose();
  };

  const handlePriorityClick = (event, task) => {   
    console.log('TASK'+task)
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
    setSelectedTaskIdForPriority(task.id); 
  };

  const handlePriorityClose = () => {
    setAnchorEl(null);
  };
  const getPriorityBadge = (priority) => {    
    let badgeColor, borderColor, flagColor;
    const trimmedPriority = priority.trim().toUpperCase();
    switch (trimmedPriority) {
      case 'LOW':
        badgeColor = 'blue';
        borderColor = '#2196F3'; // Azul
        flagColor = '#2196F3'; // Azul
        break;
      case 'NORMAL':
        badgeColor = 'yellow';
        borderColor = '#FFEB3B'; // Amarillo
        flagColor = '#FFEB3B'; // Negro
        break;
      case 'HIGH':
        badgeColor = 'red';
        borderColor = '#FF5722'; // Rojo
        flagColor = '#FF5722'; // Rojo
        break;
      case 'URGENT':
        badgeColor = 'maroon';
        borderColor = '#800000'; // Borgoña
        flagColor = '#800000'; // Borgoña
        break;
      default:
        badgeColor = 'default';
        borderColor = 'transparent';
        flagColor = 'transparent';
    }
  
    return (
      <Badge
        color={badgeColor}
        variant="dot"
        sx={{
          border: `2px solid ${borderColor}`,
          borderRadius: '50%',
          height: 20,
          width: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <FlagIcon style={{ fontSize: 16, color: flagColor }} />
      </Badge>
    );
  };
  const getStatusColorBadge = (status) => {
    const numericStatus = parseInt(status, 10);
    if (numericStatus >= 0 && numericStatus < 20) {
      return 'primary'; // Azul
    } else if (numericStatus >=20 && numericStatus <= 60) {
      return 'error'; // Rojo
    }else if (numericStatus > 60 && numericStatus <= 100) {
      return 'success'; // Verde
    } else {
      return 'default'; // Color por defecto
    }
  };
  const handleStatusEdit = async () => {    
    const numericStatus = parseInt(newStatus, 10);
    if (!isNaN(numericStatus) && numericStatus >= 0 && numericStatus <= 100) {
      await updateStatus(selectedTaskId, numericStatus);
      handleClose();
    } else {
      alert('Please enter a valid number between 0 and 100.');
    }
  };
  const handleConfirmDialogClose = () => {
    setConfirmDialogOpen(false);
  };

  const handleConfirm = async () => {       
    updateStatus(selectedTaskId, 100)    
    handleConfirmDialogClose();    
  };

  const handleClickOpen = (task) => {
    console.log('TASK'+task)
    setSelectedTaskId(task);   
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNameFilterChange = (event) => {
    setNameFilter(event.target.value);
  };

  const handleDescriptionFilterChange = (event) => {
    setDescriptionFilter(event.target.value);
  };
const handleTaskOpen =() =>{
  setOpenFilter(true)
  setAllFilter(false)
}
const handleTaskComplete = ()=>{
  setOpenFilter(false)
  setAllFilter(false)
}
const handleAllTask = ()=>{
  console.log(allFIlter)
  setAllFilter(true)

}
  const applyFilters = (tasks) => {
    return tasks.filter(
      (task) =>      
        task.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
        task.description.toLowerCase().includes(descriptionFilter.toLowerCase()) &&
        (!allFIlter ? (openFilter?task.status<100:task.status>=100):task.status >= 0)
    );   
  };

  useEffect(() => {
    fetchData(endpointConfig);
    setAllFilter(true);    
  }, []);

  return (
    <>
      <SideBar />
      <div id='title-div-container'>
        <div className='title-div-card'>
          <div id='title-div-card-label-div' className={allFIlter?'red-gradient-xl':''}
            style={{height:'2rem', width:'4rem',  borderRadius: '10px'}}
            onClick={handleAllTask}
          >
            <CheckCircleIcon style={{color:allFIlter?'white':'black'}}/>
            <label id='title-div-card-label' style={{color:allFIlter?'white':'black'}}>ALL</label>
          </div>
        </div>
        <div className='title-div-card'>
          <div id='title-div-card-label-div' onClick={()=>handleTaskOpen()} className={openFilter && !allFIlter?'red-gradient-xl':''} style={{  borderRadius: '10px'}}>
            <AddCircleIcon style={{color:openFilter && !allFIlter?'white':'black'}}/>
            <label id='title-div-card-label'  style={{color:!allFIlter && openFilter?'white':'black'}}>OPEN</label>
          </div>
        </div>
        <div className='title-div-card'>
          <div id='title-div-card-label-div' onClick={()=> handleTaskComplete()} className={!openFilter && !allFIlter?'red-gradient-xl':''} style={{ borderRadius: '10px'}}>
            <PlaylistAddCheckIcon style={{color:!openFilter && !allFIlter?'white':'black'}}/>
            <label id='title-div-card-label'  style={{color:!allFIlter && !openFilter?'white':'black'}}>COMPLETED</label>
          </div>
        </div>
        <div className='title-div-card'>
          <Button variant="contained" color="primary" id='title-div-card-button' onClick={handleCreateNewTaskClick}>
            CREATE NEW TASK
          </Button>
        </div>
      </div>
      <div id='filters-div-container'>        
        <div id="filters-title">Search</div>
        <div id="filters-container">
          <TextField
            className='filters-container-input'
            label="Name..."
            value={nameFilter}
            onChange={handleNameFilterChange}
            variant="outlined"
            margin="dense"           
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" >
                  <SearchIcon color="action" />
                </InputAdornment>
              ),             
            }}
          />
          <TextField
            className='filters-container-input'
            label="Description..."
            value={descriptionFilter}
            onChange={handleDescriptionFilterChange}
            variant="outlined"
            margin="dense"
            borderRadius="30px"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          </div>
        </div>
        <div id='intro-task-div-general'>          
            <div id='intro-task-div'>                      
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }} id='intro-task-title'>
                Task
              </Typography>
            </div>     
            <div id='intro-task-div-red-band'></div>
        </div>             
     <div id='div-general-container-all'>
        <div id='div-general-container-data'>          
            <AgentCard uniqueAgents={uniqueAgents}/>
            <TaskMedia tasks={applyFilters(arrayTasks)} />
        </div>           
        <div id='div-general-container'>        
          <Paper>
            <Table>
              <TableHead>
                <TableRow className="table-header">
                <TableCell></TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Date Add</TableCell>
                  <TableCell>Date Modified</TableCell>
                  <TableCell>Agent</TableCell>
                  <TableCell>Actions</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>             
              <TableBody>
                {arrayTasks && Array.isArray(arrayTasks) && arrayTasks.length > 0 ? (
                  applyFilters(arrayTasks).map((item) => (
                    <TableRow
                      key={item.id}
                      className={`table-row ${selectedArrayTask.some(x => x === item.id) ? 'selected-row' : ''}`}
                      onClick={() => handleAssignmentIconClick(item.id)}
                    >                    
                      <TableCell> <AssignmentIcon /></TableCell>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell><EditableCell
                        initialValue={item.description}
                        onSave={(editedValue) => handleDescriptionSave(item.id, editedValue)}
                      /></TableCell>
                      <TableCell className={getStatusColorBadge(item.status)}>
                            {/*{item.status}%*/}
                            <Tooltip title={`Click to edit status`} arrow>
                              <Badge
                                color={getStatusColorBadge(item.status)}
                                badgeContent={item.status === '99+'?100:item.status}
                                overlap="circular"
                                onClick={() => handleClickOpen(item.id)}
                                sx={{ cursor: 'pointer' }}
                              >
                                <span style={{ visibility: 'hidden' }}>{item.status}</span>
                              </Badge>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                cursor: 'pointer',
                              }}
                              onClick={(event) => handlePriorityClick(event, item)}
                            >
                          {getPriorityBadge(item.priority)}
                          <div
                            style={{
                              height:20,
                              marginLeft: 8,
                              borderRadius: 5,
                              padding: '5px 8px',
                              backgroundColor:
                                item.priority === 'LOW'
                                  ? '#2196F3'
                                  : item.priority === 'NORMAL'
                                  ? '#FFEB3B'
                                  : item.priority === 'HIGH'
                                  ? '#FF5722'
                                  : item.priority === 'URGENT'
                                  ? '#800000'
                                  : 'transparent',
                              color: 'white',
                            }}
                          >
                            {item.priority}
                          </div>
                        </div>
                        {/* Menú desplegable para la prioridad */}
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handlePriorityClose}>
                          {['LOW', 'NORMAL', 'HIGH', 'URGENT'].map((priorityOption) => (
                            <MenuItem key={priorityOption} onClick={() => handlePrioritySelect(priorityOption)}>
                              {getPriorityBadge(priorityOption)}
                              <div
                                style={{
                                  marginLeft: 8,
                                  borderRadius: 5,
                                  padding: '5px 8px',
                                  backgroundColor:
                                    priorityOption === 'LOW'
                                      ? '#2196F3'
                                      : priorityOption === 'NORMAL'
                                      ? '#FFEB3B'
                                      : priorityOption === 'HIGH'
                                      ? '#FF5722'
                                      : priorityOption === 'URGENT'
                                      ? '#800000'
                                      : 'transparent',
                                  color: 'white',
                                }}
                              >
                                {priorityOption}
                              </div>
                            </MenuItem>
                          ))}
                        </Menu>
                      </TableCell>
                      <TableCell>{item.dateAdd}</TableCell>
                      <TableCell>{item.dateModified}</TableCell>
                      <TableCell><Agent  agent={item.agent} /></TableCell>
                      <TableCell>
                        <ButtonGroup variant="contained" aria-label="outlined primary button group">
                            <Button
                              variant="contained"
                              color={item.status === 100 || item.status === "100" ? 'success' : 'primary'}
                              sx={{
                                borderRadius:'30px',
                                cursor: 'pointer',
                                padding: '10px',
                                height: '20px',
                                '&:hover': {
                                  backgroundColor: item.status === 100 || item.status === "100" ? '#45a049' : '#001f3f',
                                },
                              }}
                              onClick={() => handleTaskClose(item.id, item.status)}
                            >
                              {item.status === 100 || item.status === "100" ? 'Open' : 'Close'}
                        </Button>                      
                        </ButtonGroup>
                      </TableCell>
                      <TableCell>
                      <Button onClick={() => handleDeleteTaskClick(item.id)}>
                             <ClearIcon />
                          </Button> 
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={9}>No data available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Paper>
        </div>
      </div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Status</DialogTitle>
        <DialogContent>
          <label>New Status:</label>
          <Input
            type="number"
            inputProps={{ min: 0, max: 100 }}
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleStatusEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* Agrega el cuadro de diálogo de confirmación para status*/}
      <Dialog open={confirmDialogOpen} onClose={handleConfirmDialogClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <div>Are you sure you want to close this task?</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="primary">
            No
          </Button>
          <Button onClick={handleConfirm} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    
    </>
  );
}

export default Tasks;
