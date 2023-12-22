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
  const [edit, setEdit] = useState(false)
  const [selectedPost, setSelectedPost] = useState()
  const { handleNewAlert, handleAlertType } = useUI()
  const [teas, setTeas] = useState([]);
  const [randomTeaIndex, setRandomTeaIndex] = useState(null);

  //!RANDOM TEA DISCUSSION
  useEffect(() => {
    fetch('https://boonakitea.cyclic.app/api/all')
      .then((r) => r.json())
      .then((teas) => {
        setTeas(teas);
        setRandomTeaIndex(Math.floor(Math.random() * teas.length));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleNewTopic = () => {
    setRandomTeaIndex(Math.floor(Math.random() * teas.length));
  };




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
      if (edit) {
        fetch(`/posts/${selectedPost.id}`, {
          method: "PATCH",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(values)
        })
        .then(r => r.json())
        .then(() => {
          setRender((status) => !status)
          setEdit(false)
          handleNewAlert('Post Updated!')
          handleAlertType('success')
          setSelectedPost(null)
          postFormik.handleReset()
        })
        .catch((err) => {
          handleNewAlert(err.error)
          handleAlertType('error')
        })

      }
      else {
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
    }
  })

  // fill form if editing
  useEffect(() => {
    postFormik.setValues({
      content: selectedPost ? selectedPost.content : "",
      author_id: auth.user.id
    })
  }, [edit])

  if (!community || !teas) {
    return <CircularProgress />
  }

  const currentTea = teas[randomTeaIndex] || {};
  console.log(currentTea)

  const members = community.users.map((user) => (
    <Grid key={user.id} sx={{ m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <Avatar size='sm' variant='outlined' />
      <Typography fontFamily='Dosis' sx={{ pl: 3 }}>{user.username} </Typography>
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
          navigate('/siphub')
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
        handleNewAlert(`Left ${community.name}...Come back soon!`)
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
  const postCards = posts?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .map((post) => (
    <PostCard key={post.id} post={post} handleEdit={setEdit} edit={edit} postFormik={postFormik} setSelectedPost={setSelectedPost} setRender={setRender} selectedPost={selectedPost}/>
  ))


  return (
    <Box sx={{ flexGrow: 1, ml: 2, mr: 4, mt: 4, mb: 8 }}>
      <Grid sx={{ ml: 0 }} container spacing={2}>
        <Grid item xs={9}>
          <Typography sx={{ml:0}} fontFamily='Dosis' variant='h3'>{community.name}</Typography>
          <Typography fontFamily='Dosis' variant ='h6'>{community.users.length} Member(s) | Created: {new Date(community.created_at).toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',})}</Typography>
        </Grid>
        <Grid sx={{display: 'flex', alignSelf:'center', alignContent:'flex-end'}} item xs={3}>
          {community.users.find((userObj) => userObj.id === auth.user.id) && community.owner_id === auth.user.id?
          <Button sx={{mr:1}}className='filter-tag-selected' name='delete' onClick={(e) => handleLeave(e)}>Delete Community</Button> : null}
          {community.users.find((userObj) => userObj.id === auth.user.id) && community.owner_id === auth.user.id ?
            <Button className='filter-tag-selected' onClick={handleOpen}>Edit Community</Button> : null}
        </Grid>
      <Grid sx={{mt:3}} container spacing={2}>
        <Grid sx={{}}item xs={3}>
          <Paper sx={{p:2, height: '25vh',backgroundColor: '#F6F5F3', borderRadius: '20px' }}>
              <Typography fontFamily='Dosis' variant='h6'>About</Typography>
              <Typography fontFamily='Dosis' sx={{p: 1}}>{community.description}</Typography>
          </Paper>
            <Paper sx={{
              mt: 2,
              p: 2,
              height: '45vh',
              backgroundColor: '#F6F5F3',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative',
              overflowY: 'hidden',
            }}>
              <div style={{ textAlign: 'left', width: '100%', overflowY:'scroll' }}>
                <Typography fontFamily='Dosis' variant='h6'>
                  Topic of Discussion
                </Typography>
                <Typography fontFamily='Dosis'>Tea Name: {currentTea.name}</Typography>
                <Typography fontFamily='Dosis'>Origin: {currentTea.origin}</Typography>
                <Typography fontFamily='Dosis'>Description: {currentTea.description}</Typography>
              </div>
              <img
                alt='tea selection'
                src={currentTea.image}
                style={{
                  width: '60%',
                  height: '50%',
                  objectFit: 'cover',
                  borderRadius: '10px',
                }}
              />
              <Button sx={{mt:1}}className='filter-tag-clicked' onClick={handleNewTopic}>New Topic</Button>
          </Paper>
        </Grid>
        <Grid item xs={6} sx={{pt: 0,pr:2, display: 'flex', flexDirection:'column'}}>
            <Card sx={{ p: 1, mb: 3, backgroundColor: '#F6F5F3', borderRadius: '20px' }}>
            <CardContent sx={{ pb: 0,display: 'flex', alignItems: 'center' }}>
              <Avatar size='lg' variant='outlined' />
                <Textarea
                  disabled={community.users.find((userObj) => userObj.id === auth.user.id) ? false : true}
                  name='content' onChange={postFormik.handleChange} value={edit ? "" : postFormik.values.content} sx={{
                    flexGrow: 1, ml: 2, mr: 1, fontFamily: 'Dosis',
                    '& textarea::placeholder': {
                      fontFamily: 'Dosis',
                      fontSize: '1.2rem'
                    } }} minRows={2} placeholder="What's on your mind?" aria-label='input text'/>
                <Button
                  className='filter-tag-clicked'
                  disabled={community.users.find((userObj) => userObj.id === auth.user.id)? false: true}
                  onClick={postFormik.handleSubmit} type='submit' sx={{ marginLeft: 'auto' }}>Post</Button>
            </CardContent>
          </Card>
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{overflow: 'scroll', height: '65vh'}}>

            {postCards}
            </Grid>

          </Grid>
        </Grid>
          <Grid className='member-display' sx={{ flexDirection: 'column', display: 'flex', justifyContent: 'center', pr: '16px', pb: '16px', height: '80vh', }} item xs={3}>
            <Grid item xs={12} >
              <Grid sx={{ m: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Avatar size='lg' variant ='outlined' />
                <Typography fontFamily='Dosis' sx={{pl:3}}>{community.owner.username} (Owner)</Typography>
              </Grid>
              <Divider >Members</Divider>
              {members}
            </Grid>
            <Grid sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', textAlign: 'center' }} item xs={12}>
              {community.users.find((userObj) => userObj.id === auth.user.id) ?
                null : <Button sx={{ alignSelf: 'center' }} className='filter-tag-clicked' onClick={handleJoin}>Join Community</Button>}
              {community.users.find((userObj) => userObj.id === auth.user.id) && community.owner_id !== auth.user.id ?
                <Button className='filter-tag-clicked' sx={{ alignSelf: 'center' }} name='leave' onClick={(e) => handleLeave(e)} >Leave Community</Button> : null}
            </Grid>
        </Grid>

        </Grid>
      </Grid>
      <Modal id='community-modal' open={open} onClose={handleClose}>
        <div className='modal-container'>
          <h1 className="modal-title">Edit Community</h1>
          <form className='modal-form'>
            <Typography fontFamily='Dosis' sx={{ mt: 2 }}>Edit name</Typography>
            <Input value={formik.values.name} onChange={formik.handleChange} variant='outlined' sx={{ mb: 2 }} placeholder='Community name...' name='name' />
            <Typography fontFamily='Dosis'>Edit description</Typography>
            <Textarea value={formik.values.description} onChange={formik.handleChange} className='com-input' placeholder='Edit your description...' variant='outlined' minRows={4} name='description' />
            <Button onClick={formik.handleSubmit} sx={{ mt: 2 }} variant='contained' type='submit'>Update Community</Button>
          </form>
        </div>
      </Modal>
    </Box>
  )
}

export default CommunityPage
