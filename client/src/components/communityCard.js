import React from 'react';
import { Link } from "react-router-dom";
import { Button, Typography, Card, CardContent, CardActions } from '@mui/material';

const CommunityCard = ({community}) => {
  return (
    <Card sx={{ maxWidth: 345, minHeight: 200, maxHeight: 200 }}>
      <CardContent sx={{textAlign:'center', overflow:'hidden'}} >
        <Typography variant="h6" component='div'>{community.name}</Typography>
        <Typography variant='body2' color='text.secondary'>{community.description}</Typography>
      </CardContent>
      <CardActions sx={{justifyContent: 'center'}}>
        <Button component={Link} to={`/communities/${community.id}`}>
          Visit Community
        </Button>
      </CardActions>
    </Card>
  )
}

export default CommunityCard
