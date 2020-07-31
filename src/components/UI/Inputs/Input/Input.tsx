import classes from './input.module.scss'
import { useState } from 'react'

interface Props {
  defaultValue?: string
  styles?: React.CSSProperties
  classNames?: string
}

const Input: React.FC<Props> = (props) => {
  const [value, setValue] = useState('')

  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }
  const classNames = [classes.Input]
  if (props.classNames) {
    classNames.push(props.classNames)
  }

  return (
    <input
      style={props.styles}
      className={classNames.join(' ')}
      type="text"
      value={value}
      placeholder={props.defaultValue ?? ''}
      onChange={onChangeHandler}
    />
  )
}

export default Input
