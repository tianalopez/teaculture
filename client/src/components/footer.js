import React from 'react';
import { TextField, Box, Grid, Link, Button, Typography, Modal } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    <Box sx={{ mt: 4, textAlign: 'center', borderTop: '1px solid #ccc', paddingTop: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <Typography fontFamily='Dosis' variant='h4' >TEA Culture</Typography>
          <Typography fontFamily='Dosis' variant='h5'>
            Connecting and educating tea and cafe drink enthusiasts
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography fontFamily='Dosis' variant='h4'>Connect</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
            <Link href="https://github.com/tianalopez/teaculture" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
              <GitHubIcon fontSize="large" />
            </Link>
            <Box sx={{ mx: 2, borderLeft: '1px solid #ccc', height: '24px' }} />
            <Link href="https://tianalopez.hashnode.dev/" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
              <RssFeedIcon fontSize="large" />
            </Link>
            <Box sx={{ mx: 2, borderLeft: '1px solid #ccc', height: '24px' }} />
            <Link href="https://www.linkedin.com/in/tiana-lopez-728863180/" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
              <LinkedInIcon fontSize="large" />
            </Link>
            <Box sx={{ mx: 2, borderLeft: '1px solid #ccc', height: '24px' }} />
            <Link href="https://www.instagram.com/krencafe/?hl=en" target="_blank" rel="noopener noreferrer" style={{ color: 'grey', textDecoration: 'none' }}>
              <InstagramIcon fontSize="large" />
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default Footer
