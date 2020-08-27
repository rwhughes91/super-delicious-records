import { memo } from 'react'
import classes from './AdminInput.module.scss'
import Input, { Props } from '../Input/Input'

export interface ElementConfig {
  placeholder: string
  type: string
  options?: Array<{ value: string; displayValue: string }>
}

export enum types {
  INPUT = 'input',
  TEXT = 'textarea',
  DATE = 'date',
  SELECT = 'select',
  FROZEN_INPUT = 'frozenInput',
}

const AdminInput: React.FC<Props> = (props) => {
  let invalid = false
  let message

  if (props.required && props.touched && !props.value) {
    message = 'Required'
    invalid = true
  }

  const label = props.label && (
    <label className={classes.Label}>
      {props.label}
      {props.required && <span style={{ color: 'var(--bright-red-color)' }}> *</span>}
      {props.warning && <span style={{ color: 'var(--bright-blue-color)' }}> *</span>}
    </label>
  )
  return (
    <Input
      {...props}
      invalid={props.invalid || invalid}
      errorMessage={props.errorMessage || message}
      className={classes.Input}
      containerClassName={classes.InputContainer}
      containerStyles={{ paddingBottom: props.required ? '2rem' : '1rem' }}
      errorMessageClassName={classes.ErrorMessage}
      invalidClassName={classes.Invalid}
      label={label}
    />
  )
}

export default memo(AdminInput)
