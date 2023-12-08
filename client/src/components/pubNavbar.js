import React from 'react'
import { NavLink } from 'react-router-dom'
import { AppBar, Toolbar } from '@mui/material'

const PubNavbar = ({handleNewAlert}) => {

  return (
    <nav>
      <div>
        <h1>TEA Culture</h1>
        <NavLink to={"/"}>
          Home
        </NavLink>
      </div>
      <div>
        <NavLink to={"/login"}>
          Login/Register
        </NavLink>
      </div>
    </nav>
  )
}

export default PubNavbar
