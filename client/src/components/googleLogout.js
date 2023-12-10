import {GoogleLogout} from '@react-oauth/google'
import React from 'react'

const clientId = '549250280107-nn1jit4h855pqmdi7fdn443sc7k2fqni.apps.googleusercontent.com';

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
