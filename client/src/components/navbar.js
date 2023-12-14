import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar,Icon, IconButton, Typography, Stack, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useAuth } from "../auth/authProvider";

const Navbar = () => {
  const auth = useAuth()
  const handleLogout = () => {
    auth.onLogout()
    //!DO YOU NAVIGATE HERE?
  };

  return (
    <AppBar sx={{ backgroundColor: '#EDF8EE', color: '#6BA6A4'}}position ='static'>
      <Toolbar>
        <IconButton component={Link} to='/' size='medium' edge='start' color='inherit' aria-label='logo'>
          <img alt="icon" src="/images/tea-culture-logo.png" style={{ width: '80px' }} />
        </IconButton>
        <Typography variant='h5' component='div' sx={{flexGrow: 0, marginRight:2}}>
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
            <Button color='inherit' component={Link} to={"/communities"}>
              Sip Hub
            </Button>
            <Button color='inherit' component={Link} to={`/users/${auth.user.id}/adddrink`}>
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
            <IconButton aria-label="profile" size="medium"component={Link} to={`/users/${auth.user.id}/profile`}>
              <AccountCircleIcon size="inherit" />
            </IconButton>
          </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
