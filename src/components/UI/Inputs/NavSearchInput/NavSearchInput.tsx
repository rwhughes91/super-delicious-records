import classes from './NavSearchInput.module.scss'
import Input, { Props } from '../Input/Input'

const NavSearchInput: React.FC<Props> = (props) => {
  return (
    <Input
      {...props}
      className={classes.NavSearchInput}
      containerClassName={classes.NavContainer}
    />
  )
}

export default NavSearchInput
