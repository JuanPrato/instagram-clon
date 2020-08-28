import React from 'react'
import './perfil.css'

import Profile_data from '../../components/profile_data/Profile_data';

function Perfil({user}) {
    return (
        <div className = 'perfil'>
            {/* Datos : Foto Perfil + Nombre + Seguidores + Seguidos */}

            <Profile_data user = {user}/>

            {/* Fotos subidas */}

        </div>
    )
}

export default Perfil
