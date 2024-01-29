import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import SideBar from './Components/SideBar';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import FlagIcon from '@mui/icons-material/Flag';
import AddIcon from '@mui/icons-material/Add';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import { API_BASE_URL, API_ENDPOINTS_TASK } from './Configs.js';
import axios from 'axios';
import ApiService from '../public/Logics/ApiService.js'



function App() {
  
  const endpointConfig = API_ENDPOINTS_TASK.find((endpoint) => endpoint.name === 'TaskPendingsAll').endpoint;  
 
  const [arrayTasks, setArrayTasks] = useState([]);  
  const navigate = useNavigate();

  const fetchData = async (endpoint) => {  
    let apiService = new ApiService();
    let result = await apiService.GetData(API_BASE_URL,endpoint);    
    setArrayTasks(result)
    
  };
 
  return (
    <>
      <SideBar />
      <div id='title-div-container'>
        <div className='title-div-card'>
          <div id='title-div-card-label-div'>
            <CheckCircleIcon />
            <label id='title-div-card-label'>MAIN</label>
          </div>
        </div>
        <div className='title-div-card'>
          <Button variant="contained" color="primary" id='title-div-card-button' onClick={() => fetchData(endpointConfig)}>
            REFRESH
          </Button>
        </div>
      </div>
      <div id=''>       
      </div>
      <div id='table-div-container'>
      </div>
    </>
  );
}

export default App;
