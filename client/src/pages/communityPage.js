import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Avatar, Modal, Divider, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import '../styles/communityPage.css';
import { useAuth } from '../auth/authProvider';
import { useFormik } from "formik";
import * as yup from "yup";
import { Textarea, Input } from '@mui/joy';
import { useUI } from '../components/UIContext';
import PostCard from '../components/postCard';

const CommunityPage = () => {
  const auth = useAuth()
  const {id} = useParams()
  const [community, setCommunity] = useState()
  const [posts, setPosts] = useState()
  const [render, setRender] = useState(false)
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { handleNewAlert, handleAlertType } = useUI()


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

    fetch(`/communities/${id}/posts`)
    .then(r => r.json())
    .then(setPosts)
    .catch((err) => console.log(err))

  },[id, render])

  //!COMMUNITY ACTIONS
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
      .then(() => {
        setRender((status) => !status)
        handleNewAlert('Community Updated!')
        handleAlertType('success')
      })
      .catch((err) => {
        handleNewAlert(err.error)
        handleAlertType('error')
      })
      handleClose()
      formik.handleReset()
    }
  })
  //!POST ACTIONS
  const postSchema = yup.object().shape({
    content: yup.string().required("Please enter a valid post").min(3, "Post must be at least 3 characters").max(5000, "Post cannot exceed 5000 characters")
  })
  const postFormik = useFormik({
    initialValues: {
      content: "",
      author_id: auth.user?auth.user.id:null
    },
    validationSchema: postSchema,
    onSubmit: (values) => {
      //!CONDITIONAL LOGIC IF EDIT
      console.log(values)
      fetch(`/communities/${id}/posts`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(r => r.json())
      .then((newPost) => {
        console.log(newPost)
        setPosts([...posts, newPost])
        handleNewAlert('Post Added!')
        handleAlertType('success')
      })
      .catch(err => {
        handleNewAlert(err.error)
        handleAlertType('error')
      })
      postFormik.handleReset()
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
    .then((newUC) => {
      setRender((status) => !status)
      handleNewAlert('Joined Community!')
      handleAlertType('success')
    })
    .catch((err) => {
      handleNewAlert(err.error)
      handleAlertType('error')
    })

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
          handleNewAlert('Community Deleted!')
          handleAlertType('success')
          navigate('/communities')
        })
        .catch(err => {
          handleNewAlert(err.error)
          handleAlertType('error')
        })
    }
    else {
      fetch(`/usercommunities/${auth.user.id}/${community.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(r => r.json())
      .then(() => {
        setRender((status) => !status)
        handleNewAlert('Left Community...Come back soon!')
        handleAlertType('success')
      })
      .catch(err => {
        handleNewAlert(err.error)
        handleAlertType('error')
      })
    }
  }

  //!POSTS SECTION
  //display posts
  const postCards = posts.map((post) => (
    <PostCard key={post.id} post={post}/>
  ))
    console.log(posts)
  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={9}>
          <Typography variant='h4'>{community.name}</Typography>
          <Typography variant ='h6'>{community.users.length} Member(s) | Created: {new Date(community.created_at).toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',})}</Typography>
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
        <Grid item xs={6} sx={{pr:2, display: 'flex', flexDirection:'column'}}>
          <Card sx={{p:1, mb:3}}>
            <CardContent sx={{ pb: 0,display: 'flex', alignItems: 'center' }}>
              <Avatar size='lg' variant='outlined' />
              <Textarea name='content' onChange={postFormik.handleChange} value={postFormik.values.content} sx={{ flexGrow: 1, ml: 2 }} minRows={2} placeholder="What's on your mind?" aria-label='input text'/>
                <Button onClick={postFormik.handleSubmit} type='submit' sx={{ marginLeft: 'auto' }}>Post</Button>
            </CardContent>
          </Card>
          {postCards}
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
