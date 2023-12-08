import { Link, NavLink } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Typography, Stack, Button } from '@mui/material';

const Navbar = ({ user, updateUser, handleNewAlert }) => {
  const handleLogout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(() => updateUser(null))
      .catch(handleNewAlert);
  };

  return (
    <AppBar sx={{ backgroundColor: '#ACCFC9', color: '#FA9E7B'}}position ='static'>
      <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo'>
          <img alt="icon" src="%PUBLIC_URL%/images/logo.png" />
        </IconButton>
        <Typography variant='h5' component='div' sx={{flexGrow: 0, marginRight:2}}>
          TEA Culture
        </Typography>
        <Stack direction='row' spacing={2} justifyContent='flex-start' sx={{ flexGrow: 1 }}>
          <Stack direction ='row' spacing={2}>
            <Button color='inherit' component={Link} to={`/users/${user.id}/dashboard`}>
              Dashboard
            </Button>
            <Button color='inherit' component={Link} to={"/drinklab"}>
              Drink Lab
            </Button>
            <Button color='inherit' component={Link} to={"/communities"}>
              Sip Hub
            </Button>
            <Button color='inherit' component={Link} to={`/users/${user.id}/adddrink`}>
              Add Drink
            </Button>
          </Stack>

        </Stack>
        <Stack direction ='row' spacing={2} justifyContent='flex-end'>
          <Button color='inherit' to={"/"} onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
