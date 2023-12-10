import {GoogleLogout} from '@react-oauth/google'
import React from 'react'

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GLogout = () => {

  const onLogout = () => {
    console.log('logged out')
  }

  return (
    <>
      <GoogleLogout
        clientId={clientId}
        buttonText={'Logout'}
        onLogoutSuccess={onLogout}
      />
    </>
  )
}

export default GLogout
