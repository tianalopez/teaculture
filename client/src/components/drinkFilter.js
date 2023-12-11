import React, { useEffect, useState } from 'react';
import { Rating, TextField, Typography} from '@mui/material';


const DrinkFilter = ({recipes, searchObj, handleSearchChange}) => {

  //!filters:
  //~ keep adding more filters to this one
  //!search based on title

  const onChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    console.log(value, typeof(value))
    handleSearchChange(name, value)
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
        <Typography>Filter by Rating:</Typography>
        <Rating
          name='avg_rating'
          value={searchObj.avg_rating}
          onChange={onChange}/>
    </form>
    </>
  )
}

export default DrinkFilter
