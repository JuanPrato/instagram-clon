import React from 'react';

import Profile_picture from '../profile_picture/Profile_picture';

import './profile_data.css';

function Profile_data({user}) {

    return (
        <div className = 'profile_data'>

            {/* Datos : Foto Perfil + Nombre + Seguidores + Seguidos */}

            {/* Imagen de perfil */}

            <Profile_picture/>

            {/* TODO: Conteo y guardar seguidores y seguidos */}

            <h3>Seguidores: 0</h3>
            
            <h3>Seguidos: 0</h3>

        </div>
    )
}

export default Profile_data