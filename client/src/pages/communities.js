import React, {useState, useEffect} from 'react';
import CommunityCard from '../components/communityCard';
import { TextField, Box, Grid, Button, Typography, Modal } from '@mui/material';
import {Textarea, Input} from '@mui/joy';
import { useFormik } from "formik"
import * as yup from "yup";
import { useAuth } from '../auth/authProvider';
import { useUI } from '../components/UIContext';


const Communities = () => {
  const auth = useAuth();
  const { handleNewAlert, handleAlertType } = useUI();
  const [communities, setCommunities] = useState([])
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [render, setRender] = useState(false)

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


  const communitySchema = yup.object().shape({
    name: yup.string().required("Please enter a valid name").min(2, 'Name must be at least 2 characters'),
    description: yup.string().required("Please enter a valid description").min(3, 'Description must be at least 3 characters')
  })

  const formik = useFormik({
    initialValues: {
      name:"",
      description: "",
      owner_id: auth.user? auth.user.id : null,
    },
    validationSchema: communitySchema,
    onSubmit: (values) => {
      fetch('/communities', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(values)
      })
      .then(r => r.json())
      .then((newCom) => {
        setCommunities([...communities, newCom])
        handleNewAlert('Community Added!')
        handleAlertType('success')
      })
      .catch(err => {
        handleNewAlert(err.error)
        handleAlertType('error')
      })
      setRender(true)
      handleClose()
      formik.handleReset()
    }
  })

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
                <Input onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} variant='outlined' sx={{mb:2}} placeholder='Community name...' name='name'/>
                {formik.errors.name && formik.touched.name ? <div>{formik.errors.name}</div> : null}
                <Typography>Give a short description about your community</Typography>
                <Textarea onBlur={formik.handleBlur} value={formik.values.description} onChange={formik.handleChange} className='com-input' placeholder='Add your description...' variant='outlined' minRows={4} name='description' />
                {formik.errors.description && formik.touched.description ? <div>{formik.errors.description}</div> : null}
                <Button onClick={formik.handleSubmit} sx={{mt:2}} variant='contained' type='submit'>Add Community</Button>
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
