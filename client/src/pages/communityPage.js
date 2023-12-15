import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Avatar, Modal, Divider, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import '../styles/communityPage.css';
import { useAuth } from '../auth/authProvider';
import { useFormik } from "formik";
import * as yup from "yup";
import { Textarea, Input } from '@mui/joy';

const CommunityPage = () => {
  const auth = useAuth()
  const {id} = useParams()
  const [community, setCommunity] = useState()
  const [render, setRender] = useState(false)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    Promise.all([
      fetch(`/communities/${id}`).then((r) => r.json())
    ])
    .then((data) => {
      setCommunity(data[0])
      formik.setValues({
        name: data[0].name,
        description: data[0].description,
        owner_id: auth.user ? auth.user.id : null,
      });
    })
    .catch(err => console.log(err))
  },[id, render])

  const communitySchema = yup.object().shape({
    name: yup.string().required("Please enter a valid name").min(2, 'Name must be at least 2 characters'),
    description: yup.string().required("Please enter a valid description").min(3, 'Description must be at least 3 characters')
  })


  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      owner_id: auth.user ? auth.user.id : null,
    },
    validationSchema: communitySchema,
    onSubmit: (values) => {
      fetch(`/communities/${community.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(r => r.json)
      .then(() => setRender((status) => !status))
      .catch((err) => console.log(err))
      handleClose()
      formik.handleReset()
    }
  })
  if (!community ) {
    return <CircularProgress />
  }

  const members = community.users.map((user) => (
    <Grid key={user.id} sx={{ m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Avatar size='sm' variant='outlined' />
      <Typography sx={{ pl: 3 }}>{user.username} </Typography>
    </Grid>
  ))

  const handleJoin = () => {
    fetch(`/usercommunities`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({user_id: auth.user.id, community_id: community.id})
    })
    .then(r => r.json())
    .then((newUC) => setRender((status) => !status))
    .catch((err) => console.log(err))

  }

  const handleLeave = (e) => {

    if (e.target.name === 'delete') {
      fetch(`/communities/${community.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(r => r.json())
        .then(() => {
          setRender((status) => !status)
          navigate('/communities')
        })
        .catch(err => console.log(err))
    }
    else {
      fetch(`/usercommunities/${auth.user.id}/${community.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(() => setRender((status) => !status))
      .catch(err => console.log(err))
    }
  }




  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant='h3'>{community.name}</Typography>
          <Typography>{community.users.length} Member(s) | Created XX/XX</Typography>
        </Grid>
        <Grid sx={{display: 'flex', alignSelf:'center', alignContent:'flex-end'}} item xs={3}>
          {community.users.find((userObj) => userObj.id === auth.user.id) && community.owner_id === auth.user.id?
          <Button name='delete' onClick={(e) => handleLeave(e)}>Delete Community</Button> : null}
          {community.users.find((userObj) => userObj.id === auth.user.id) && community.owner_id === auth.user.id ?
            <Button onClick={handleOpen}>Edit Community</Button> : null}
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
            {community.users.find((userObj) => userObj.id === auth.user.id) ?
            null: <Button onClick={handleJoin}>Join Community</Button>}
            {community.users.find((userObj) => userObj.id === auth.user.id) && community.owner_id !== auth.user.id ?
            <Button name='leave' onClick={(e) => handleLeave(e)} >Leave Community</Button> : null}
        </Grid>

        </Grid>
      </Grid>
      <Modal id='community-modal' open={open} onClose={handleClose}>
        <div className='modal-container'>
          <h1 className="modal-title">Edit Community</h1>
          <form className='modal-form'>
            <Typography sx={{ mt: 2 }}>Edit name</Typography>
            <Input value={formik.values.name} onChange={formik.handleChange} variant='outlined' sx={{ mb: 2 }} placeholder='Community name...' name='name' />
            <Typography>Edit description</Typography>
            <Textarea value={formik.values.description} onChange={formik.handleChange} className='com-input' placeholder='Edit your description...' variant='outlined' minRows={4} name='description' />
            <Button onClick={formik.handleSubmit} sx={{ mt: 2 }} variant='contained' type='submit'>Update Community</Button>
          </form>
        </div>
      </Modal>
    </Box>
  )
}

export default CommunityPage
