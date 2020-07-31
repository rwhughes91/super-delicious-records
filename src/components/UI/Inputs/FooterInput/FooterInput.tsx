import classes from './FooterInput.module.scss'
import Input from '../Input/Input'

interface Props {
  defaultValue?: string
  styles?: React.CSSProperties
}

const FooterInput: React.FC<Props> = (props) => {
  return <Input {...props} classNames={classes.FooterInput} />
}

export default FooterInput
