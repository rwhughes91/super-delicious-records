import React, { useCallback } from 'react'
import { useState, ChangeEvent } from 'react'
import classes from './Footer.module.scss'
import Logo from '../UI/Logo/Logo'
import Button from '../UI/Buttons/Button/Button'
import FooterNavItems from '../Navigation/FooterNavItems/FooterNavItems'
import FooterInput from '../UI/Inputs/FooterInput/FooterInput'
import FacebookIcon from '../UI/Icons/FacebookIcon/FacebookIcon'
import TwitterIcon from '../UI/Icons/TwitterIcon/TwitterIcon'
import InstagramIcon from '../UI/Icons/InstagramIcon/InstagramIcon'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import { cloneDeep } from 'lodash'
import useForm from '@hooks/useForm'

interface FormControls {
  name: InputProps
  email: InputProps
}

const Footer: React.FC = () => {
  const inputControls = cloneDeep(formControls)
  const initialState = { ...inputControls, formIsInvalid: true }
  const [formData, dispatchFormData] = useForm(initialState)
  const [urls] = useState({
    facebook: 'https://www.facebook.com/SuperDeliciousRecords',
    instagram: 'https://www.instagram.com/accounts/login/?next=/superdeliciousrecords/',
    twitter: 'https://twitter.com/SuperDeliciousR',
  })
  const [submitted, setSubmitted] = useState(false)
  const icons = (type: 'small' | 'large') => (
    <>
      <a href={urls.facebook} rel="noreferrer" target="_blank">
        <FacebookIcon size={type === 'large' ? 2.5 : 2} />
      </a>
      <a href={urls.instagram} target={'blank'}>
        <InstagramIcon size={type === 'large' ? 2.5 : 2} />
      </a>
      <a href={urls.twitter} target={'blank'}>
        <TwitterIcon size={type === 'large' ? 2.5 : 2} />
      </a>
    </>
  )

  const onChangeHandler = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      dispatchFormData({ type: 'change', key, value: event?.target.value })
    },
    [dispatchFormData]
  )

  const onSubmitHandler = useCallback(
    (event: React.SyntheticEvent) => {
      event.preventDefault()
      dispatchFormData({ type: 'reset', key: '', value: '' })
      setSubmitted(true)
    },
    [dispatchFormData]
  )

  return (
    <div className={classes.FooterContainer}>
      <div className={classes.Footer}>
        <Logo width="6rem" height="5rem" />
        <div className={classes.FormContainer}>
          <p
            className={classes.FooterFormTitle}
            style={{ color: submitted ? 'var(--bright-blue-color)' : 'var(tan-white-color)' }}
          >
            {submitted ? "Thanks! You won't regret it" : 'Sign up for updates'}
          </p>
          <form className={classes.FooterForm} id="footer-form" onSubmit={onSubmitHandler}>
            <FooterInput
              {...formData.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('name', event)}
            />
            <FooterInput
              {...formData.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('email', event)}
            />
            <div className={classes.ButtonGroup}>
              <Button size="large" color="white" disabled={formData.formIsInvalid}>
                Sign Up
              </Button>
            </div>
          </form>
        </div>
        <div className={classes.FooterNavigation}>
          <FooterNavItems />
        </div>
        <div className={[classes.IconContainer, classes.IconContainerLarge].join(' ')}>
          {icons('large')}
        </div>
        <div className={[classes.IconContainer, classes.IconContainerSmall].join(' ')}>
          {icons('large')}
        </div>
      </div>
    </div>
  )
}

export default React.memo(Footer)

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
      placeholder: 'Your Email',
      type: 'email',
    },
  },
}
