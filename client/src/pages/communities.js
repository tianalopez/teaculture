import React, {useState, useEffect} from 'react'
import { Box, Grid, Button, Typography, Rating, Paper, } from '@mui/material';

const Communities = () => {
  const [communities, setCommunities] = useState()

  useEffect(() => {
    fetch('/communities')
    .then(r => r.json())
    .then(setCommunities)
    .catch(err => console.log(err))
  },[])
  console.log(communities)
  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>SipHub</Typography>
          <Typography variant='h6'>Create connections with other tea and coffee lovers!</Typography>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Communities
