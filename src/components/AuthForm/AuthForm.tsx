import { useState, useReducer, ChangeEvent } from 'react'
import classes from './AuthForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import FormButton from '../UI/Buttons/FormButton/FormButton'
import { cloneDeep } from 'lodash'
import formValidation, { Rules } from '../../utils/formValidation'
import { auth } from '../../services/firebase/client'

interface Action {
  type: string
  key: string
  value: string
}

interface FormControls {
  email: InputProps
  password: InputProps
  confirmPassword: InputProps
}

interface State extends FormControls {
  formIsInvalid: boolean
  [key: string]: InputProps | boolean
}

interface Props {
  styles?: React.CSSProperties
  onSubmit?: () => void
}

const AuthForm: React.FC<Props> = (props) => {
  const inputControls = cloneDeep(formControls)
  const initialState: State = { ...inputControls, formIsInvalid: true }
  const [formData, dispatchFormData] = useReducer(reducer, initialState)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')

  const onIsSignUpClickHandler = () => {
    setError('')
    dispatchFormData({ type: 'toggleInvalid', key: 'confirmPassword', value: '' })
    setIsSignUp((prevState) => !prevState)
  }

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    props.onSubmit && props.onSubmit()
    if (isSignUp) {
      auth.createUserWithEmailAndPassword(
        formData.email.value.toString(),
        formData.password.value.toString()
      )
    } else {
      auth
        .signInWithEmailAndPassword(
          formData.email.value.toString(),
          formData.password.value.toString()
        )
        .catch((error) => {
          setError(error.message)
        })
    }
  }

  const onChangeHandler = (key: string, event: ChangeEvent<HTMLInputElement>) => {
    dispatchFormData({ type: 'change', key, value: event?.target.value })
  }

  return (
    <div className={classes.Profile} style={props.styles}>
      <h6 className={classes.Title}>{isSignUp ? 'Sign Up' : 'Sign In'}</h6>
      {error && <div className={classes.AuthErrorMessage}>{error}</div>}
      <form className={classes.AuthForm} onSubmit={onSubmitHandler}>
        <ContactInput
          {...formData.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('email', event)}
        />
        <ContactInput
          {...formData.password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('password', event)}
        />
        {isSignUp && (
          <ContactInput
            {...formData.confirmPassword}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onChangeHandler('confirmPassword', event)
            }
          />
        )}
        <FormButton styles={{ width: '90%' }} disabled={formData.formIsInvalid}>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </FormButton>
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

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'toggleInvalid': {
      const invalid = !(state[action.key] as InputProps).invalid
      const formIsInvalid = isFormInvalid(state, action.key, invalid)
      return {
        ...state,
        [action.key]: {
          ...(state[action.key] as InputProps),
          invalid,
        },
        formIsInvalid,
      }
    }
    case 'change': {
      let invalid
      let errorMessage
      if (action.key === 'confirmPassword') {
        const confirmPasswordValidation: Rules = {
          required: true,
          equal: [state['password'].value as string, 'Does not equal password'],
        }
        const [valid, errorMessageStr] = formValidation(action.value, confirmPasswordValidation)
        invalid = !valid
        errorMessage = errorMessageStr
      } else {
        const [valid, errorMessageStr] = formValidation(
          action.value,
          (state[action.key] as InputProps).validation as Rules
        )
        invalid = !valid
        errorMessage = errorMessageStr
      }
      const newState: State = {
        ...state,
        [action.key]: {
          ...(state[action.key] as InputProps),
          value: action.value,
          touched: true,
          invalid,
          errorMessage,
        },
      }
      const formIsInvalid = isFormInvalid(newState, action.key, invalid)
      return {
        ...newState,
        formIsInvalid,
      }
    }
    default:
      return state
  }
}

const isFormInvalid = (state: State, actionKey: string, invalid: boolean) => {
  let formIsInvalid = false
  for (const key in state) {
    if (key === 'email' || key === 'password' || key === 'confirmPassword') {
      if (key === actionKey) {
        formIsInvalid = invalid || formIsInvalid
      } else {
        formIsInvalid = (state[key].invalid as boolean) || formIsInvalid
      }
    }
  }
  return formIsInvalid
}

const formControls: FormControls = {
  email: {
    value: '',
    type: inputTypes.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    validation: { required: true, isEmail: true },
    elementConfig: {
      placeholder: 'Email',
      type: 'email',
    },
  },
  password: {
    value: '',
    type: inputTypes.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Password',
      type: 'password',
    },
  },
  confirmPassword: {
    value: '',
    type: inputTypes.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    validation: {
      required: true,
      equal: ['', 'Does not equal password'],
    },
    elementConfig: {
      placeholder: 'Confirm Password',
      type: 'password',
    },
  },
}
