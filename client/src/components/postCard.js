import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Avatar, Modal, Divider, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { Textarea, Input } from '@mui/joy';
import { useAuth } from '../auth/authProvider';
import { useFormik } from "formik";
import * as yup from "yup";
import { useUI } from '../components/UIContext';

const PostCard = ({post, handleEdit, edit, postFormik, setSelectedPost, setRender}) => {
  const auth = useAuth()
  const { handleNewAlert, handleAlertType } = useUI()
  const [thisPost, setThisPost] = useState()


  const handleDelete = () => {
    fetch(`/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(r => r.json())
    .then(() => {
      handleNewAlert('Post Deleted!')
      handleAlertType('success')
      setRender((status) => !status)
    })
    .catch((err) => {
      handleNewAlert(err.error)
      handleAlertType('error')
    })
  }

  return (
    <Card sx={{ mb: 2, p: 1, backgroundColor: '#F6F5F3', borderRadius: '20px' }}>
      <CardContent sx={{ pb: 0, display: 'flex', alignItems: 'center' }}>
        <Avatar size='lg' variant='outlined' />
        <Typography sx={{ fontFamily: 'Dosis', fontSize: '1.2rem',pl: 3 , fontWeight:'bold'}}>{post.author.username}</Typography>
        <Typography sx={{ fontFamily: 'Dosis', fontSize: '1.2rem' ,marginLeft: 'auto' }}>{new Date(post.created_at).toLocaleString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })}</Typography>
      </CardContent>
      <CardContent >
        {edit && thisPost && thisPost.id === post.id ? <Textarea name='content' onChange={postFormik.handleChange} value={postFormik.values.content} sx={{ flexGrow: 1, ml: 2 }} minRows={2} onBlur={postFormik.handleSubmit} aria-label='input text' />

          : <Typography sx={{ fontFamily: 'Gaegu', fontSize: '1.2rem' }}>{post.content}</Typography>}
      </CardContent>
      <Divider></Divider>
      <CardContent style={{ paddingBottom: 2 }} sx={{ pb: 0, display: 'flex', alignItems: 'center' }}>
        {auth.user && auth.user.id === post.author_id ? <Button
          className='filter-tag-clicked'
          sx={{ marginLeft: 'auto' }} onClick={() => {
          handleEdit(true)
          setSelectedPost(post)
          setThisPost(post)
          }}>Edit</Button> : null}
        {auth.user && auth.user.id === post.author_id ? <Button
          sx={{ml:1}}
          className='filter-tag-clicked'
          onClick={handleDelete}
        >Delete</Button> : null}
      </CardContent>
    </Card>
  )
}

export default PostCard
