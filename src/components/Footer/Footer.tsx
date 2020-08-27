import { useState, useReducer, ChangeEvent } from 'react'
import classes from './Footer.module.scss'
import Logo from '../UI/Logo/Logo'
import Button from '../UI/Buttons/Button/Button'
import FooterNavItems from '../Navigation/FooterNavItems/FooterNavItems'
import FooterInput from '../UI/Inputs/FooterInput/FooterInput'
import FacebookIcon from '../UI/Icons/FacebookIcon/FacebookIcon'
import TwitterIcon from '../UI/Icons/TwitterIcon/TwitterIcon'
import InstagramIcon from '../UI/Icons/InstagramIcon/InstagramIcon'
import { Props as InputProps, inputTypes } from '../UI/Inputs/Input/Input'
import formValidation, { Rules } from '../../utils/formValidation'
import { cloneDeep } from 'lodash'

interface FormControls {
  name: InputProps
  email: InputProps
}

interface State extends FormControls {
  formIsInvalid: boolean
  [key: string]: InputProps | boolean
}

interface Action {
  type: string
  key: string
  value: string
}

const Footer: React.FC = () => {
  const inputControls = cloneDeep(formControls)
  const initialState: State = { ...inputControls, formIsInvalid: true }
  const [formData, dispatchFormData] = useReducer(reducer, initialState)
  const [urls] = useState({
    facebook: 'https://www.facebook.com/SuperDeliciousRecords',
    instagram: 'https://www.instagram.com/accounts/login/?next=/superdeliciousrecords/',
    twitter: 'https://twitter.com/SuperDeliciousR',
  })
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

  const onChangeHandler = (key: string, event: ChangeEvent<HTMLInputElement>) => {
    dispatchFormData({ type: 'change', key, value: event?.target.value })
  }

  return (
    <div className={classes.FooterContainer}>
      <div className={classes.Footer}>
        <Logo width="6rem" height="5rem" />
        <div className={classes.FormContainer}>
          <p className={classes.FooterFormTitle}>Sign up for updates</p>
          <form
            className={classes.FooterForm}
            id="footer-form"
            onSubmit={(e: React.SyntheticEvent) => {
              e.preventDefault()
            }}
          >
            <FooterInput
              {...formData.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('name', event)}
            />
            <FooterInput
              {...formData.email}
              onChange={(event: ChangeEvent<HTMLInputElement>) => onChangeHandler('email', event)}
            />
            <div className={classes.ButtonGroup}>
              <Button size="large" color="white">
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

export default Footer

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'change': {
      const [valid, errorMessage] = formValidation(
        action.value,
        (state[action.key] as InputProps).validation as Rules
      )
      const newState: State = {
        ...state,
        [action.key]: {
          ...(state[action.key] as InputProps),
          value: action.value,
          touched: true,
          invalid: !valid,
          errorMessage,
        },
      }
      let formIsInvalid = false
      for (const key in newState) {
        if (key === 'email' || key === 'name') {
          if (key === action.key) {
            formIsInvalid = !valid || formIsInvalid
          } else {
            formIsInvalid = (newState[key].invalid as boolean) || formIsInvalid
          }
        }
      }
      return {
        ...newState,
        formIsInvalid,
      }
    }
    default:
      return state
  }
}

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
