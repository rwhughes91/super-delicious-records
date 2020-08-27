import React, { useState, useEffect } from 'react'
import { auth } from '../services/firebase/client'

interface UserState {
  user: firebase.User | null
  admin: boolean
  loading: boolean
}

export const UserContext = React.createContext<UserState>({
  user: null,
  admin: false,
  loading: true,
})

const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<UserState>({
    user: null,
    admin: false,
    loading: true,
  })

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setUser({
              user,
              admin: true,
              loading: false,
            })
          } else {
            setUser({
              user,
              admin: false,
              loading: false,
            })
          }
        })
      } else {
        setUser({
          user: null,
          admin: false,
          loading: false,
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={user}>{props.children}</UserContext.Provider>
}

export default UserProvider
