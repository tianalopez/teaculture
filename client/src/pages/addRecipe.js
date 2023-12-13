import React, {useState, TransitionGroup } from 'react'
import { Collapse, IconButton,List, ListItem, ListItemIcon, ListItemText, Box, TextField, Grid, Typography, Button, Paper, } from '@mui/material';
import '../styles/addRecipe.css'
import EditIcon from '@mui/icons-material/Edit';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';


const AddRecipe = () => {

  return (
    <Box sx={{ flexGrow: 1, ml: 4, mr: 4, mt: 8 }}>
        <Grid sx={{mb: 5}} item xs={12}>
          <Typography variant='h3'>Create a New Recipe</Typography>
        </Grid>
      <Grid className='recipe-container' container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label='Add Title'
            defaultValue='Add Title'
            helperText='Cannot leave title blank'
          />
        </Grid>
        <Grid  item xs={4}>
          <Paper sx={{p:3}}elevation={4}>
            <Typography variant='h6'>
              Add Ingredients
            </Typography>
            <List sx={{ml:1, mr:1}} className='ingredients-list'>
              {[...Array(10).keys()].map((index) => (
                <ListItem key={index} sx={{pl:0, pr:0}}>
                  <ListItemIcon >
                    <CoffeeTwoToneIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <TextField
                      fullWidth
                      placeholder="Enter ingredient"
                      variant='standard'
                    />
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper sx={{ p: 3 }} elevation={4}>
            <Typography variant='h6'>
              Add Instructions
            </Typography>
            <List sx={{ ml: 1, mr: 1 }} className='ingredients-list'>
              {[...Array(10).keys()].map((index) => (
                <ListItem key={index}>
                  <ListItemIcon >
                    <EditIcon />
                  </ListItemIcon>
                  <ListItemText>
                    <TextField
                      fullWidth
                      placeholder="Enter instruction"
                      variant='standard'
                    />
                  </ListItemText>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={4}>
            Random
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Paper>
            Random
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button >
            Add Recipe
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AddRecipe
