import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { putBio } from '../../../api';

const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME
const UPLOADPRESET = process.env.REACT_APP_UPLOAD_PRESET


export default function BioFormDialog(props) {
    const open = props.open;
    const handleClose = props.handleClose;
    const handleClickOpen = props.handleClickOpen;
    const handleSubmit = props.handleSubmit;

    const inputRef = useRef()
    const [inputVal, setInputVal] = React.useState("");
    const [bio, setBio] = useState("");
    // const didMount = useRef(false);

    const submitBio = () => {
  
      putBio(bio).then(data => {
        // handleSubmit(
        //   {
        //     altText: "URL image",
        //     src: data.secure_url
        //   }
        // )
      })
    }

    // const onButtonClick = () => {
    //   inputRef.current.click();
    // }

    useEffect(() => {
      // if ( !didMount.current ) {
      //   return didMount.current = true;
      // }
      submitBio();
    }, [bio]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Bio</DialogTitle>
        <DialogContent>
          <DialogContentText>
            What do you want others to know about you?
          </DialogContentText>

          <TextField
            autoFocus
            margin="dense"
            id="bio-input"
            label="About You"
            type="text"
            fullWidth
            multiline  
            variant="standard"
            value={inputVal}
            onChange={ (e) => { setInputVal(e.target.value) } }
            inputProps={{ maxLength: 150 }}
          />
        
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={ () => { 
            handleSubmit(
              {
                altText: "URL image",
                src: inputVal
              }) 
            }}>Submit</Button>
        </DialogActions>    
      </Dialog>
    </div>
  );
}