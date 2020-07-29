import classes from './input.module.scss'
import { useState } from 'react'

interface Props {
  defaultValue?: string
}

const Input: React.FC<Props> = (props) => {
  const [value, setValue] = useState('')
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }
  return (
    <input
      className={classes.Input}
      type="text"
      value={value}
      placeholder={props.defaultValue ?? ''}
      onChange={onChangeHandler}
    />
  )
}

export default Input
