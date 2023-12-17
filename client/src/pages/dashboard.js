import React from 'react';
import { Grid, Box, Typography, TextField, Card, CardContent, Divider, Button } from '@mui/material';
import { useAuth } from '../auth/authProvider';

const Dashboard = () => {
  const auth = useAuth()
  console.log(auth.user)

  return (
    <Box sx={{ flexGrow: 1, ml: 0, mr: 4, mt: 8, mb:8 }}>
      <Grid container spacing={2}>
        <Grid sx={{ pl: '16px' }} item xs={12}>
          <Typography variant='h3'>Welcome, {auth.user.username}</Typography>
        </Grid>
        <Grid sx={{mt:3, pl:0}} container spacing={2}>
          <Grid item xs={8} >
            <Grid sx={{ml:0}} container spacing={2}>
              <Grid item xs={6}>
                <Card sx={{ minHeight: 400, maxHeight: 400,width: '100%', display:'flex', mr:1 }}>
                  <CardContent>
                    <Typography variant='h6'>Drink Lab Activity</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ minHeight: 400, maxHeight: 400,width: '100%',display: 'flex', mr:1 }}>
                  <CardContent>
                    <Typography variant='h6'>SipHub Activity</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ minHeight: 200, maxHeight: 200, width: '100%', display: 'flex', mr: 1 }}>
                  <CardContent>
                    <Typography variant='h6'>Notifications</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ pt: 0, '&&': { paddingTop: 0 } }} item xs={4}>
            <Grid container spacing={2} sx={{ mt:0,pl:2,display: 'flex', 'flexDirection':'column'}}>
              <Grid item xs={12}>
                <Card sx={{ minHeight: 200, maxHeight: 200, width: '100%', display: 'flex' }}>
                  <CardContent>
                    <Typography variant='h6'>Quote of the Day</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>

              <Card sx={{ minHeight: 400, maxHeight: 400, width: '100%', display: 'flex' }}>
                <CardContent>
                  <Typography variant='h6'>Random Recipe</Typography>
                </CardContent>
              </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Dashboard
