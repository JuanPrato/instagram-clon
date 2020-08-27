import React from 'react'
import './controls.css'
import { Button } from '@material-ui/core'

function Controls({ view, setView}) {
    return (
        <div className = 'controls'>
            <Button className= 'controls__item' onClick = {() => setView({main:'visible', perfil: 'hidden'})}>CASITA</Button>
            <Button className= 'controls__item' onClick = {() => setView({main:'hidden', perfil: 'visible'})}>PERFIL</Button>
        </div>
    )
}

export default Controls
