import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Agent from './Agents.jsx'

const AgentCard = ({ uniqueAgents }) => {
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
          >Agents</h5>
          <div style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center'
          }}>
            {[ ...uniqueAgents].map((agent) => (
              <div key={agent} >
                <Agent agent={agent} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgentCard;