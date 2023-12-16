import React, { useState, useEffect } from 'react';
import { Box, Card, CardContent, Avatar, Modal, Divider, Grid, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { Textarea, Input } from '@mui/joy';
import { useAuth } from '../auth/authProvider';
import { useFormik } from "formik";
import * as yup from "yup";
import { useUI } from '../components/UIContext';

const PostCard = ({post}) => {
  const auth = useAuth()
  const { handleNewAlert, handleAlertType } = useUI()


  return (
    <Card sx={{ p: 1 }}>
      <CardContent sx={{ pb: 0, display: 'flex', alignItems: 'center' }}>
        <Avatar size='lg' variant='outlined' />
        <Typography sx={{ pl: 3 }}>Username</Typography>
        <Typography sx={{ marginLeft: 'auto' }}>Date</Typography>
      </CardContent>
      <CardContent >
        <Typography>This would be the content of whatever the post is</Typography>
      </CardContent>
      <Divider></Divider>
      <CardContent style={{ paddingBottom: 2 }} sx={{ pb: 0, display: 'flex', alignItems: 'center' }}>
        <Button sx={{ marginLeft: 'auto' }}>Edit</Button>
        <Button>Delete</Button>
      </CardContent>
    </Card>
  )
}

export default PostCard
