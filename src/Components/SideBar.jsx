import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WorkIcon from '@mui/icons-material/Work';
import GroupIcon from '@mui/icons-material/Group';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import '../css/SideBar.css'

export default function SideBar() {
  const [state, setState] = React.useState({
    left: false,
  });
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setState({ left: !state.left });
  };

  const handleProjectsSelected = () => {
    setState({ left: false });
    navigate('/Projects');
  };

  const handleGroupsSelected = () => {
    setState({ left: false });
    navigate('/Groups');
  };

  const handleTasksSelected = () => {
    setState({ left: false });
    navigate('/Tasks');
  };

  const handleMainSelected = () => {
    setState({ left: false });
    navigate('/');
  };

  const list = (
    <Box
      sx={{
        width: 250,
        backgroundColor: '#212121', // Fondo del SideBar igual al NavBar
        color: 'white', // Color del texto y los iconos en blanco
        height:'100vw'
      }}
      role="presentation"
      onClick={() => setState({ left: false })}
      onKeyDown={() => setState({ left: false })}
    >
      <List style={{marginTop:'2rem'}}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleProjectsSelected}>
            <ListItemIcon>
              <WorkIcon style={{ color: 'white' }}/>
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleGroupsSelected}>
            <ListItemIcon>
              <GroupIcon style={{ color: 'white' }}/>
            </ListItemIcon>
            <ListItemText primary="Groups" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleTasksSelected}>
            <ListItemIcon>
              <CheckCircleIcon style={{ color: 'white' }}/>
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleMainSelected}>
            <ListItemIcon>
              <HomeIcon style={{ color: 'white' }}/>
            </ListItemIcon>
            <ListItemText primary="Main" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div style={{ position: 'relative' , backgroundColor:'#212121'}}>
      <Button
        onClick={toggleDrawer}
        style={{
          marginLeft: state.left ? '250px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          position: 'absolute',
          top: '10vw',
          transform: 'translateY(-50%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: state.left ? 'flex-start' : 'center',
          width: '50px',
          borderRadius: '50%',
          backgroundColor: 'transparent',
          border: 'none',
          padding: '2px',
          outline: 'none',
        }}
      >
        {state.left ? <ChevronLeftIcon /> : <ChevronLeftIcon fontSize="large" />}
      </Button>
      <Drawer anchor="left" open={state.left} onClose={toggleDrawer} id='drawer'>
        {list}
      </Drawer>
    </div>
  );
}
