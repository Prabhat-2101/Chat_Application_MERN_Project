import React from 'react'
import DoneButton from '@mui/icons-material/CheckCircleOutlineOutlined';
import { IconButton,Alert, Snackbar, CircularProgress, Backdrop } from '@mui/material';
import Button from '@mui/material/Button';
import { useLocation, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

function CreateUser() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [chatName, setChatName] = useState('');
    const [isGroupChat, setIsGroupChat] = useState(false);
    const [admin, setAdmin] = useState(JSON.parse(localStorage.getItem('userData')));
    const [receiverUser, setReceiverUser] = useState([]);
    const [loginStatus, setLoginStatus] = useState({ open: false, message: '', severity: 'success' });
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setLoginStatus({ open: false, message: '', severity: 'success' });
    };
    const handleSubmit = async () => {
      setLoading(true);
        try {
          const userList = [receiverUser];
          console.log(chatName,isGroupChat,admin.email,userList);
          const response = await axios.post('http://localhost:8000/user/adduser', {
            chatName,
            isGroupChat,
            admin,
            userList,
          });
          setLoginStatus({ open: true, message: 'User Added Successfully', severity: 'success' });
        } catch (error) {
          setLoginStatus({ open: true, message: error.response.data.message, severity: 'error' });
        }finally{
          setLoading(false);
        }
      };
    return (
        <div className='flex flex-col gap-2 flex-065 justify-center items-center'>
        <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}><CircularProgress color="inherit" /></Backdrop>
        <input
        type="text"
        placeholder='Enter chat name'
        value={chatName}
        required
        onChange={(e) => setChatName(e.target.value)}
        className='w-3/5 h-12 p-2 rounded-md font-serif outline-none'
        />
      <select
        value={isGroupChat}
        onChange={(e) => setIsGroupChat(e.target.value === 'true')}
        className='w-3/5 h-12 p-2 rounded-md font-serif outline-none'
        required
      >
        <option value={false}>Private Chat</option>
        <option value={true} disabled>Group Chat</option>
      </select>
      <input
        type="text"
        placeholder="Enter receiver's email"
        value={receiverUser}
        onChange={(e) => setReceiverUser(e.target.value)}
        required
        className='w-3/5 h-12 p-2 rounded-md font-serif outline-none'
      />
      <IconButton onClick={handleSubmit}>
        {/* <DoneButton /> */}
      <Button variant="outlined">Add User</Button>
      </IconButton>
      <Snackbar open={loginStatus.open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={loginStatus.severity} sx={{ width: '100%' }}>
          {loginStatus.message}
        </Alert>
      </Snackbar>
      </div>
    )
}

export default CreateUser