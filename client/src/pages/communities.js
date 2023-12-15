import React, {useState, useEffect} from 'react';
import CommunityCard from '../components/communityCard';
import { TextField, Box, Grid, Button, Typography, Modal } from '@mui/material';
import {Textarea, Input} from '@mui/joy';
const Communities = () => {
  const [communities, setCommunities] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
          <Button onClick={handleOpen} variant='outlined'>Create a new community</Button>
          <Modal id='community-modal' open={open} onClose={handleClose}>
            <div className='modal-container'>
              <h1 className="modal-title">Add a New Community</h1>
              <form className='modal-form'>
                <Typography sx={{mt:2}}>Add the name of your new community</Typography>
                <Input variant='outlined' sx={{mb:2}} placeholder='Community name...' name='name'/>
                <Typography>Give a short description about your community</Typography>
                <Textarea className='com-input' placeholder='Add your description...' variant='outlined' minRows={4} name='description' />
                <Button sx={{mt:2}} variant='contained' type='submit'>Add Community</Button>
              </form>
            </div>
          </Modal>
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
