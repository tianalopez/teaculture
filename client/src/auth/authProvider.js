import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import {gapi} from 'gapi-script'

const AuthContext = createContext(null);

export const AuthData = () => useContext(AuthContext);

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const AuthProvider = ({children}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  //~~~~~~~~~~~~~~~~~~~~GLOGIN or REGISTER

  // useEffect(() => {
  //   const start = async () => {
  //     try {
  //       await gapi.client.init({
  //         clientId: clientId,
  //         scope: ""
  //       });
  //       console.log("Google API initialized successfully");
  //     } catch (error) {
  //       console.error("Error initializing Google API:", error);
  //       // Handle the initialization error as needed
  //     }
  //   };

  //   gapi.load('client:auth2', start);
  // }, []);

  const onGLogin = async (id_token) => {
    try {
      const googleResponse = await fetch('/googlelogin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_token: id_token }),
      })
      //! this will have the user and a response code and you need to conditionally render  this login version inside authProvider, to make it conditional on if this login happens or if the usual login happens
      const googleData = await googleResponse.json()
    } catch (error) {
      console.log(error)
    }
  }


  //values is from formik
  //~~~~~~~~~~~~~~~~~~~~LOGIN
  const onAuthenticate = (values, signUp) => {
    fetch(signUp ? "/register" : "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((resp) => {
        console.log(resp)
        if (resp.ok) {
          console.log("The issue is after a good response")
          resp.json().then((user) => {
          setUser(user)
          //!double check this navigation, but you do need to navigate at some point
          navigate(`users/${user.id}/dashboard`, {replace: true})
          });
          // handleNewAlert("Welcome!");
          // handleAlertType("success");
        } else {
          resp.json().then((errorObj) => {
            console.log("There was a bad response")
            // handleNewAlert(errorObj.error);
            // handleAlertType("error");
          });
        }
      })
      .catch((err) => {
        // handleNewAlert(err.error);
        // handleAlertType("error");
      });
  }
  //~~~~~~~~~~~~~~~~~~~~CHECK REFRESH
  //!Should be triggered by a useEffect where it is located
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  const checkRefresh = () => {
    if (!user) {
      fetch("/current-user")
        .then((resp) => {
          if (resp.ok) {
            resp
              .json()
              .then((updatedUser => {
                setUser(updatedUser)
                //!this may need to change for navigation
                navigate(`/users/${updatedUser.id}/dashboard`)
              }))
          } else if (resp.status === 401) {
            fetch("/refresh", {
              method: "POST",
              headers: {
                'X-CSRF-TOKEN': getCookie('csrf_refresh_token'),
              }
            })
              .then(resp => {
                if (resp.ok) {
                  resp
                    .json()
                    .then((updatedUser => {
                      setUser(updatedUser)
                      //!this may need to change for navigation
                      navigate(`/users/${updatedUser.id}/dashboard`)
                    }))
                } else {
                  resp
                    .json()
                    .then(console.log('Not Authorized'))
                }
              })
          }
        })
        .catch((err) => {
          // handleNewAlert(err.error);
          // handleAlertType("error");
        });
    } else {
      navigate(`/users/${user.id}/dashboard`);
    }
  }
  useEffect(() => {
    checkRefresh()
  }, [user])

  //~~~~~~~~~~~~~~~~~~~~LOGOUT
  const onLogout = () => {
    fetch("/logout", { method: "DELETE" })
      .then(() => {
        setUser(null)
        navigate("/")
      })
      .catch(err => console.log(err));
  };


  return (
    <AuthContext.Provider value={{ user, onAuthenticate, onLogout, onGLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
