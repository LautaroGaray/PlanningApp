import React, { useState } from 'react';
import TableCell from '@mui/material/TableCell';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditableCell = ({ initialValue, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onSave(editedValue);
  };
const handleCancelClick = ()=>{
    setIsEditing(false)
}
  const handleChange = (e) => {
    setEditedValue(e.target.value);
  };

  return (
    <TableCell>
      {isEditing ? (
        <div>
          <TextField
            multiline
            fullWidth
            value={editedValue}
            onChange={handleChange}
          />
          <Button variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="contained" color='error' onClick={handleCancelClick}>
            Cancel
          </Button>
        </div>
      ) : (
        <div onClick={handleEditClick}>
          {initialValue}
        </div>
      )}
    </TableCell>
  );
};

export default EditableCell;
