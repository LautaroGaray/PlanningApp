import React from 'react';
import FlagIcon from '@mui/icons-material/Flag';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';


const TaskMedia = ({ tasks }) => {  

  const priorityStats = {
    LOW: 0,
    NORMAL: 0,
    HIGH: 0,
    URGENT: 0,
  };

  
  tasks.forEach((task) => {
    priorityStats[task.priority]++;
  });

  return (    
<div id='div-general-container-data'>
<Card style={{ width: '15rem' }}>
    
  <CardContent>
  <h5 className="card-title"
  style={{
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    color: 'white',
    textAlign: 'center',
    width: '100%',
    borderRadius: '30px'
  }}
  >Priority statistics</h5>
  <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
  }}></div>
   <ul style={{ listStyle: 'none', padding: 0 , fontWeight:'700', fontSize:'smaller'}}>
            <li>
              <FlagIcon style={{ color: '#2196F3' }} />
              <span>LOW: {priorityStats.LOW}</span>
            </li>
            <li>
              <FlagIcon style={{ color: '#FFEB3B' }} />
              <span>NORMAL: {priorityStats.NORMAL}</span>
            </li>
            <li>
              <FlagIcon style={{ color: '#FF5722' }} />
              <span>HIGH: {priorityStats.HIGH}</span>
            </li>
            <li>
              <FlagIcon style={{ color: '#800000' }} />
              <span>URGENT: {priorityStats.URGENT}</span>
            </li>
          </ul>
  </CardContent>
</Card>
</div>
  );
};

export default TaskMedia;
