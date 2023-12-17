import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Grid, Box, Typography, TextField, Card, ListItemText,CardContent, ListItemIcon,ListItemButton,Divider, Button, ListItem,  } from '@mui/material';
import { useAuth } from '../auth/authProvider';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import PeopleTwoToneIcon from '@mui/icons-material/PeopleTwoTone';
import RecipeCard from '../components/recipeCard';

const Dashboard = () => {
  const auth = useAuth()
  const [myRecipes, setMyRecipes] = useState()
  const [siphub, setSiphub] = useState([])
  const [quote, setQuote] = useState()
  const [recipe, setRecipe] = useState()
  const [notifications, setNotifications] = useState([])
  const width = 400


  //!BIG FETCH
  useEffect(() => {
    //*RECIPES
    fetch('/recipes')
    .then(r => r.json())
    .then((recipes) => {
      let my_recipes = recipes.filter((recipe) => recipe.creator_id === auth.user.id)
      setMyRecipes(my_recipes)
    })
    .catch((err) => console.log(err))
    //*POSTS
    fetch('/posts')
      .then((r) => r.json())
      .then((posts) => {
        let my_posts = posts
          .filter((post) => post.author_id === auth.user.id)
          .map((post) => ({
            type: 'post',
            community: post.community.name,
            date: new Date(post.created_at),
          }));
        setSiphub((old) => [...old.filter((item) => item.type !== 'post' || item.content !== my_posts[0].content), ...my_posts]); setSiphub((old) => [...old.filter((item) => item.type !== 'post' || item.content !== my_posts[0].content), ...my_posts]);
      })
      .catch(err => console.log(err))
    //*COMMUNITIES
    fetch('/usercommunities')
      .then((r) => r.json())
      .then((ucs) => {
        let joined_cs = ucs
          .filter((uc) => uc.user_id === auth.user.id)
          .map((uc) => ({
            type: 'community',
            name: uc.community.name,
            date: new Date(uc.created_at),
          }));
        setSiphub((old) => [
          ...old.filter((item) => item.type !== 'community' || !joined_cs.some((community) => community.name === item.name)),
          ...joined_cs,
        ]);
      })
      .catch(err => console.log(err))

    //*REVIEWS
    fetch('/reviews').then(r=> r.json())
    .then((reviews) => {
      let my_revs = reviews
        .filter((rev) => rev.recipe.creator_id === auth.user.id)
        .map((rev) => ({
          type:'review',
          user: rev.user.username,
          recipe: rev.recipe.title,
          date: new Date(rev.created_at)
        }))
      setNotifications((old) => [
        ...old.filter((item) => item.type !== 'review' || !my_revs.some((review) => review.comment === item.comment)), ...my_revs
      ])
    })
    .catch(err => console.log(err))
    //*FAVORITES
    fetch('/favorites').then(r => r.json())
    .then((favs) => {
      let my_favs = favs
        .filter((fav) => fav.recipe.creator_id === auth.user.id)
        .map((fav) => ({
          type:'favorite',
          id: fav.id,
          user: fav.user.username,
          recipe: fav.recipe.title,
          date: new Date(fav.created_at)
        }))
      setNotifications((old) => [
        ...old.filter((item) => item.type !== 'favorite' || !my_favs.some((favor) => favor.id === item.id)), ...my_favs
      ])
    } )
    //*QUOTES
    fetch("https://api.quotable.io/random").then(r => r.json())
      .then(setQuote)
      .catch(err => console.log(err))

    //*RECIPE
    fetch('/recipes').then(r=> r.json())
    .then((recipes) => {
      const rec = recipes[Math.floor(Math.random()*recipes.length)]
      setRecipe(rec)
    })
    .catch(err => console.log(err))

  }, [])
  //!RECIPES
  const displayedRecipes = myRecipes?.map((recipe) => (
    <ListItemButton key={recipe.id} component={Link} to={`/drinklab/${recipe.id}`}>
      <ListItemIcon>
        <PostAddOutlinedIcon />
      </ListItemIcon>
      <ListItemText>
        <Typography>{recipe.title} ({new Date(recipe.created_at).toLocaleString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })})</Typography>
      </ListItemText>
    </ListItemButton>
  ))
  //!SIPHUB
  const sortedSiphub = [...siphub].sort((a, b) => b.date - a.date);

  const displayedSiphub = sortedSiphub.map((item) => (
    <ListItemButton key={item.id}>
      <ListItemIcon>
        <PeopleTwoToneIcon />
      </ListItemIcon>
      <ListItemText>
        {item.type === 'community' ? (
          <Typography>{`Joined ${item.name} on ${item.date.toLocaleString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })}`}</Typography>
        ) : (
          <Typography>{`Posted in ${item.community} on ${item.date.toLocaleString('en-US', {
          month: 'long', day: 'numeric', year: 'numeric',
        })}`}</Typography>
        )}
      </ListItemText>
    </ListItemButton>
  ));
  //!NOTIFICATIONS
  const sortedNotifications = [...notifications].sort((a, b) => b.date - a.date)

  const displayedNotifications = sortedNotifications.map((item) => (
    <ListItemButton key={item.id}>
      <ListItemIcon>
        <PeopleTwoToneIcon />
      </ListItemIcon>
      <ListItemText>
        {item.type === 'community' ? (
          <Typography>{`New review on ${item.recipe} from ${item.user} on ${item.date.toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}`}</Typography>
        ) : (
          <Typography>{`${item.user} liked your recipe, ${item.recipe} on ${item.date.toLocaleString('en-US', {
            month: 'long', day: 'numeric', year: 'numeric',
          })}`}</Typography>
        )}
      </ListItemText>
    </ListItemButton>
  ));



  return (
    <Box sx={{ flexGrow: 1, ml: 0, mr: 4, mt: 8, mb:8 }}>
      <Grid sx={{ml:0}}container spacing={2}>
        <Grid sx={{ pl: '16px' }} item xs={12}>
          <Typography variant='h3'>Welcome, {auth.user.username}</Typography>
        </Grid>
        <Grid sx={{mt:3, pl:0}} container spacing={2}>
          <Grid item xs={8} >
            <Grid sx={{ml:0}} container spacing={2}>
              <Grid item xs={6}>
                <Card sx={{ overflow: 'hidden', overflowY: 'scroll',minHeight: 400, maxHeight: 400,width: '100%', display:'flex', mr:1 }}>
                  <CardContent>
                    <Typography variant='h6'>My Recipes</Typography>
                    {displayedRecipes}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ overflow: 'hidden', overflowY: 'scroll',minHeight: 400, maxHeight: 400,width: '100%',display: 'flex', mr:1 }}>
                  <CardContent>
                    <Typography variant='h6'>SipHub Activity</Typography>
                    {displayedSiphub}
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>
                <Card sx={{ overflow: 'hidden', overflowY: 'scroll',minHeight: 200, maxHeight: 200, width: '100%', display: 'flex', mr: 1 }}>
                  <CardContent>
                    <Typography variant='h6'>Notifications</Typography>
                    {displayedNotifications}
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid sx={{ pt: 0, '&&': { paddingTop: 0 } }} item xs={4}>
            <Grid container spacing={2} sx={{ mt:0,pl:2,display: 'flex', 'flexDirection':'column'}}>
              <Grid item xs={12}>
                <Card sx={{ overflow: 'hidden', overflowY: 'scroll',minHeight: 200, maxHeight: 200, width: '100%', display: 'flex' }}>
                  <CardContent>
                    <Typography variant='h6'>Quote of the Day</Typography>
                    <Typography sx={{mt:2}}>"{quote?.content}"</Typography>
                    <Typography sx={{ mt: 2 }}>-{quote?.author}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12}>

              <Card sx={{ justifyContent: 'center',overflow: 'hidden',  overflowY: 'scroll',minHeight: 400, maxHeight: 400, width: '100%', display: 'flex' }}>
                <CardContent sx={{pb:0}}>
                  <Typography variant='h6'>Random Recipe</Typography>
                  <RecipeCard recipe={recipe} width={width}/>
                </CardContent>
              </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Box>
  )
}

export default Dashboard
