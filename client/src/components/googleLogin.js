import { GoogleLogin } from '@react-oauth/google';

const clientId = '549250280107-nn1jit4h855pqmdi7fdn443sc7k2fqni.apps.googleusercontent.com'

const GLogin = () => {

  const handleLogin = async (response) => {
    const {tokenId} = response
    try {
      const googleResponse = await fetch('/googlelogin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({tokenId}),
      })
      //! this will have the user and a response code and you need to conditionally render  this login version inside authProvider, to make it conditional on if this login happens or if the usual login happens
      const googleData = await googleResponse.json()
    } catch (error) {
      console.log(error)
    }
  }

  const handleFailure = () => {
    console.log("Failed")
  }
  return (

  <>
    <GoogleLogin
      clientId={clientId}
      buttonText="Google Login"
      onSuccess={handleLogin}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  </>
  )
}

export default GLogin
