import React, { useState } from 'react';
import { Snackbar } from '@material-ui/core';

function Notification(props) {
  const {type, message} = props;
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
  
    setOpen(false);
  };

  if (type === undefined) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      message={message}
      onClose={handleClose}
    />
  );
}
 export default Notification;
