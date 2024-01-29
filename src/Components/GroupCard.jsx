import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS_TASK } from '/src/Configs.js';

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

//Components
import TaskMinimized from './TaskMinimized';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function GroupCard({group}) {
  const endpointConfig = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'GetTaskByGroup').endpoint;
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMovable, setIsMovable] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const [arrayTasks, setArrayTasks] =useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const navigate = useNavigate();

  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleMouseDown = (e) => {
    setIsMovable(true);
    setInitialPosition({ x: e.clientX, y: e.clientY });
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

  const handleMouseMove = (e) => {
    if (isMovable) {
      const deltaX = e.clientX - initialPosition.x;
      const deltaY = e.clientY - initialPosition.y;
      setCurrentPosition({ x: deltaX, y: deltaY });
    }
  };

  const handleMouseUp = () => {
    setIsMovable(false);
    setInitialPosition({ x: 0, y: 0 });
  };

  const handleDoubleClick = () => {
    setCurrentPosition({ x: 0, y: 0 });
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
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    handleArrayTasks();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isMovable]);

  return (
    <>
      <div>
        <Card
          id="div-general-container-data-group"
          style={{
            position: 'absolute',
            transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
          }}
          onMouseDown={handleMouseDown}
          onDoubleClick={handleDoubleClick}
        >
          <CardContent>
            <div id="card-content-group">
              <div id="card-content-title-group" onClick={handleTitleClick}>
                <Typography
                  variant="h8"
                  style={{ fontWeight: 'bold', color: 'black' }}
                >
                  {group.name?group.name:'No name'}
                </Typography>
              </div>
              <div
                id="card-content-body"
                style={{ display: isContentVisible ? 'block' : 'none' }}
              >
                <div>
                  {Array.isArray(arrayTasks) && arrayTasks?(
                    arrayTasks.map(task => <TaskMinimized task={task} />)
                  ):(<span></span>)}                 
                </div>
              </div>
              <div id="card-content-buttons">
                <IconButton onClick={toggleContentVisibility}>
                  {isContentVisible ? <RemoveIcon /> : <AddIcon />}
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
    </>
  );
}

export default GroupCard;
