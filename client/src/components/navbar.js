import { Link, NavLink } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar,Icon, IconButton, Typography, Stack, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../auth/authProvider";
import ProfileModal from "../pages/profileModal";
import '../styles/index.css';

const Navbar = () => {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleLogout = () => {
    auth.onLogout()
    //!DO YOU NAVIGATE HERE?
  };

  return (
    <AppBar sx={{ backgroundColor: '#EDD9D6', color:'#2B2539'}} elevation={0} position ='sticky'>
      <Toolbar>
        <IconButton component={Link} to='/' size='medium' edge='start' color='inherit' aria-label='logo'>
          <img alt="icon" src="/images/green-tea.png" style={{ width: '80px' }} />
        </IconButton>
        <Typography fontSize={36} fontFamily='Dosis' variant='h5' component='div' sx={{flexGrow: 0, marginRight:4}}>
          TEA Culture
        </Typography>
        <Stack direction='row' spacing={2} justifyContent='flex-start' sx={{ flexGrow: 1 }}>
          <Stack direction ='row' spacing={2}>
            {!auth.user ? (
                <Button color='inherit' component={Link} to={"/drinklab"}>
                  Drink Lab
                </Button>
            ) : (
              <>
            <Button color='inherit' component={Link} to={`/users/${auth.user.id}/dashboard`}>
              Dashboard
            </Button>
            <Button color='inherit' component={Link} to={"/drinklab"}>
              Drink Lab
            </Button>
            <Button color='inherit' component={Link} to={"/siphub"}>
              Sip Hub
            </Button>
            <Button color='inherit' component={Link} to={`/users/${auth.user.id}/addrecipe`}>
              Add Drink
            </Button>
              </>
            )}
          </Stack>
        </Stack>
        <Stack direction ='row' spacing={1} justifyContent='flex-end'>
          {!auth.user ? (
            <Button component={Link} to={"/login"} color='inherit'  >
              Login/Register
            </Button>
          ) : (
          <>
            <Button color='inherit' component={Link} to={"/"} onClick={handleLogout}>
              Logout
            </Button>
            <IconButton aria-label="profile" size="medium" onClick={handleOpen}>
              <AccountCircleIcon size="inherit" />
            </IconButton>
            <ProfileModal open={open} handleClose={handleClose}/>
          </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
