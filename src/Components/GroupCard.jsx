import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

//MUI
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

//Components
import TaskMinimized from './TaskMinimized';

function GroupCard() {
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMovable, setIsMovable] = useState(false);
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [currentPosition, setCurrentPosition] = useState({ x: 0, y: 0 });
  const taskParam = {
    id: 1,
    name: 'Tarea',
    agent: 'LG',
    status: '100',
    priority: 'HIGH',
  };
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible);
  };

  const handleMouseDown = (e) => {
    setIsMovable(true);
    setInitialPosition({ x: e.clientX, y: e.clientY });
  };

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

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

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
              <div id="card-content-title-group">
                <Typography
                  variant="h8"
                  style={{ fontWeight: 'bold', color: 'black' }}
                >
                  GROUP NAME
                </Typography>
              </div>
              <div
                id="card-content-body"
                style={{ display: isContentVisible ? 'block' : 'none' }}
              >
                <div>
                  <TaskMinimized task={taskParam} />
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
    </>
  );
}

export default GroupCard;
