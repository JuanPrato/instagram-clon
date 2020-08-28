import React from 'react'
import './controls.css'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom';

function Controls({ view, setView}) {
    return (
        <div className = 'controls'>
            <Link to ='/' className= 'controls__item'>
                <Button onClick = {() => {}}>CASITA</Button>
            </Link>
            <Link to ='/perfil' className= 'controls__item'>
                <Button onClick = {() => {}}>PERFIL</Button>
            </Link>
        </div>
    )
}

export default Controls
