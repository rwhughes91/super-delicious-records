import React, { useCallback, ChangeEvent } from 'react'
import classes from './ContactForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'
import Button from '../UI/Buttons/Button/Button'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import useForm from '@hooks/useForm'
import { cloneDeep } from 'lodash'

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

  const onSubmitHandler = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault()
  }, [])

  const onChangeHandler = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'change', key, value: event?.target.value })
    },
    [dispatch]
  )

  return (
    <form className={classes.Form} onSubmit={onSubmitHandler}>
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
      <Button color="purple" size="large">
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
