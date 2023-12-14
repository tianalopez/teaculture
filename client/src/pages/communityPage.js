import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Grid, Button, Typography, Rating, Paper, CircularProgress } from '@mui/material';


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
  console.log(community)
  console.log(id)
  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h3'>
            {community.name}
          </Typography>
        </Grid>
        <Grid item xs={9}>
          <Typography>Filter</Typography>
        </Grid>
        <Grid sx={{ p: 2, backgroundColor: 'white', justifyContent: 'center' }} item xs={3}>
          <Grid container spacing={2}>
          </Grid>
        </Grid>
      </Grid>

    </Box>
  )
}

export default CommunityPage
