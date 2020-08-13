import { useState, useReducer } from 'react'
import classes from './AuthForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'
import FormButton from '../UI/Buttons/FormButton/FormButton'

interface Action {
  type: string
  key: string
  value: string
}

interface InputState {
  value: string
  valid: boolean
}

interface State {
  email: InputState
  password: InputState
  confirmPassword: InputState
  formIsValid: boolean
  [key: string]: InputState | boolean
}

interface Props {
  onSubmit: () => void
}

const initialState: State = {
  email: { value: 'size', valid: false },
  password: { value: 'color', valid: false },
  confirmPassword: { value: '1', valid: true },
  formIsValid: false,
}

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'change': {
      const newState: State = {
        ...state,
        [action.key]: { value: action.value, valid: true },
      }
      let formIsValid = true
      for (const key in newState) {
        if (key === 'email' || key === 'password' || key === 'confirmPassword') {
          formIsValid = newState[key].valid && formIsValid
        }
      }
      return {
        ...newState,
        formIsValid,
      }
    }
    default:
      return state
  }
}

const AuthForm: React.FC<Props> = (props) => {
  const [formData, dispatchFormData] = useReducer(reducer, initialState)
  const [isSignUp, setIsSignUp] = useState(false)

  const onIsSignUpClickHandler = () => {
    setIsSignUp((prevState) => !prevState)
  }
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    props.onSubmit()
  }

  return (
    <div className={classes.Profile}>
      <h6 className={classes.Title}>{isSignUp ? 'Sign Up' : 'Log In'}</h6>
      <form className={classes.AuthForm} onSubmit={onSubmitHandler}>
        <ContactInput type="input" defaultValue="Email" />
        <ContactInput type="input" defaultValue="Password" />
        {isSignUp && <ContactInput type="input" defaultValue="Confirm Password" />}
        <FormButton styles={{ width: '90%' }}>{isSignUp ? 'Sign Up' : 'Log In'}</FormButton>
      </form>
      <button
        style={{
          color: 'var(--light-purple-color)',
          fontSize: '1.4rem',
          outline: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
        onClick={onIsSignUpClickHandler}
      >
        {isSignUp ? 'Log In' : 'Sign Up'}
      </button>
    </div>
  )
}

export default AuthForm
