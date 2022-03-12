import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

const SnackBar = ({ message }) => {
  React.useEffect(() => {
    if (message) {
      setOpen(true);
      setMessage(message);
    }
  }, [message]);
  const [Open, setOpen] = React.useState(false);
  const [Message, setMessage] = React.useState('');

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setMessage('');
  };

  const action = (
    <>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <div>
      <Snackbar
        open={Open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={Message}
        action={action}
      />
    </div>
  );
};

export default SnackBar;
