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

import { uploadImage } from '../api';
const CLOUDNAME = process.env.REACT_APP_CLOUD_NAME
const UPLOADPRESET = process.env.REACT_APP_UPLOAD_PRESET


export default function VideoFormDialog(props) {
    const open = props.open;
    const handleClose = props.handleClose;
    const handleClickOpen = props.handleClickOpen;
    const handleSubmit = props.handleSubmit;

    const inputRef = useRef()
    const [inputVal, setInputVal] = React.useState("");
    const [image, setImage] = useState("");
    const didMount = useRef(false);

    const submitImage = () => {
      const formData = new FormData()
      formData.append("file", image)
      formData.append("upload_preset", UPLOADPRESET)
      formData.append("cloud_name", CLOUDNAME)
  
      uploadImage(formData).then(data => {
        console.log(data);
        console.log(data.secure_url);
        handleSubmit(
          {
            altText: "URL image",
            src: data.secure_url
          }
        )
      })
    }

    const onButtonClick = () => {
      inputRef.current.click();
    }

    useEffect(() => {
      // if ( !didMount.current ) {
      //   return didMount.current = true;
      // }
      submitImage();
    }, [image]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Attach Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the URL of the image:
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
          <DialogContentText>  
            Or upload an image:
          </DialogContentText>

          <input
            type="file"
            accept="image/*"
            style={{display: "none"}}
            ref={inputRef}
            id="file"
            name="file"
            className="file-input"
            onChange={(e) => { 
              setImage(e.target.files[0]) 
            } }
          />
          <button 
            onClick={onButtonClick}
            className="submit-button">
            <CloudUploadIcon sx={{ fontSize: 20 }} />
            Upload Picture
          </button>

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