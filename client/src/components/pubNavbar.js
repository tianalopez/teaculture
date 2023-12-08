import React from 'react'
import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';

const PubNavbar = ({handleNewAlert}) => {

  return (
    <AppBar sx={{ backgroundColor: '#ACCFC9', color: '#FA9E7B'}}position ='static'>
      <Toolbar>
        <IconButton size='medium' edge='start' color='inherit' aria-label='logo'>
          <img alt="icon" src="%PUBLIC_URL%/images/logo.png" />
        </IconButton>
        <Typography variant='h5' component='div' sx={{flexGrow: 1}}>
          TEA Culture
        </Typography>
        <Stack direction ='row' spacing={1}>
          <Button color='inherit' component={Link} to={"/login"} >
            Login/Register
          </Button>
        </Stack>
      </Toolbar>

    </AppBar>
  )
}

export default PubNavbar
