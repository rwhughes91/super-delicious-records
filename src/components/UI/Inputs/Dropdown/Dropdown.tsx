import classes from './Dropdown.module.scss'
import Input, { Props, inputTypes } from '../Input/Input'

const Dropdown: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
      type={inputTypes.SELECT}
      containerClassName={classes.DropdownContainer}
      className={classes.Dropdown}
      label={<div className={classes.DropdownCaret} />}
    />
  )
}

export default Dropdown
