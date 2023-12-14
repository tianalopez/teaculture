import React, {useState, useEffect} from 'react';
import CommunityCard from '../components/communityCard';
import { Box, Grid, Button, Typography, Rating, Paper, } from '@mui/material';

const Communities = () => {
  const [communities, setCommunities] = useState([])

  useEffect(() => {
    fetch('/communities')
    .then(r => r.json())
    .then(setCommunities)
    .catch(err => console.log(err))
  },[])

  const communityCards = communities && communities.map((community) => (
    <Grid key={community.id} item xs={12} sm={6} md={4} lg={3}>
      <CommunityCard key={community.id} community={community}/>
    </Grid>
  ))

  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid sx={{ml:0}} container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>SipHub</Typography>
          <Typography variant='h6'>Create connections with other tea and coffee lovers!</Typography>
        </Grid>
        <Grid sx={{ mt: 4, p: 2, justifyContent: 'center' }} item xs={12}>
          <Grid sx={{ml:0}} container spacing={2}>
            {communityCards}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Communities
