import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthData = () => useContext(AuthContext);


export const AuthProvider = ({children}) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

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
          navigate(`users/${user.id}/dashboard`)
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
    <AuthContext.Provider value={{ user, onAuthenticate, onLogout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}
