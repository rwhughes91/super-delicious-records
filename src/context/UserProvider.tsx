import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { auth } from '../services/firebase/client'

interface UserState {
  user: firebase.User | null
  idToken: string | null
  admin: boolean
  loading: boolean
  errorMessage: string | null
}

interface ContextState {
  user: UserState
  setError: (x: string) => void
}

export const UserContext = React.createContext<ContextState>({
  user: {
    user: null,
    idToken: null,
    admin: false,
    loading: true,
    errorMessage: null,
  },
  setError: () => null,
})

const UserProvider: React.FC = (props) => {
  const [user, setUser] = useState<UserState>({
    user: null,
    idToken: null,
    admin: false,
    loading: true,
    errorMessage: null,
  })

  const setError = useCallback((message: string) => {
    setUser((prevUserState) => {
      return { ...prevUserState, errorMessage: message }
    })
  }, [])

  const userPackage = useMemo(() => {
    return { user, setError }
  }, [user, setError])

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(function (user) {
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims.admin) {
            setUser({
              user,
              idToken: idTokenResult.token,
              admin: true,
              loading: false,
              errorMessage: null,
            })
          } else {
            setUser({
              user,
              idToken: idTokenResult.token,
              admin: false,
              loading: false,
              errorMessage: null,
            })
          }
        })
      } else {
        setUser({
          user: null,
          idToken: null,
          admin: false,
          loading: false,
          errorMessage: null,
        })
      }
    })
    return () => unsubscribe()
  }, [])

  return <UserContext.Provider value={userPackage}>{props.children}</UserContext.Provider>
}

export default UserProvider
