import React, { useEffect, useState } from 'react';
import { Button, Rating, TextField, Typography, FormControlLabel} from '@mui/material';
import { MedicinalSwitch } from '../styles/SwitchStyles';


const DrinkFilter = ({recipes, searchObj, handleSearchChange, setSelectedTags, selectedTags}) => {

  const onChange = (e) => {
    const name = e.target.name
    const value = (name === 'medicinal' ? e.target.checked: e.target.value)
    console.log(name, value)
    handleSearchChange(name, value)
  }

  const handleClick = (e) => {
    if (selectedTags.includes(e.target.name)) {
      const index = selectedTags.indexOf(e.target.name)
      const updatedTags = [...selectedTags.slice(0, index), ...selectedTags.slice(index + 1)];
      setSelectedTags(updatedTags);
    }
    else {
      setSelectedTags((currentTags) => [...currentTags, e.target.name])
    }
  }
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
          label="Medicinal Drink"
          labelPlacement='start'
          sx={{ml:0}}
          control={<MedicinalSwitch
            name="medicinal"
            checked={searchObj.medicinal}
            onChange={onChange}
          />}
        />
        <Typography>Filter by Rating:</Typography>
        <Rating
          name='avg_rating'
          value={searchObj.avg_rating}
          onChange={onChange}/>
        <Typography>Filter by Tags</Typography>
        <Button
          variant={selectedTags.includes('caffeine') ? 'contained': 'outlined'}
          name="caffeine"
          onClick={handleClick}>Caffeine</Button>
        <Button
          variant={selectedTags.includes('creamy') ? 'contained': 'outlined'}
          name="creamy"
          onClick={handleClick}>Creamy</Button>
        <Button
          variant={selectedTags.includes('citrusy') ? 'contained': 'outlined'}
          name="citrusy"
          onClick={handleClick}>Citrusy</Button>
        <Button
          variant={selectedTags.includes('herbal') ? 'contained': 'outlined'}
          name="herbal"
          onClick={handleClick}>Herbal</Button>
        <Button
          variant={selectedTags.includes('spiced') ? 'contained': 'outlined'}
          name="spiced"
          onClick={handleClick}>Spiced</Button>
    </form>
    </>
  )
}

export default DrinkFilter
