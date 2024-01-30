import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS_TASK, API_ENDPOINTS_GROUPS } from '/src/Configs.js';

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import ClearIcon from '@mui/icons-material/Clear';

//Components
import TaskMinimized from './TaskMinimized';
import { color } from '@mui/system';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GroupCard({group, deleteGroup = false}) {
  const endpointConfigDeleteGroups = API_ENDPOINTS_GROUPS.find((endpoint) => endpoint.name === 'DeleteGroup').endpoint; 
  const endpointConfig = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'GetTaskByGroup').endpoint;
  const [isContentVisible, setIsContentVisible] = useState(false);  
  const [arrayTasks, setArrayTasks] =useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');  
  const navigate = useNavigate();

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };
 
  const handleArrayTasks = async()=>{
      try{
        let request ={
          idGroup:  group.id
        }        
        let result = await axios.get(`${API_BASE_URL}${endpointConfig}?idGroup=${group.id}`)
        if(result.status === 200){
          setArrayTasks(result.data.Data);
        }
      }catch(err){

      }
  }
  const handleDeleteGroup = async () => {    
    setDialogTitle('Delete group');
    setDialogContent('Are you sure you want to delete this group?');
    setDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      let result = await axios.delete(
        `${API_BASE_URL}${endpointConfigDeleteGroups}?idGroup=${group.id}`
      );     
      if (result.status !== 200) {
        handleError('Cannot delete group');
      } else {
        handleSuccess('Group deleted');
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    } finally {      
      setDialogOpen(false);
    }
  };
  const handleSuccess = (message) => {
    setDialogTitle('Success');
    setDialogContent(message);
    setDialogOpen(true);
  };

  const handleError = (message) => {
    setDialogTitle('Error');
    setDialogContent(message);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleTitleClick =()=>{
      localStorage.setItem('groupTask', JSON.stringify(group));
      navigate('/Groups/ManageTasks')
  }

  useEffect(() => {   
    handleArrayTasks();
    return () => {    
      
    };
  }, );

  return (
    <>
      <div style={{marginTop:'10px'}}>
        <Card
          id="div-general-container-data-group"
          style={{
                   
          }}        
        >
          <CardContent>
            <div id="card-content-group">
              <div id="card-content-title-group" onClick={handleTitleClick}>
                <Typography
                  variant="h8"
                  style={{ fontWeight: 'bold', color: 'black' }}
                >
                  {group.name?`${group.id} - ${group.name} `:'No name'}
                </Typography>
              </div>
              <div
                id="card-content-body"
                style={{ display: isContentVisible ? 'block' : 'none' }}
              >
                <div>
                  {Array.isArray(arrayTasks) && arrayTasks?(
                    arrayTasks.map(task => <TaskMinimized task={task} deleteGroup={deleteGroup} group={group}/>)
                  ):(<span></span>)}                 
                </div>
              </div>
              <div id="card-content-buttons">
                <IconButton onClick={toggleContentVisibility}>
                  {isContentVisible ? <RemoveIcon /> : <AddIcon />}
                </IconButton>
                <IconButton onClick={async()=> handleDeleteGroup()} style={{cursor:'pointer' , color:'red'}}>
                  <ClearIcon/>
                </IconButton>
                
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
       {/* Modal */}
       <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography>{dialogContent}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
       {/* Confirmation Dialog */}
    <Dialog
      open={dialogOpen}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseDialog}
    >
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <Typography>{dialogContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
    </>
  );
}

export default GroupCard;
