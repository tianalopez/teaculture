import React, { useEffect, useState } from 'react';
import { Button, Rating, TextField, Typography, FormControlLabel, Grid, Box} from '@mui/material';
import { MedicinalSwitch, FavoriteSwitch } from '../styles/SwitchStyles';
import { useAuth } from "../auth/authProvider";


const DrinkFilter = ({recipes, searchObj, handleSearchChange, setSelectedTags, selectedTags}) =>
  {
  const auth = useAuth()
  const onChange = (e) => {
    const name = e.target.name
    const value = (name === 'medicinal' || name === 'favorited' ? e.target.checked: e.target.value)
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
    <Box sx={{ flexGrow: 1, ml: 2, mr:2 }}>
    <form >
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{display:'flex', flexDirection:'column'}}>

        <TextField
          fontFamily='Dosis'
          name='search'
          onChange={onChange}
          value={searchObj.search}
          label='Search for Drink'
          type='search'
          variant='standard' />
        <Grid container spacing={2} sx={{display:'flex', flexDirection:'row', mt:1}}>
          <Grid item xs={12} sx={{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <Typography sx={{mr:2}}fontFamily='Dosis' variant='h6'>Filter by Rating:</Typography>
            <Rating
              sx={{mt:0.5}}
              name='avg_rating'
              value={searchObj.avg_rating}
              onChange={onChange}/>
          </Grid>
        </Grid>
        <Typography fontFamily='Dosis' variant='h6' >Filter by Tags:</Typography>
        <Grid container spacing={2} sx={{ mt:0,display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Grid item xs={12} sx={{display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button
              className={selectedTags.includes('caffeine') ? 'filter-tag-clicked' : 'filter-tag'}
              variant={selectedTags.includes('caffeine') ? 'contained': 'outlined'}
              name="caffeine"
              onClick={handleClick}>Caffeine</Button>
            <Button
                  className={selectedTags.includes('creamy') ? 'filter-tag-clicked' : 'filter-tag'}
              variant={selectedTags.includes('creamy') ? 'contained': 'outlined'}
              name="creamy"
              onClick={handleClick}>Creamy</Button>
            <Button
              className={selectedTags.includes('citrusy') ? 'filter-tag-clicked' : 'filter-tag'}
              variant={selectedTags.includes('citrusy') ? 'contained': 'outlined'}
              name="citrusy"
              onClick={handleClick}>Citrusy</Button>
          </Grid>
        </Grid>
            <Grid container spacing={2} sx={{ mt: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

                <Button
                  className={selectedTags.includes('spiced') ? 'filter-tag-clicked' : 'filter-tag'}
                  variant={selectedTags.includes('spiced') ? 'contained': 'outlined'}
                  name="spiced"
                  onClick={handleClick}>Spiced</Button>

              <Button
                className={selectedTags.includes('herbal') ? 'filter-tag-clicked' : 'filter-tag'}
                variant={selectedTags.includes('herbal') ? 'contained': 'outlined'}
                name="herbal"
                onClick={handleClick}>Herbal</Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ mt: 0, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

              </Grid>
            </Grid>
        <Grid container spacing={2} sx={{display: 'flex', flexDirection:'row', justifyContent:'center'}}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            {auth.user ? (
              <FormControlLabel
              label={<Typography fontSize={'1.2rem'} fontFamily= 'Dosis'>Favorited</Typography>}
              labelPlacement='start'
              sx={{ ml: 0, mr: 2 }}
              control={<FavoriteSwitch
                name="favorited"
                checked={searchObj.favorited}
                onChange={onChange}
                />}
                />
                ): null}
                <FormControlLabel
                  label={<Typography fontSize={'1.2rem'} fontFamily='Dosis'>Medicinal Drink</Typography>}
                  labelPlacement='start'
                  sx={{ml:0}}
                  control={
                  <MedicinalSwitch
                    name="medicinal"
                    checked={searchObj.medicinal}
                    onChange={onChange}
                  />}
                />
          </Grid>
        </Grid>
        </Grid>

      </Grid>
    </form>

    </Box>

  )
}

export default DrinkFilter
