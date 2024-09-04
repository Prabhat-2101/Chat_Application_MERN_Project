import React, { useState, useEffect } from 'react';
import app_logo from '../assets/chat_app.png';
import { TextField, Button, CircularProgress, Backdrop, Alert, Snackbar } from '@mui/material';
import '../App.css';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';

function Login() {
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
  const [loginStatus, setLoginStatus] = useState({ open: false, message: '', severity: 'success' });

  const changeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const loginHandler = async (e) => {
    setLoading(true);
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const response = await axios.post('http://localhost:8000/user/login', data, config);
      const { status, data: responseData } = response;
      if (status === 200) {
        localStorage.setItem('userData', JSON.stringify(responseData));
        setLoginStatus({ open: true, message: 'Login successful', severity: 'success' });
        setTimeout(()=>{
          navigate('/app');
        },1000);
      } else {
        console.log('Invalid Credentials');
      }
    } catch (error) {
      setLoginStatus({ open: true, message: error.response.data.message, severity: 'error' });
    } finally {
      setLoading(false);
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setLoginStatus({ open: false, message: '', severity: 'success' });
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
          <p className='text-xl'>Login Your Account</p>
          <TextField id="standard-basic" label="Username" variant="outlined" name='email' value={data.email} onChange={changeHandler} required />
          <TextField id="standard-basic" label="Password" variant="outlined" name='password' value={data.password} onChange={changeHandler} required />
          <Button variant="outlined" onClick={loginHandler}>Login</Button>
          <p>Don't have an account ?<Link to={'/register'} className='text-blue-500 hover:text-blue-700'> Register</Link></p>
        </div>
      </div>
      <Snackbar open={loginStatus.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={loginStatus.severity} sx={{ width: '100%' }}>
          {loginStatus.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default Login