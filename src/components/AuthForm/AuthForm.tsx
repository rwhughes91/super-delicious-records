import React, { useContext, useCallback } from 'react'
import { useState, ChangeEvent } from 'react'
import classes from './AuthForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import FormButton from '../UI/Buttons/FormButton/FormButton'
import { cloneDeep } from 'lodash'
import useForm from '@hooks/useForm'
import { UserContext } from '@context/UserProvider'

interface FormControls {
  email: InputProps
  password: InputProps
  confirmPassword: InputProps
}

interface Props {
  styles?: React.CSSProperties
  onSubmit?: () => void
}

const AuthForm: React.FC<Props> = (props) => {
  const { user, setError, login, signUp } = useContext(UserContext)
  const inputControls = cloneDeep(formControls)
  const initialState = { ...inputControls, formIsInvalid: true }
  const [formData, dispatchFormData] = useForm(initialState)
  const [isSignUp, setIsSignUp] = useState(false)

  const onIsSignUpClickHandler = useCallback(() => {
    dispatchFormData({ type: 'toggleInvalid', key: 'confirmPassword', value: '' })
    setIsSignUp((prevState) => !prevState)
  }, [dispatchFormData])

  const { onSubmit } = props
  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      onSubmit && onSubmit()
      if (isSignUp) {
        signUp(formData.email.value.toString(), formData.password.value.toString()).catch(
          (error) => {
            setError(error.message)
          }
        )
      } else {
        login(formData.email.value.toString(), formData.password.value.toString()).catch(
          (error) => {
            setError(error.message)
          }
        )
      }
    },
    [formData.email.value, formData.password.value, onSubmit, isSignUp, setError, login, signUp]
  )

  const onChangeHandler = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      dispatchFormData({ type: 'change', key, value: event?.target.value })
    },
    [dispatchFormData]
  )

  return (
    <div className={classes.Profile} style={props.styles}>
      <h6 className={classes.Title}>{isSignUp ? 'Sign Up' : 'Sign In'}</h6>
      {user.errorMessage && <div className={classes.AuthErrorMessage}>{user.errorMessage}</div>}
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

export default React.memo(AuthForm)

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
