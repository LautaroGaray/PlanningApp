import React, { useEffect, useState } from 'react';
import { API_BASE_URL, API_ENDPOINTS_PROJECTS } from '/src/Configs.js';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

//MUI
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';

import '../css/ProjectMinimized.css'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  function ProjectMinimized({ idProject, projectName, projectColor }) {
    const navigate = useNavigate();
    const [groups, setGroups] = useState(0);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
    const [errorDialogOpen, setErrorDialogOpen] = useState(false); 
    const [dialogTitle, setDialogTitle] = useState('');
    const [dialogContent, setDialogContent] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const endpointConfigDelete = API_ENDPOINTS_PROJECTS.find(
        (endpoint) => endpoint.name === 'DeleteProject'
    ).endpoint;
    const endpointConfigGetCount = API_ENDPOINTS_PROJECTS.find(
        (endpoint) => endpoint.name === 'GetAllProjectGroups'
    ).endpoint;

    const handleSelectedProject =()=>{
        localStorage.setItem('Project',JSON.stringify({pName:projectName, pColor:projectColor}));
        navigate('/Projects/ProjectsGroups')
    }
    const handleDeleteProject = async () => {
        setDeleteDialogOpen(true); 
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false); 
    };

    const handleErrorDialog = (title, content) => {
        setDialogTitle(title);
        setDialogContent(content);
        setErrorDialogOpen(true); 
    };

    const handleCloseErrorDialog = () => {
        setErrorDialogOpen(false); 
    };

    const handleSuccess = (message) => {
        setDialogTitle('Success');
        setDialogContent(message);
        setDialogOpen(true);
        window.location.reload();
      };
      const getAllCount = async ()=>{
        try{
            console.log('getting')
            let result = await axios.get(
                `${API_BASE_URL}${endpointConfigGetCount}?projectName=${projectName}`
            );
            if (result.status !== 200) {
                handleErrorDialog('Error', 'Cannot get project');
            } else {
                setGroups(result.data.Data.length);
            }

        }catch(err){
            console.log(err)
        }
      }
    const handleConfirmDelete = async () => {
        try {           
            let result = await axios.delete(
                `${API_BASE_URL}${endpointConfigDelete}?projectName=${projectName}`
            );           
            if (result.status !== 200) {
                handleErrorDialog('Error', 'Cannot delete project');
            } else {
                handleSuccess('ProjectDelete deleted');
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            handleErrorDialog('Error', err.message);
        } finally {
            handleCloseDeleteDialog(); // Cerrar el diálogo de confirmación de eliminación
        }
    };
    const handleProjectSelect=()=>{

    }

    useEffect(() => {   
        getAllCount();
        return () => {    
          
        };
      }, []);
    return (
        <>
            <div style={{marginTop:'1rem'}}>
                <Card className="project-card" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), ${projectColor}` }}>
                    <CardContent>
                        <Typography
                            variant="h5"
                            component="div"
                            color='white'
                            style={{
                                textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black',
                                padding: '8px',
                                display: 'inline-block',
                                cursor:'pointer'
                            }}
                            onClick={handleSelectedProject}
                        >
                            {projectName ? projectName : 'None'}
                        </Typography>                       
                        <Typography variant="body1" gutterBottom
                         style={{
                            color:'white'
                        }}>
                               {groups}
                        </Typography>                    
                        <IconButton onClick={handleDeleteProject} style={{ cursor: 'pointer', color: 'red' }}>
                            <ClearIcon />
                        </IconButton>
                    </CardContent>
                </Card>

                {/* Diálogo de confirmación de eliminación */}
                <Dialog
                    open={deleteDialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseDeleteDialog}
                >
                    <DialogTitle>Delete project</DialogTitle>
                    <DialogContent>
                        <Typography>Are you sure you want to delete this project?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDeleteDialog} color="primary">Cancel</Button>
                        <Button onClick={handleConfirmDelete} color="primary">Ok</Button>
                    </DialogActions>
                </Dialog>

                {/* Diálogo de errores */}
                <Dialog
                    open={errorDialogOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleCloseErrorDialog}
                >
                    <DialogTitle>{dialogTitle}</DialogTitle>
                    <DialogContent>
                        <Typography>{dialogContent}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseErrorDialog} color="primary">OK</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
    );
}

export default ProjectMinimized;
