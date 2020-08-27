import React, { useState } from 'react';
import './header.css';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles'
import { Button, Input } from '@material-ui/core';
import { auth } from '../../assets/static/firebase'

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

function Header({ email, setEmail, password, setPassword, username, setUsername, signUp, signIn, user }) {

    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle);

    function onSignIn(event) {
        signIn(event);
        setOpenSignIn(false);
    }

    return (
        <div className='header'>
            <img
                className="header__logo"
                alt = 'logo'
                src='https://cdn.worldvectorlogo.com/logos/instagram-1.svg'
            />

            <Modal
                open = {open}
                onClose = {() => setOpen(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="header__form">
                        <img
                            className="header__logo"
                            alt = 'logo'
                            src='https://cdn.worldvectorlogo.com/logos/instagram-1.svg'
                        />
                        <Input
                            placeholder ="username"
                            type ="text"
                            value = {username}
                            onChange = {e => setUsername(e.target.value)}
                        />
                        <Input
                            placeholder ="email"
                            type ="email"
                            value = {email}
                            onChange = {e => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder ="password"
                            type ="password"
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick ={signUp}>Sign Up</Button>
                    </form>
                </div>
            </Modal>
            <Modal
                open = {openSignIn}
                onClose = {() => setOpenSignIn(false)}
            >
                <div style={modalStyle} className={classes.paper}>
                    <form className="header__form">
                        <Input
                            placeholder ="email"
                            type ="email"
                            value = {email}
                            onChange = {e => setEmail(e.target.value)}
                        />
                        <Input
                            placeholder ="password"
                            type ="password"
                            value = {password}
                            onChange = {e => setPassword(e.target.value)}
                        />
                        <Button type="submit" onClick ={onSignIn}>SingUp</Button>
                    </form>
                </div>
            </Modal>
            {
                user ? (
                    <Button onClick = {() => auth.signOut()}><span className = 'button__text'>Cerrar Sesion</span></Button>
                ) : (
                    <div className = "header__loginContainer">
                        <Button onClick = {() => setOpenSignIn(true)}><span className = 'button__text'>Ingresar</span></Button>
                        <Button onClick = {() => setOpen(true)}><span className = 'button__text'>Registrarse</span></Button>
                    </div>
                )
            }
            
        </div>
    )
}

export default Header
