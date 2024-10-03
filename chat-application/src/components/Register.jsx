import React, { useState,useEffect } from 'react'
import app_logo from '../assets/chat_app.png';
import { TextField, Button, CircularProgress, Backdrop, Alert, Snackbar } from '@mui/material';
import '../App.css'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'));
  useEffect(() => {
    if (user) {
      navigate('/app');
    }
  }, [user, navigate]);
  const [showLogin, setShowLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ name: "", email: "", mobile: "", password: "" });
  const [signinStatus, setSigninStatus] = useState({ open: false, message: '', severity: 'success' });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const signupHandler = async (e) => {
    setLoading(true);

    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post('http://localhost:8000/user/register', data, config);
      const { status, data: responseData } = response;
      console.log(data);
      if (status === 200) {
        setSigninStatus({ open: true, message: 'Account created successfully!', severity: 'success' });
        console.log(responseData);
        localStorage.setItem('userData', JSON.stringify(responseData));
        setTimeout(()=>{
          navigate('/');
        },1000);
      } else {
        setSigninStatus({ open: true, message: 'Failed to create account. Please try again.', severity: 'error' });
      }
    } catch (error) {
      if (error.response) {
        setSigninStatus({ open: true, message: error.response.data.message, severity: 'error' });
      } else {
        setSigninStatus({ open: true, message: 'An error occurred. Please try again.', severity: 'error' });
      }
    } finally {
      setLoading(false);
    }
  }
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSigninStatus({ open: false, message: '', severity: 'success' });
  };
  return (
    <div className="w-full overflow-hidden h-screen bg-white-400 flex flex-col justify-center items-center py-4">
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="flex w-11/12 h-full bg-gray-200 p-2 gap-3 rounded box-shadow-1 font-serif">
        <div className='flex  flex-col flex-03 justify-center items-center rounded-sm'>
          <img src={app_logo} alt="Let's Chat" srcset="" className='w-32 h-32' />
          <p className='p-2 text-xl w-10/12'>Share text, voice messages, photos, videos, GIFs, and files for free. Avoid SMS and MMS fees with Signal’s data connection</p>
        </div>
        <div className='flex flex-col gap-4 items-center justify-center flex-1 bg-gray-100 font-serif'>
          <p className='text-xl'>Create Your Account</p>
          <TextField id="standard-basic" label="Username" variant="outlined" name="name" value={data.name} onChange={changeHandler} required/>
          <TextField id="standard-basic" label="Email" variant="outlined" name="email" value={data.email} onChange={changeHandler} required/>
          <TextField id="standard-basic" label="Mobile" variant="outlined" name="mobile" value={data.mobile} onChange={changeHandler} required/>
          <TextField id="standard-basic" label="Password" variant="outlined" name="password" value={data.password} onChange={changeHandler} required/>
          <Button variant="outlined" onClick={signupHandler}>Create Account</Button>
          <p>Already have an account ?<Link to={'/'} className='text-blue-500 hover:text-blue-700'> Login</Link></p>
        </div>
      </div>
      <Snackbar open={signinStatus.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={signinStatus.severity} sx={{ width: '100%' }}>
          {signinStatus.message}
        </Alert>
      </Snackbar>
    </div>
  )
}