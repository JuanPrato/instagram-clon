import React, { useState } from 'react'
import './imageUpload.css'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Modal } from '@material-ui/core';
import { storage, db } from '../../assets/static/firebase'
import firebase from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

function ImageUpload({ username, email }) {
    
    const [caption, setCaption] = useState('');
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);

    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }

    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                // seguir el progreso...
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                //Se completo...
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //Ingreso la imagen en la base de datos...
                        db.collection("posts").add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imgUrl: url,
                            username: username
                        });
                        db.collection('users').doc(email).collection('imgs').add({
                            url:url,
                            timestamp: firebase.firestore.FieldValue.serverTimestamp()
                        });
                    })


                setOpen(false);
                setCaption('');
                setImage(null);
                setProgress(0);
            }
        )
    }

    return (
        <div className = 'imageUpload'>
            <Modal
                open = {open}
                onClose = {() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className = 'imageUpload__form'>
                        <progress value = {progress} max = '100' className = 'form__progress'/>
                        <input type="text" placeholder ="Descripcion..." value = {caption} onChange = {e => setCaption(e.target.value)}/>
                        <input type="file" onChange = {handleChange}/>
                        <Button onClick = {handleUpload}>Upload</Button>
                    </form>
                </div>
            </Modal>

        <Button onClick = {() => setOpen(true)}  className = 'imageUpload__button'>Subir Imagen</Button>
            

        </div>
    )
}

export default ImageUpload