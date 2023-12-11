import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, TextField } from '@mui/material';

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
    </form>
    </>
  )
}

export default DrinkFilter
