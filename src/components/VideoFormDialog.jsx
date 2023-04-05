import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function VideoFormDialog(props) {
    const open = props.open;
    const handleClose = props.handleClose;
    const handleClickOpen = props.handleClickOpen;
    const handleSubmit = props.handleSubmit;
    const [inputVal, setInputVal] = React.useState("");

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Attach Video</DialogTitle>
        <DialogContent>
          <DialogContentText>
          Enter the URL of the YouTube video:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="URL:"
            type="url"
            fullWidth
            variant="standard"
            value={inputVal}
            onChange={ (e) => { setInputVal(e.target.value) } }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ () => { handleSubmit(inputVal) }}>Submit</Button>
        </DialogActions>    
      </Dialog>
    </div>
  );
}