import React, { useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import '../css/ProjectMinimized.css'

function ProjectMinimized({idProject, projectName, projectColor}) {
    const [groups, setGroups] = useState([]);

    useEffect(() => {      
        
       
    }, []);

    return (
        <>
        <div>
        <Card className="project-card" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.2)), ${projectColor}` }}>
                <CardContent>
                <Typography 
                    variant="h5" 
                    component="div" 
                    color='white'
                    style={{
                        textShadow: '0 0 3px black, 0 0 3px black, 0 0 3px black, 0 0 3px black', 
                        padding: '8px', 
                        display: 'inline-block' 
                    }}
                >
                    {projectName ? projectName : 'None'}
                </Typography>
                    {groups.length > 0 ? (
                        groups.map((group, index) => (
                            <Typography key={index} variant="body1" gutterBottom>
                                {group}
                            </Typography>
                        ))
                    ) : (
                        <Typography variant="body1" gutterBottom>
                            No hay grupos disponibles
                        </Typography>
                    )}
                </CardContent>
            </Card>
        </div>
        </>
       
    );
}

export default ProjectMinimized;
