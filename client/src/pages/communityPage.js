import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Divider, Grid, Button, Typography, Rating, Paper, CircularProgress } from '@mui/material';
import '../styles/communityPage.css'

const CommunityPage = () => {
  const {id} = useParams()
  const [community, setCommunity] = useState()

  useEffect(() => {
    Promise.all([
      fetch(`/communities/${id}`).then((r) => r.json())
    ])
    .then((data) => setCommunity(data[0]))
    .catch(err => console.log(err))
  },[id])

  if (!community ) {
    return <CircularProgress />
  }
  console.log(community.users)
  const members = community.users.map((user) => (
    <Grid key={user.id} sx={{ m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Avatar size='sm' variant='outlined' />
      <Typography sx={{ pl: 3 }}>{user.username} </Typography>
    </Grid>
  ))

  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>{community.name}</Typography>
          <Typography>{community.users.length} Members | Created XX/XX</Typography>
        </Grid>
      <Grid sx={{mt:3}} container spacing={2}>
        <Grid sx={{}}item xs={3}>
          <Paper sx={{p:2, minHeight:'50vh'}}>
            <Typography variant='h6'>About</Typography>
            <Typography sx={{p: 1}}>{community.description}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Typography>Post Area</Typography>
        </Grid>
        <Grid className='member-display' sx={{ justifyContent: 'center' }} item xs={3}>
            <Grid sx={{ m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Avatar size='lg' variant ='outlined' />
              <Typography sx={{pl:3}}>{community.owner.username} (Owner)</Typography>
            </Grid>
            <Divider>Members</Divider>
            {members}
        </Grid>

        </Grid>
      </Grid>

    </Box>
  )
}

export default CommunityPage
