import classes from './NavSearchInput.module.scss'
import Input from '../Input/Input'

interface Props {
  defaultValue?: string
  styles?: React.CSSProperties
}

const NavSearchInput: React.FC<Props> = (props) => {
  return <Input {...props} classNames={classes.NavSearchInput} />
}

export default NavSearchInput
