import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Slide from '@mui/material/Slide';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import SideBar from '/src/Components/SideBar.jsx';
import { API_BASE_URL, API_ENDPOINTS_TASK } from '/src/Configs.js';
import axios from 'axios';
import Slider from '@mui/material/Slider';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const CreateTask = () => {
  const endpointConfig = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'CreateTask').endpoint;

  const [formData, setFormData] = useState({
    idGroup: 0,
    idProject: 0,
    id: 0,
    Name: '',
    Description: '',
    Status: 0,
    Priority: 'LOW',
    DateAdd: '', 
    DateModified: '', 
    Agent: '',
  });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');

  const handleChange = (e, fieldName) => {
    let value = e.target ? e.target.value : e;
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleCreateTask = async () => {
    try {
      let request = {
        id: 0,
        idGroup: 0,
        idProject: 0,
        name: formData.Name,
        description: formData.Description,
        status: formData.Status.toString(),
        agent: formData.Agent,
        priority: formData.Priority,
        dateModified: "",
        dateAdd: ""
      }     
      const response = await axios.post(`${API_BASE_URL}${endpointConfig}`, request);      
      if (response.status === 200) {
        handleSuccess(response.data.message); // Mostrar modal de éxito
        setFormData({  // Limpiar formulario
          idGroup: 0,
          idProject: 0,
          id: 0,
          Name: '',
          Description: '',
          Status: 0,
          Priority: 'LOW',
          DateAdd: '', 
          DateModified: '', 
          Agent: '',
        });
      }  else if (response.status === 400) {
        handleError(response.data.message);
      } else {
        handleError('Error en la solicitud: Estado HTTP ' + response.status); 
    } 
  }catch (error) {
    handleError(error.message); 
  };
}

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

  return (
    <>
      <SideBar />
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <AddCircleOutlineIcon style={{ marginRight: '8px' }} /> Create New Task
          </Typography>
          <form>
            <TextField
              label="Name"
              name="Name"
              value={formData.Name}
              onChange={(e) => handleChange(e, 'Name')}
              fullWidth
              margin="dense"
            />
            <TextField
              label="Description"
              name="Description"
              value={formData.Description}
              onChange={(e) => handleChange(e, 'Description')}
              fullWidth
              multiline
              rows={4}
              margin="dense"
            />
            <TextField
              label="Agent"
              name="Agent"
              value={formData.Agent}
              onChange={(e) => handleChange(e, 'Agent')}
              fullWidth
              margin="dense"
            />
            <Typography id="status-slider" gutterBottom>
              Status: {formData.Status}
            </Typography>
            <Slider
              aria-labelledby="status-slider"
              value={formData.Status}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={0}
              max={100}
              onChange={(e, value) => handleChange(value, 'Status')}
            />
            <Select
              label="Priority"
              name="Priority"
              value={formData.Priority}
              onChange={(e) => handleChange(e, 'Priority')}
              fullWidth
              margin="dense"
              style={{
                marginTop: '16px', 
              }}
            >
              {['LOW', 'NORMAL', 'HIGH', 'URGENT'].map((priorityOption) => (
                <MenuItem
                  key={priorityOption}
                  value={priorityOption}
                  style={{
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
                </MenuItem>
              ))}
            </Select>
            <Button variant="contained" color="primary" onClick={handleCreateTask} style={{marginTop:'1rem'}}>
              Create Task
            </Button>
          </form>
        </CardContent>
      </Card>

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
};

export default CreateTask;
