import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from "../auth/authProvider";

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const GLogin = () => {
  const auth = useAuth()

  const onSuccess = (response) => {
    auth.onGLogin(response)
  }

  const handleFailure = () => {
    console.log("Failed")
  }
  return (

  <>
    <GoogleLogin
      clientId={clientId}
      buttonText="Google Login"
      onSuccess={onSuccess}
      onFailure={handleFailure}
      cookiePolicy={'single_host_origin'}
      isSignedIn={true}
    />
  </>
  )
}

export default GLogin
