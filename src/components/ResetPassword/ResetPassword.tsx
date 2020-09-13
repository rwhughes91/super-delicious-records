import React, { useState, useContext, useCallback, ChangeEvent } from 'react'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import FormButton from '../UI/Buttons/FormButton/FormButton'
import { cloneDeep } from 'lodash'
import useForm from '@hooks/useForm'
import { UserContext } from '@context/UserProvider'
import classes from '../AuthForm/AuthForm.module.scss'
import ContactInput from '../UI/Inputs/ContactInput/ContactInput'

interface FormControls {
  email: InputProps
}

interface Props {
  styles?: React.CSSProperties
  close: () => void
  noShadow?: boolean
}

const ResetForm: React.FC<Props> = (props) => {
  const { user, sendResetToken } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const inputControls = cloneDeep(formControls)
  const initialState = {
    ...inputControls,
    formIsInvalid: true,
  }
  const [formData, dispatchFormData] = useForm(initialState)

  const onSubmitHandler = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setLoading(true)
      sendResetToken(formData.email.value.toString())
        .then(() => {
          setLoading(false)
          setSuccess(true)
        })
        .catch(() => {
          setLoading(false)
        })
    },
    [formData.email.value, sendResetToken]
  )

  const onChangeHandler = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      dispatchFormData({ type: 'change', key, value: event?.target.value })
    },
    [dispatchFormData]
  )

  let styles = { ...props.styles }
  if (props.noShadow) {
    styles = { ...props.styles, boxShadow: 'none' }
  }

  return (
    <div className={classes.Profile} style={styles}>
      <h6 className={classes.Title}>Reset your password</h6>
      {user.errorMessage && <div className={classes.AuthErrorMessage}>{user.errorMessage}</div>}
      <form
        className={classes.AuthForm}
        onSubmit={onSubmitHandler}
        style={{ position: 'relative' }}
      >
        <ContactInput
          {...formData.email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('email', event)}
        />
        <FormButton
          styles={{ width: '90%' }}
          disabled={formData.formIsInvalid}
          loading={loading}
          successOnClick={success}
          successOnClickMessage="Token Sent"
        >
          send reset token
        </FormButton>
      </form>
      <button
        className={classes.ToggleAuthForm}
        style={{
          color: 'var(--light-purple-color)',
          outline: 'none',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          marginTop: '1rem',
        }}
        onClick={props.close}
      >
        Go Back
      </button>
    </div>
  )
}

export default React.memo(ResetForm)

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
}
