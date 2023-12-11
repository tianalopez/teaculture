import React, { useEffect, useState } from 'react';
import { styled, Grid, Box, Typography, TextField, FormGroup, FormControlLabel, Switch } from '@mui/material';
import RatingSwitch from '../styles/SwitchStyles';

const DrinkFilter = ({recipes, searchObj, handleSearchChange}) => {

  //!filters:
  //~ keep adding more filters to this one
  //!search based on title

  const onChange = (e) => {
    console.log(e.target.name, e.target.value)
    handleSearchChange(e.target.name, e.target.value)
  }
  //!filter based on number of stars
  //!filter based on tag
  //!toggle for medicinal or not
  //!toggle for saved

  return (
    <>
    <form >
        <TextField
          name='search'
          onChange={onChange}
          value={searchObj.search}
          label='Search for Drink'
          type='search'
          variant='standard' />
        <FormControlLabel
          sx={{ml:0}}
          label="Sort by Rating"
          control={<RatingSwitch sx={{ m: 1 }} />}
          labelPlacement='start'
        />
    </form>
    </>
  )
}

export default DrinkFilter
