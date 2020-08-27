import { memo, ChangeEvent } from 'react'
import classes from './input.module.scss'
import { Rules } from '../../../../utils/formValidation'

export interface ElemConfig {
  placeholder: string
  type: string
  options?: Array<{ value: string; displayValue: string }>
  required?: boolean
}

export enum inputTypes {
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
  elementConfig: ElemConfig
  type: inputTypes
  value: string | number
  invalid?: boolean
  touched?: boolean
  errorMessage?: string
  label?: string | JSX.Element
  required?: boolean
  warning?: string
  validation?: Rules
  onChange?:
    | EventChange<HTMLInputElement>
    | EventChange<HTMLSelectElement>
    | EventChange<HTMLTextAreaElement>
  onBlur?: () => void
  onMouseLeave?: () => void
  styles?: React.CSSProperties
  containerStyles?: React.CSSProperties
  labelStyles?: React.CSSProperties
  errorMessageStyles?: React.CSSProperties
  className?: string
  containerClassName?: string
  labelClassName?: string
  errorMessageClassName?: string
  invalidClassName?: string
}

const Input: React.FC<Props> = (props) => {
  let inputElement = null
  const inputContainerClasses = []
  const inputClasses = [classes.Input]
  const labelClasses = []
  const errorMessageClasses = []

  if (props.touched && props.invalid) {
    inputClasses.push(props.invalidClassName || classes.Invalid)
  }

  if (props.className) {
    inputClasses.push(props.className)
  }
  if (props.containerClassName) {
    inputContainerClasses.push(props.containerClassName)
  }
  if (props.labelClassName) {
    labelClasses.push(props.labelClassName)
  }
  if (props.errorMessageClassName) {
    errorMessageClasses.push(props.errorMessageClassName)
  }

  switch (props.type) {
    case inputTypes.TEXT:
      inputElement = (
        <textarea
          style={props.styles}
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
    case inputTypes.SELECT:
      inputElement = (
        <select
          style={props.styles}
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
    case inputTypes.FROZEN_INPUT:
      inputElement = (
        <input
          style={props.styles}
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
          style={props.styles}
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
    <span className={errorMessageClasses.join(' ')} style={props.errorMessageStyles}>
      {props.errorMessage}
    </span>
  )
  let label
  if (props.label) {
    if (typeof props.label === 'string') {
      label = (
        <label className={labelClasses.join(' ')} style={props.labelStyles}>
          {props.label}
        </label>
      )
    } else {
      label = props.label
    }
  }
  return (
    <div className={inputContainerClasses.join(' ')} style={props.containerStyles}>
      {label}
      {props.type === inputTypes.SELECT ? <div className={classes.DropdownCaret} /> : null}
      {inputElement}
      {error}
    </div>
  )
}

export default memo(Input)
