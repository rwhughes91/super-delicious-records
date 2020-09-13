import React, { useState, useCallback, ChangeEvent } from 'react'
import classes from './ContactForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'
import Button from '../UI/Buttons/Button/Button'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import useForm from '@hooks/useForm'
import { cloneDeep } from 'lodash'
import axios from 'axios'
import FlashMessage from '@components/FlashMessage/FlashMessage'

interface FormControls {
  name: InputProps
  email: InputProps
  phoneNumber: InputProps
  message: InputProps
}

const ContactForm: React.FC = () => {
  const inputControls = cloneDeep(formControls)
  const initialState = { ...inputControls, formIsInvalid: true }
  const [formData, dispatch] = useForm(initialState)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  const onSubmitHandler = useCallback(
    (e: React.SyntheticEvent) => {
      setSuccess(false)
      setError(false)
      e.preventDefault()
      axios
        .post('/api/contactUs', {
          email: formData.email.value,
          name: formData.name.value,
          number: formData.phoneNumber.value,
          message: formData.message.value,
        })
        .then(() => {
          dispatch({ type: 'reset', value: '', key: '' })
          setSuccess(true)
        })
        .catch(() => {
          setError(true)
        })
    },
    [
      formData.email.value,
      formData.name.value,
      formData.phoneNumber.value,
      formData.message.value,
      dispatch,
    ]
  )

  const onChangeHandler = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'change', key, value: event?.target.value })
    },
    [dispatch]
  )

  return (
    <form className={classes.Form} onSubmit={onSubmitHandler}>
      {success && (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <FlashMessage styles={{ width: '90%' }} success>
            Thanks for reaching out!
          </FlashMessage>
        </div>
      )}
      {error && (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <FlashMessage styles={{ width: '90%' }} error>
            Oops. Are you connected to the internet?
          </FlashMessage>
        </div>
      )}
      <ContactInput
        {...formData.name}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('name', event)}
      />
      <ContactInput
        {...formData.email}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('email', event)}
      />
      <ContactInput
        {...formData.phoneNumber}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('phoneNumber', event)}
      />
      <ContactInput
        {...formData.message}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('message', event)}
      />
      <Button color="purple" size="large" disabled={formData.formIsInvalid}>
        Submit
      </Button>
    </form>
  )
}

export default React.memo(ContactForm)

const formControls: FormControls = {
  name: {
    value: '',
    type: inputTypes.INPUT,
    invalid: true,
    touched: false,
    errorMessage: '',
    validation: { required: true },
    elementConfig: {
      placeholder: 'Your Name',
      type: 'text',
    },
  },
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
  phoneNumber: {
    value: '',
    type: inputTypes.INPUT,
    invalid: false,
    touched: false,
    errorMessage: '',
    validation: {
      required: true,
    },
    elementConfig: {
      placeholder: 'Phone Number',
      type: 'number',
    },
  },
  message: {
    value: '',
    type: inputTypes.TEXT,
    invalid: false,
    touched: false,
    errorMessage: '',
    validation: {
      required: true,
    },
    elementConfig: {
      placeholder: 'Please leave your message here',
      type: 'text',
    },
  },
}
