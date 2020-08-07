import classes from './ContactInput.module.scss'
import Input from '../Input/Input'

interface Props {
  type: 'input' | 'textarea'
  defaultValue?: string
  styles?: React.CSSProperties
}

const ContactInput: React.FC<Props> = (props) => {
  return <Input {...props} classNames={classes.ContactInput} type={props.type} />
}

export default ContactInput
