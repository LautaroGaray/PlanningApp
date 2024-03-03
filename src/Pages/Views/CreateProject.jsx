import React, { useState } from 'react';
import SideBar from '/src/Components/SideBar.jsx';
import { API_BASE_URL, API_ENDPOINTS_GROUPS } from '/src/Configs.js';
import axios from 'axios';

//MUI
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

import { API_ENDPOINTS_PROJECTS } from '../../Configs';
import { ChromePicker } from 'react-color'; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function CreateProject() {
  const endpointConfig = API_ENDPOINTS_PROJECTS.find(
    (endpoint) => endpoint.name === 'CreateProject'
  ).endpoint;
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogContent, setDialogContent] = useState('');
  const [formData, setFormData] = useState({
    projectName:'',
    projectColor: '#000000'
  });

  const handleCreateGroup = async () => {
    try {
      let request = {
        projectName: formData.Name,
        projectColor: formData.projectColor
      };
      console.log(JSON.stringify(request));
      const response = await axios.post(
        `${API_BASE_URL}${endpointConfig}`,
        request
      );
      if (response.status === 200) {
        handleSuccess(response.data.message);
        setFormData({ ...formData, Name: '' });
      } else if (response.status === 400) {
        handleError(response.data.message);
      } else {
        handleError('Error en la solicitud: Estado HTTP ' + response.status);
      }
    } catch (err) {
      handleError(err.message);
    }
  };

  const handleChange = (e, fieldName) => {
    let value = e.target ? e.target.value : e;
    setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
  };

  const handleColorChange = (color) => {
    setFormData((prevData) => ({ ...prevData, projectColor: color.hex }));
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

  return (
    <>
      <SideBar />
      <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <AddCircleOutlineIcon style={{ marginRight: '8px' }} /> Create New Project
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
            <div style={{ marginTop: '1rem' , display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center'}}>
              <Typography variant="subtitle1" gutterBottom>
                Select Color:
              </Typography>
              <ChromePicker color={formData.projectColor} onChange={handleColorChange} />
            </div>
            <Button variant="contained" color="primary" onClick={handleCreateGroup} style={{ marginTop: '1rem' }}>
              Create Project
            </Button>
          </form>
        </CardContent>
      </Card>
      <Dialog open={dialogOpen} TransitionComponent={Transition} keepMounted onClose={handleCloseDialog}>
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

export default CreateProject;
