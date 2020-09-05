import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { auth } from '@services/firebase/client'

export interface UserState {
  user: firebase.User | null
  idToken: string | null
  admin: boolean
  loading: boolean
  errorMessage: string | null
}

interface ContextState {
  user: UserState
  setError: (x: string) => void
  logoutHandler: () => void
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential | null>
  signUp: (email: string, password: string) => Promise<firebase.auth.UserCredential | null>
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
  logoutHandler: () => null,
  login: async () => null,
  signUp: async () => null,
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

  const logoutHandler = useCallback(() => {
    if (user.user) {
      auth.signOut()
      setUser({
        user: null,
        idToken: null,
        admin: false,
        loading: false,
        errorMessage: null,
      })
    }
  }, [user.user])

  const login = useCallback(async (email: string, password: string) => {
    try {
      return auth.signInWithEmailAndPassword(email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const signUp = useCallback(async (email: string, password: string) => {
    try {
      return auth.createUserWithEmailAndPassword(email, password)
    } catch (error) {
      throw new Error(error.message)
    }
  }, [])

  const userPackage = useMemo(() => {
    return { user, setError, logoutHandler, login, signUp }
  }, [user, setError, logoutHandler, login, signUp])

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
