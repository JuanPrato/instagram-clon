import React, { useState, useEffect } from 'react'

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';

import { useStyles, getModalStyle } from '../../assets/static/modalConfig';

import { db, storage, auth } from '../../assets/static/firebase';

function Profile_picture() {

    const currentUser = auth.currentUser;

    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    const [open, setOpen] = useState(false);

    const [cargarImagen, setCargarImagen] = useState(null);

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setCargarImagen(e.target.files[0]);
        }
    }

    const [imagen, setImagen] = useState('');

    const handleUpdate = (e) => {

        //Se sube a la base de datos y se reemplaza la anterior

        const uploadTask = storage.ref(`images/${currentUser.email}_profile_image`).put(cargarImagen);


        uploadTask.on(
            "state_changed",
            () => {
                // seguir el progreso...
            },
            (error) => {
                console.log(error);
            },
            () => {
                //Se completo...
                storage
                    .ref("images")
                    .child(`${currentUser.email}_profile_image`)
                    .getDownloadURL()
                    .then(url => {
                        //Ingreso la imagen en la base de datos...
                        currentUser.updateProfile({
                            photoURL : url
                        })
                        setImagen(url);
                    })
                setOpen(false);
                setCargarImagen(null);
            }
        )
    }

    useEffect(() => {

        setImagen(currentUser?.photoURL);

    }, [currentUser]);

    return (
        <div>
            <div onClick = {() => setOpen(true)}>
                <Avatar
                    alt = {currentUser?.displayName}
                    src = {imagen}
                    className = 'profile_data__avatar'
                />
            </div>

            {/* Form para cambiar foto de perfil */}

            <Modal
                open = {open}
                onClose = {() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className = "modal__form">
                        <input className = "form__input" type="file" onChange = {handleChange}/>
                        <Button onClick = {handleUpdate}>SUBIR</Button>
                    </form>
                </div>
            </Modal>
        </div>
    )
}

export default Profile_picture
