import React from 'react';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const PaginationActions = ({ count, page, rowsPerPage, onPageChange }) => {

  const handlePrevButtonClick = () => {
    console.log('CLICK')
    const newPage = page - 1;
    onPageChange(null, newPage);
  };

  const handleNextButtonClick = () => {
    console.log('CLICK')
    const newPage = page + 1;
    onPageChange(null, newPage);
  };

  return (
    <div style={{ display: 'flex'}}>
      <IconButton onClick={handlePrevButtonClick} disabled={false} aria-label="previous page" style={{cursor:'pointer'}}>
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton onClick={handleNextButtonClick} disabled={false} aria-label="next page" style={{cursor:'pointer'}}>
        <KeyboardArrowRight />
      </IconButton>
    </div>
  );
};

export default PaginationActions;
