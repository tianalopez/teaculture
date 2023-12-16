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

  //fill form if editing PUT IN PARENT
  // useEffect(() => {
  //   postFormik.setValues({
  //     content: post.content,
  //     author_id: auth.user.id
  //   })
  // }, [edit])

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
    })
    .catch((err) => {
      handleNewAlert(err.error)
      handleAlertType('error')
    })
  }

  return (
    <Card sx={{ mb:2, p: 1 }}>
      <CardContent sx={{ pb: 0, display: 'flex', alignItems: 'center' }}>
        <Avatar size='lg' variant='outlined' />
        <Typography sx={{ pl: 3 }}>{post.author.username}</Typography>
        <Typography sx={{ marginLeft: 'auto' }}>{new Date(post.created_at).toLocaleString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })}</Typography>
      </CardContent>
      <CardContent >
        {edit ? <Textarea name='content' onChange={postFormik.handleChange} value={postFormik.values.content} sx={{ flexGrow: 1, ml: 2 }} minRows={2} placeholder="What's on your mind?" aria-label='input text' />

        :<Typography>{post.content}</Typography>}
      </CardContent>
      <Divider></Divider>
      <CardContent style={{ paddingBottom: 2 }} sx={{ pb: 0, display: 'flex', alignItems: 'center' }}>
        {auth.user && auth.user.id === post.author_id ? <Button sx={{ marginLeft: 'auto' }} onClick={() => {
          handleEdit(true)
          setSelectedPost(post)
          }}>Edit</Button> : null}
        {auth.user && auth.user.id === post.author_id ? <Button
          onClick={handleDelete}
        >Delete</Button> : null}
      </CardContent>
    </Card>
  )
}

export default PostCard
