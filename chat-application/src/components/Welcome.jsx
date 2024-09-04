import React, { useEffect } from 'react'
import app_logo from '../assets/chat_app.png';
import { useNavigate } from 'react-router-dom';

function Welcome() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));

  useEffect(() => {
    if (!user) {
      console.log("Login First");
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='flex flex-065 flex-col justify-center items-center'>
        <img src={app_logo} alt="Let's Chat" srcset="" className='w-32 h-32'/>
        <p className='p-2 text-12 text-center w-10/12 font-serif'>
          {user ? 
            `${user.name} ${user.email}, welcome to Let's Chat! Share text, voice messages, photos, videos, GIFs, and files for free. Avoid SMS and MMS fees` 
            : 
            'You are not logged in. Please login to access the app.'}
        </p>
    </div>
  )
}

export default Welcome;