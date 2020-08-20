import classes from './input.module.scss'
import { useState } from 'react'

interface Props {
  defaultValue?: string
  onChange?: (value: string) => void
  styles?: React.CSSProperties
  classNames?: string
  type?: 'input' | 'textarea'
}

const Input: React.FC<Props> = (props) => {
  const [value, setValue] = useState('')

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value)
    props.onChange ? props.onChange(event.target.value) : ''
  }

  const classNames = [classes.Input]
  if (props.classNames) {
    classNames.push(props.classNames)
  }
  const inputProps = {
    style: props.styles,
    className: classNames.join(' '),
    type: 'text',
    value: value,
    placeholder: props.defaultValue ?? '',
    onChange: onChangeHandler,
  }
  let input = <input {...inputProps} />
  if (props.type === 'textarea') {
    input = <textarea {...inputProps} />
  }
  return input
}

export default Input
