import { memo, ChangeEvent } from 'react'
import classes from './AdminInput.module.scss'

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

interface EventChange<T> {
  (event: ChangeEvent<T>): void
}

export interface Props {
  elementConfig: ElementConfig
  type: types
  value: string | number
  invalid?: boolean
  touched?: boolean
  errorMessage?: string
  label?: string
  required?: boolean
  warning?: string
  onChange?:
    | EventChange<HTMLInputElement>
    | EventChange<HTMLSelectElement>
    | EventChange<HTMLTextAreaElement>
  onBlur?: () => void
  onMouseLeave?: () => void
}

const AdminInput: React.FC<Props> = (props) => {
  let inputElement = null
  let message = null
  let invalid = false
  const inputContainerClasses = [classes.InputContainer]
  const inputClasses = [classes.Input]
  const errorMessageClasses = [classes.ErrorMessage]

  if (props.required && props.touched && !props.value) {
    message = 'Required'
    invalid = true
  }

  if ((props.touched && props.invalid) || invalid) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.type) {
    case types.TEXT:
      inputElement = (
        <textarea
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChange as EventChange<HTMLTextAreaElement>}
          onBlur={props.onBlur}
          onMouseLeave={props.onMouseLeave}
          {...props.elementConfig}
          required={props.required}
        />
      )
      break
    case types.SELECT:
      inputElement = (
        <select
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChange as EventChange<HTMLSelectElement>}
          onBlur={props.onBlur}
          onMouseLeave={props.onMouseLeave}
          required={props.required}
        >
          <option value="">Select...</option>
          {props.elementConfig.options &&
            props.elementConfig.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
        </select>
      )
      break
    case types.FROZEN_INPUT:
      inputElement = (
        <input
          readOnly
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChange as EventChange<HTMLInputElement>}
          onBlur={props.onBlur}
          onMouseLeave={props.onMouseLeave}
          {...props.elementConfig}
          required={props.required}
        />
      )
      break
    default:
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          value={props.value}
          onChange={props.onChange as EventChange<HTMLInputElement>}
          onBlur={props.onBlur}
          onMouseLeave={props.onMouseLeave}
          {...props.elementConfig}
          required={props.required}
        />
      )
  }
  const error = (
    <span className={errorMessageClasses.join(' ')}>{props.errorMessage || message}</span>
  )
  return (
    <div
      style={{ paddingBottom: props.required ? '2rem' : '1rem' }}
      className={inputContainerClasses.join(' ')}
    >
      {props.label && (
        <label className={classes.Label}>
          {props.label}
          {props.required && <span style={{ color: 'var(--bright-red-color)' }}> *</span>}
          {props.warning && <span style={{ color: 'var(--bright-blue-color)' }}> *</span>}
        </label>
      )}
      {inputElement}
      {error}
    </div>
  )
}

export default memo(AdminInput)
