import React, { useState } from 'react';
import '../App.css';
import UserAccountButton from '@mui/icons-material/AccountCircleOutlined';
import AddUserButton from '@mui/icons-material/PersonAddAltOutlined';
import AddGroupButton from '@mui/icons-material/GroupAddOutlined';
import AddStatusButton from '@mui/icons-material/AddCircleOutlineOutlined';
import LightModeIcon from '@mui/icons-material/LightModeRounded';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SettingsButton from '@mui/icons-material/SettingsOutlined';
import LogoutButton from '@mui/icons-material/LogoutOutlined';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Backdrop} from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLightMode, setLightMode] = useState(true);

  const [open, setOpen] = useState(false);
  
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false);};
  const handleLogout = () => {
    handleClose();
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);
      localStorage.removeItem('userData');
      navigate('/');
    },1000);
  };
  return (
    <div
      className={`flex flex-col items-center gap-2 py-2 justify-between flex-005 rounded-md box-shadow-2 ${
        isLightMode ? 'light' : 'dark'
      }`}
    >
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className='flex flex-col gap-4 '>
        <IconButton onClick={() => navigate('welcome')}>
          <UserAccountButton className={isLightMode ? 'light' : 'dark'} />
        </IconButton>
        <IconButton onClick={() => navigate('user')}>
          <AddUserButton className={isLightMode ? 'light' : 'dark'} />
        </IconButton>
        <IconButton onClick={() => navigate('group')}>
          <AddGroupButton className={isLightMode ? 'light' : 'dark'} />
        </IconButton>
        <IconButton onClick={() => navigate('status/new')}>
          <AddStatusButton className={isLightMode ? 'light' : 'dark'} />
        </IconButton>
      </div>
      <div className='flex flex-col gap-4'>
        <IconButton onClick={() => setLightMode((prev) => !prev)}>
          {!isLightMode && <LightModeIcon className={isLightMode ? 'light' : 'dark'} />}
          {isLightMode && <DarkModeIcon className={isLightMode ? 'light' : 'dark'} />}
        </IconButton>
        <IconButton>
          <SettingsButton className={isLightMode ? 'light' : 'dark'} />
        </IconButton>
        <IconButton onClick={handleClickOpen}>
          <LogoutButton className={isLightMode ? 'light' : 'dark'} />
        </IconButton>
        
        {open && (
          <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby = "alert-dialog-description">
            <DialogTitle id="alert-dialog-title" className='font-serif'> {"Are You Sure to Logout ?"} </DialogTitle>
            <DialogActions>
              <Button onClick={handleClose}>No</Button>
              <Button onClick={handleLogout} autoFocus> Yes</Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Navbar;