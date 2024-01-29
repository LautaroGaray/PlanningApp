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

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function CreateGroup(){
    const endpointConfig = API_ENDPOINTS_GROUPS.find((endpoint) => endpoint.name === 'CreateGroup').endpoint;
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [formData, setFormData] = useState({
        idGroup: 0,
        idProject: 0,
        id: 0,
        Name: ''       
      });

      const handleCreateGroup= async () => {
            try {
                let request = {
                    id: 0,
                    idGroup: 0,
                    idProject: 0,
                    name: formData.Name                 
                }

                const response = await axios.post(`${API_BASE_URL}${endpointConfig}`, request);      
                if (response.status === 200) {
                  handleSuccess(response.data.message); // Mostrar modal de éxito
                  setFormData({  // Limpiar formulario
                    idProject: 0,
                    id: 0,
                    Name: ''                   
                  });
                }  else if (response.status === 400) {
                  handleError(response.data.message);
                } else {
                  handleError('Error en la solicitud: Estado HTTP ' + response.status); 
              }                 
            }catch(err){
                handleError(err.message); 
            }     
        }
    
    const handleChange = (e, fieldName) => {
        let value = e.target ? e.target.value : e;
        setFormData((prevData) => ({ ...prevData, [fieldName]: value }));
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


 return(
    <>
        <SideBar/>
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 20, boxShadow: 4 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            <AddCircleOutlineIcon style={{ marginRight: '8px' }} /> Create New Group
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
            <Button variant="contained" color="primary" onClick={handleCreateGroup} style={{marginTop:'1rem'}}>
              Create Group
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
    )

}

export default CreateGroup;