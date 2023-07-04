import React, { useEffect } from 'react';
import prof from './profilepic.module.css'
import { useState } from 'react';

const ProfilePicture = ({initials}) => {
    const [photo, setPhoto] = useState('')
  const user = {
    photo: 'url'
  };
  return (
    <div>
     {photo ? 
             <img
                className={prof.avatar}
                alt="user profile"
                src={photo}
                sx={{ width: 140, height: 140 }}
              /> :
        <div className={prof.avatar_icon}>
          <p className={prof.avatar_initials}>{initials} </p>
        </div>       
            }
  </div>
  );
};


export default ProfilePicture