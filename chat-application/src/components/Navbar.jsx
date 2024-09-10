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
import DialogContent from '@mui/material/DialogContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

function Navbar() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLightMode, setLightMode] = useState(true);
  const [open, setOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
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
  const handleAccountClickOpen = () => {
    setAccountOpen(true);
  };
  const handleAccountClose = () => {
    setAccountOpen(false);
  };

  const handleSettingsClickOpen = () => {
    setSettingsOpen(true);
  };
  const handleSettingsClose = () => {
    setSettingsOpen(false);
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
        <IconButton onClick={handleAccountClickOpen}>
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
        {accountOpen && (
          <Dialog open={accountOpen} onClose={handleAccountClose} aria-labelledby="alert-dialog-title" aria-describedby = "alert-dialog-description">
            <DialogTitle id="alert-dialog-title" className='font-serif'> {"This is your profile"} </DialogTitle>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Navbar;