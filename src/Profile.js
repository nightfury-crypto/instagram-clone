import React from 'react';
import './Profile.css';
import { db } from './firebase';
import firebase from 'firebase';


function Profile({ id, user, username, avatar, name, bio }) {

    return (

        <div>
            {  user.displayName ? (
            <div className="card">
                <img src="..." />
                {/* <h1>{name}</h1> */}
                <p class="card_title">{bio}</p>
                <p>{username}</p>
            </div>
            ):( <h1>ok</h1>
            )
}



        </div>

    )
}

export default Profile;