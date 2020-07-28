import classes from './input.module.scss'
import { useState } from 'react'

const Input: React.FC = () => {
  const [value, setValue] = useState('')
  const onChangeHandler: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }
  return <input className={classes.Input} type="text" value={value} onChange={onChangeHandler} />
}

export default Input
