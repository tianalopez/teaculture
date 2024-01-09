import React from 'react';
import { Grid, Box, Typography, Button, Fab } from '@mui/material';

const ProfilePage = () => {
  return (
    <Box sx={{ flexGrow: 1, ml: 1, mr: 3, mt: 2 }} >
      <Grid sx={{ mt: 3, ml: 0, alignItems: 'center', }} container spacing={2} justifyContent='center'>
        <Grid item xs={6} sx={{ mx: 'auto', textAlign: 'center', alignItems: 'center', minHeight: '50rem', display: 'flex'}} >
          <Grid sx={{ justifyContent: 'center' }} container spacing={2}>
            <Grid item xs={12} >
              <Grid container spacing={2}>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3 }}>
                  <Typography variant="caption">Email</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
                  <Typography variant="caption">Password</Typography>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }} >
                  <Grid id='signInDiv' item xs={12} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
                  </Grid>

                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} sx={{ backgroundColor: '#deefd0', minHeight: '50rem', display: 'flex', alignItems: 'center', borderRadius: '20px',}}>
          <Grid sx={{ pr: '16px', }} container spacing={2}>
            <Grid sx={{ pl: 0, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center' }} item xs={12}>
              <img alt='brewing tea' src='/images/coffee.png'></img>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfilePage
